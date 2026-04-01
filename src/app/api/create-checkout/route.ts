// app/api/create-checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client, readClient } from "../../../sanity/lib/client";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
	// sessione utente autenticato google
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

		// Ottieni il dominio dalla request per evitare problemi con NEXTAUTH_URL
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

		// Query unica per biglietto singolo (con sessioni)
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
  }`, // ← chiude il documento principale
			{ ticketId, ticketType },
		);

		// Query per festival/giornaliero
		const ticket = await readClient.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{
        biglietto,
        prezzo,
        quantita
      }`,
			{ ticketId, ticketType },
		);

		// 👇 Per biglietti singoli con sessioni, controlla la quantità della sessione scelta
		if (ticketType === "biglietto") {
			// ==========================================
			// VALIDAZIONE BIGLIETTI SINGOLI
			// ==========================================
			// I biglietti singoli DEVONO SEMPRE avere sessioni
			// Per ogni sessione è specificato: dataSelezionata, quantita, _key
			// L'utente sceglie una sessione specifica durante il checkout
			// ==========================================
			if (!singleTicket) {
				return NextResponse.json(
					{ message: "Biglietto non trovato" },
					{ status: 400 },
				);
			}

			// Biglietti singoli DEVONO avere sessioni
			if (!singleTicket.sessioni || singleTicket.sessioni.length === 0) {
				return NextResponse.json(
					{ message: "Nessuna sessione disponibile per questo biglietto" },
					{ status: 400 },
				);
			}

			// Se arriva un array di sessioni (multiple), validalo
			if (sessions && Array.isArray(sessions) && sessions.length > 0) {
				// Validazione per acquisto multiplo
				let totalQuantityCheck = 0;
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

						totalQuantityCheck += sessionData.quantitaAcquistata;
					},
				);
			} else if (sessioneData) {
				// Singola sessione (modalità backward compatibility)
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
				// Nessuna sessione specificata
				return NextResponse.json(
					{ message: "Nessuna sessione selezionata" },
					{ status: 400 },
				);
			}
		} else {
			// festival / giornaliero
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

		// Costruisci i line items
		let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

		if (sessions && Array.isArray(sessions) && sessions.length > 0) {
			// Multiple sessioni
			lineItems = sessions.map(
				(sessionData: {
					dataSelezionata: string;
					quantitaAcquistata: number;
					quantitaDisponibile?: number;
				}) => ({
					price_data: {
						currency: "eur",
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
			);
		} else {
			// Single line item (backward compatibility)
			lineItems = [
				{
					price_data: {
						currency: "eur",
						product_data: {
							name: eventName,
							// 👇 Aggiungi la data sessione al nome prodotto se presente
							...(sessioneData && {
								description: `Sessione: ${new Date(sessioneData).toLocaleString(
									"it-IT",
									{
										weekday: "long",
										day: "2-digit",
										month: "long",
										hour: "2-digit",
										minute: "2-digit",
									},
								)}`,
							}),
							metadata: { ticketId },
						},
						unit_amount: Math.round(prezzo * 100),
					},
					quantity: quantity,
				},
			];
		}

		// Crea sessione Stripe
		const stripeSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
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
				...(sessioneData && { sessione: sessioneData }), // 👈 passa SOLO se esiste
				// Aggiungi le sessioni come JSON stringificato per acquisti multipli
				...(sessions &&
					sessions.length > 0 && {
						sessioni: JSON.stringify(
							sessions.map((s: any) => ({
								dataSelezionata: s.dataSelezionata,
								quantitaAcquistata: s.quantitaAcquistata,
							})),
						),
					}),
			},
		} as Stripe.Checkout.SessionCreateParams);

		return NextResponse.json({ url: stripeSession.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json({ message: "Errore nel server" }, { status: 500 });
	}
}
