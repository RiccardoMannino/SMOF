// app/api/create-checkout/success/route.ts
import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

		const { searchParams } = new URL(req.url);
		const sessionId = searchParams.get("session_id");

		if (!sessionId) {
			return NextResponse.json(
				{ message: "Session ID mancante" },
				{ status: 400 },
			);
		}

		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["line_items", "payment_intent"],
		});

		if (session.payment_status !== "paid") {
			return NextResponse.json(
				{ message: "Il pagamento non è stato completato" },
				{ status: 400 },
			);
		}

		const ticketId = session.metadata?.ticketId;
		const ticketType = session.metadata?.ticketType;
		const sessioneData = session.metadata?.sessione || null; // Evita stringhe vuote
		const quantitaAcquistata = Number(session.metadata?.quantita);
		const eventName = session.metadata?.name;

		// Per acquisti multipli, leggi l'array di sessioni
		let sessioniAcquistate: Array<{
			dataSelezionata: string;
			quantitaAcquistata: number;
		}> = [];
		if (session.metadata?.sessioni) {
			try {
				sessioniAcquistate = JSON.parse(session.metadata.sessioni);
			} catch (e) {
				console.log(
					"[SUCCESS] Sessioni non parsabile, usando sessioneData singolo",
				);
			}
		}

		// console.log("[SUCCESS] Dati ricevuti da Stripe:", {
		// 	ticketId,
		// 	ticketType,
		// 	quantitaAcquistata,
		// 	eventName,
		// 	sessioneData,
		// });

		if (!ticketId || !ticketType) {
			console.error("[SUCCESS] Metadata mancante");
			return NextResponse.json(
				{ message: "Dati del biglietto mancanti" },
				{ status: 400 },
			);
		}

		// Query ticket completo con evento
		let ticket;
		try {
			if (ticketType === "biglietto") {
				ticket = await writeClient.fetch(
					`*[_type == $ticketType && _id == $ticketId][0]{
    _id,
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
			} else {
				ticket = await writeClient.fetch(
					`*[_type == $ticketType && _id == $ticketId][0]{
          _id,
          biglietto,
          prezzo,
          quantita
        }`,
					{ ticketId, ticketType },
				);
			}
		} catch (fetchError) {
			console.error("[SUCCESS] Errore nel fetch del ticket:", fetchError);
			return NextResponse.json(
				{ message: "Errore nel recupero dei dati del biglietto" },
				{ status: 500 },
			);
		}

		if (!ticket) {
			console.error("[SUCCESS] Ticket non trovato con ID:", ticketId);
			return NextResponse.json(
				{ message: "Biglietto non trovato nel database" },
				{ status: 404 },
			);
		}

		// console.log("[SUCCESS] Ticket recuperato:", {
		// 	_id: ticket._id,
		// 	ticketType,
		// 	hasQuantita: ticket.quantita !== undefined,
		// 	quantitaValue: ticket.quantita,
		// 	hasSessioni: !!ticket.sessioni,
		// 	sessioni: ticket.sessioni?.length || 0,
		// 	prezzo: ticket.prezzo,
		// 	quantitaAcquistata_ricevuta: quantitaAcquistata,
		// });

		try {
			if (ticketType === "biglietto") {
				// ==========================================
				// BIGLIETTI SINGOLI (tipo "biglietto")
				// ==========================================
				// Per i biglietti singoli, la quantità NON è nel documento principale
				// bensì dentro l'array "sessioni" per ogni sessione scelta
				// Struttura: sessioni[{ dataSelezionata, quantita, _key }]
				//
				// Dopo un acquisto, riduce: sessioni[index].quantita -= quantitaAcquistata
				// ==========================================

				// Per biglietti singoli, la quantità è sempre dentro le sessioni
				if (!ticket.sessioni || ticket.sessioni.length === 0) {
					console.log(
						"[SUCCESS] Nessuna sessione trovata per biglietto:",
						ticket,
					);
					return NextResponse.json(
						{ message: "Nessuna sessione disponibile per questo biglietto" },
						{ status: 400 },
					);
				}

				console.log("[SUCCESS] Sessioni disponibili:", ticket.sessioni.length);

				// Se abbiamo un array di sessioni (acquisto multiplo)
				if (sessioniAcquistate.length > 0) {
					console.log(
						"[SUCCESS] Elaborando acquisto multiplo con",
						sessioniAcquistate.length,
						"sessioni",
					);

					// Aggiorna la quantità per ogni sessione acquistata
					const nuoveSessioni = ticket.sessioni.map((sessione: any) => {
						const sessioneAcquistata = sessioniAcquistate.find(
							(s) => s.dataSelezionata === sessione.dataSelezionata,
						);

						if (sessioneAcquistata) {
							const nuovaQuantita = Math.max(
								0,
								sessione.quantita - sessioneAcquistata.quantitaAcquistata,
							);
							console.log(
								`[SUCCESS] Sessione ${sessione.dataSelezionata}: ${sessione.quantita} -> ${nuovaQuantita}`,
							);
							return { ...sessione, quantita: nuovaQuantita };
						}
						return sessione;
					});

					await writeClient
						.patch(ticket._id)
						.set({ sessioni: nuoveSessioni })
						.commit();
				}
				// Se abbiamo una singola sessione (modalità backward compatibility)
				else if (sessioneData) {
					console.log(
						"[SUCCESS] Elaborando acquisto singolo per sessione:",
						sessioneData,
					);

					const sessioneIndex = ticket.sessioni.findIndex(
						(s: { dataSelezionata: string }) =>
							s.dataSelezionata === sessioneData,
					);

					if (sessioneIndex === -1) {
						console.error(
							"[SUCCESS] Sessione non trovata per data:",
							sessioneData,
						);
						return NextResponse.json(
							{ message: "Sessione non trovata" },
							{ status: 400 },
						);
					}

					const sessioneCorrente = ticket.sessioni[sessioneIndex];
					const nuovaQuantita = Math.max(
						0,
						sessioneCorrente.quantita - quantitaAcquistata,
					);

					// Ricostruisci l'array di sessioni con la quantità aggiornata
					const nuoveSessioni = ticket.sessioni.map((s: any, i: number) =>
						i === sessioneIndex ? { ...s, quantita: nuovaQuantita } : s,
					);

					await writeClient
						.patch(ticket._id)
						.set({ sessioni: nuoveSessioni })
						.commit();
				} else {
					console.error(
						"[SUCCESS] Errore: biglietto singolo senza sessione specifica",
					);
					return NextResponse.json(
						{
							message: "Errore: sessione non specificata per biglietto singolo",
						},
						{ status: 400 },
					);
				}
			} else {
				// ==========================================
				// BIGLIETTI FESTIVAL / GIORNALIERO
				// ==========================================
				// Per festival e giornaliero, la quantità è nel documento principale
				// Struttura: { quantita: numero }
				//
				// Dopo un acquisto, riduce: quantita -= quantitaAcquistata
				// ==========================================

				// Per festival e giornaliero
				if (!ticket || ticket.quantita === undefined) {
					console.error(
						"[SUCCESS] Quantita non trovata per ticket type:",
						ticketType,
					);
					return NextResponse.json(
						{ message: "Biglietto non trovato" },
						{ status: 400 },
					);
				}

				const nuovaQuantita = Math.max(0, ticket.quantita - quantitaAcquistata);
				// console.log("[SUCCESS] Aggiornamento quantita festival/giornaliero:", {
				// 	quantitaAttuale: ticket.quantita,
				// 	quantitaAcquistata,
				// 	nuovaQuantita,
				// });

				await writeClient
					.patch(ticket._id)
					.set({
						quantita: nuovaQuantita,
					})
					.commit();

				// console.log("[SUCCESS] Aggiornamento festival/giornaliero completato");
			}
		} catch (sanityError) {
			console.error(
				"[SUCCESS] Errore nell'aggiornamento del database Sanity:",
				sanityError,
			);
			return NextResponse.json(
				{ message: "Errore nell'aggiornamento del database" },
				{ status: 500 },
			);
		}

		// console.log("[SUCCESS] ✅ AGGIORNAMENTO COMPLETATO CON SUCCESSO!", {
		// 	ticketId,
		// 	ticketType,
		// 	quantitaAcquistata,
		// 	sessioneData,
		// });

		const responseData = {
			success: true,
			session: {
				id: session.id,
				payment_status: session.payment_status,
				customer_email: session.customer_details?.email,
				amount_total: session.amount_total,
				prezzo_unitario: ticket?.prezzo || 0,
				nome_biglietto:
					ticketType === "biglietto"
						? ticket?.biglietto?.eventName
						: ticket?.biglietto,
				customer_name: session.customer_details?.name,
				quantita: quantitaAcquistata,
				ticketId,
				ticketType,
				sessione: sessioneData,
				eventName:
					ticketType === "biglietto" ? ticket?.biglietto?.eventName : null,
				tipo_ticket:
					ticketType === "biglietto"
						? "Evento Singolo"
						: ticketType === "festival"
							? "Festival"
							: "Giornaliero",
			},
		};

		// console.log("[SUCCESS] 📤 Dati restituiti al client:", {
		// 	quantita: responseData.session.quantita,
		// 	ticketType: responseData.session.ticketType,
		// 	evento: responseData.session.nome_biglietto,
		// 	email: responseData.session.customer_email,
		// });

		return NextResponse.json(responseData);
	} catch (error) {
		console.error("Error retrieving checkout session:", error);
		return NextResponse.json(
			{ message: "Errore nel recupero della sessione" },
			{ status: 500 },
		);
	}
}
