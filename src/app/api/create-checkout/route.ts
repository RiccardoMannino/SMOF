// app/api/create-checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client, readClient } from "../../../sanity/lib/client";

import { auth } from "@/lib/auth";

export async function POST(req: Request) {
	const sessione = await auth();

	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
		const body = await req.json();
		const {
			ticketId,
			ticketType,
			quantity,
			sessione: sessioneData,
			sessions,
		} = body;

		console.log("[CHECKOUT] Dati ricevuti:", {
			ticketId,
			ticketType,
			quantity,
			sessioneData: sessioneData
				? `Sessione: ${new Date(sessioneData).toLocaleString("it-IT")}`
				: "Nessuna sessione",
			sessions: sessions
				? `${sessions.length} sessioni`
				: "Nessun array sessioni",
		});

		const protocol = req.headers.get("x-forwarded-proto") || "https";
		const host =
			req.headers.get("x-forwarded-host") ||
			req.headers.get("host") ||
			"localhost:3000";
		const baseUrl = `${protocol}://${host}`;

		const supportedTicketTypes = ["giornaliero", "biglietto", "festival"];

		if (!supportedTicketTypes.includes(ticketType)) {
			return NextResponse.json(
				{ message: "Tipo di biglietto non supportato" },
				{ status: 400 },
			);
		}

		const singleTicket = await readClient.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{
    biglietto->{ eventName },
    prezzo,
    quantita,
    sessioni[]{
      _key,
      dataSelezionata,
      quantita,
    }
  }`,
			{ ticketId, ticketType },
		);

		const ticket = await readClient.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{
        biglietto,
        prezzo,
        quantita
      }`,
			{ ticketId, ticketType },
		);

		if (ticketType === "biglietto") {
			if (!singleTicket) {
				return NextResponse.json(
					{ message: "Biglietto non trovato" },
					{ status: 400 },
				);
			}

			if (!singleTicket.sessioni || singleTicket.sessioni.length === 0) {
				return NextResponse.json(
					{ message: "Nessuna sessione disponibile per questo biglietto" },
					{ status: 400 },
				);
			}

			if (sessions && Array.isArray(sessions) && sessions.length > 0) {
				sessions.forEach(
					(sessionData: {
						dataSelezionata: string;
						quantitaAcquistata: number;
						quantitaDisponibile?: number;
					}) => {
						const sessioneScelta = singleTicket.sessioni.find(
							(s: { dataSelezionata: string; quantita: number }) =>
								s.dataSelezionata === sessionData.dataSelezionata,
						);

						if (!sessioneScelta) {
							throw new Error("Una o più sessioni non trovate");
						}

						if (sessioneScelta.quantita < sessionData.quantitaAcquistata) {
							throw new Error(
								`Biglietti non disponibili per la sessione ${new Date(
									sessionData.dataSelezionata,
								).toLocaleString(
									"it-IT",
								)} (disponibili: ${sessioneScelta.quantita}, richiesti: ${sessionData.quantitaAcquistata})`,
							);
						}
					},
				);
			} else if (sessioneData) {
				const sessioneScelta = singleTicket.sessioni.find(
					(s: { dataSelezionata: string; quantita: number }) =>
						s.dataSelezionata === sessioneData,
				);

				if (!sessioneScelta) {
					return NextResponse.json(
						{ message: "Sessione non trovata" },
						{ status: 400 },
					);
				}

				if (sessioneScelta.quantita < quantity) {
					return NextResponse.json(
						{ message: "Biglietti non disponibili per questa sessione" },
						{ status: 400 },
					);
				}
			} else {
				return NextResponse.json(
					{ message: "Nessuna sessione selezionata" },
					{ status: 400 },
				);
			}
		} else {
			if (!ticket || ticket.quantita < quantity) {
				return NextResponse.json(
					{ message: "Biglietti non disponibili" },
					{ status: 400 },
				);
			}
		}

		const eventName =
			ticketType === "biglietto"
				? singleTicket.biglietto?.eventName
				: ticket.biglietto;

		const prezzo =
			ticketType === "biglietto" ? singleTicket.prezzo : ticket.prezzo;

		const stripeSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items:
				sessions && Array.isArray(sessions) && sessions.length > 0
					? sessions.map(
							(sessionData: {
								dataSelezionata: string;
								quantitaAcquistata: number;
								quantitaDisponibile?: number;
							}) => ({
								price_data: {
									currency: "eur" as const,
									product_data: {
										name: eventName,
										description: `Sessione: ${new Date(
											sessionData.dataSelezionata,
										).toLocaleString("it-IT", {
											weekday: "long",
											day: "2-digit",
											month: "long",
											hour: "2-digit",
											minute: "2-digit",
										})}`,
										metadata: { ticketId },
									},
									unit_amount: Math.round(prezzo * 100),
								},
								quantity: sessionData.quantitaAcquistata,
							}),
						)
					: [
							{
								price_data: {
									currency: "eur" as const,
									product_data: {
										name: eventName,
										...(sessioneData && {
											description: `Sessione: ${new Date(
												sessioneData,
											).toLocaleString("it-IT", {
												weekday: "long",
												day: "2-digit",
												month: "long",
												hour: "2-digit",
												minute: "2-digit",
											})}`,
										}),
										metadata: { ticketId },
									},
									unit_amount: Math.round(prezzo * 100),
								},
								quantity: quantity,
							},
						],
			mode: "payment",
			success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${baseUrl}/ticket`,
			metadata: {
				ticketId,
				ticketType,
				name: eventName,
				quantita:
					quantity ||
					(sessions
						? sessions.reduce(
								(acc: number, s: { quantitaAcquistata: number }) =>
									acc + s.quantitaAcquistata,
								0,
							)
						: 0),
				...(sessioneData && { sessione: sessioneData }),
				...(sessions &&
					sessions.length > 0 && {
						sessioni: JSON.stringify(
							sessions.map(
								(s: {
									dataSelezionata: string;
									quantitaAcquistata: number;
								}) => ({
									dataSelezionata: s.dataSelezionata,
									quantitaAcquistata: s.quantitaAcquistata,
								}),
							),
						),
					}),
			},
		});

		return NextResponse.json({ url: stripeSession.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json({ message: "Errore nel server" }, { status: 500 });
	}
}
