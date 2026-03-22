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
		const sessioneData = session.metadata?.sessione ?? null; // 👈 data ISO della sessione scelta
		const quantitaAcquistata = Number(session.metadata?.quantita);

		// Query ticket
		const ticket = await writeClient.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{
        _id,
        biglietto,
        prezzo,
        quantita,
        sessioni
      }`,
			{ ticketId, ticketType },
		);

		try {
			if (
				ticketType === "biglietto" &&
				sessioneData &&
				ticket.sessioni?.length > 0
			) {
				// 👇 Trova la sessione corrispondente alla data scelta
				const sessioneIndex = ticket.sessioni.findIndex(
					(s: { dataSelezionata: string }) => s.dataSelezionata === sessioneData,
				);

				if (sessioneIndex === -1) {
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

				// 👇 Aggiorna solo la quantità di quella specifica sessione nell'array
				await writeClient
					.patch(ticket._id)
					.set({
						[`sessioni[${sessioneIndex}].quantita`]: nuovaQuantita,
					})
					.commit();
			} else {
				// Retrocompatibile: festival e giornaliero aggiornano quantita globale
				await writeClient
					.patch(ticket._id)
					.set({
						quantita:
							ticket.quantita > 0
								? ticket.quantita - quantitaAcquistata
								: ticket.quantita,
					})
					.commit();
			}
		} catch (sanityError) {
			console.error(
				"Errore nell'aggiornamento del database Sanity:",
				sanityError,
			);
			return NextResponse.json(
				{ message: "Errore nell'aggiornamento del database" },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			success: true,
			session: {
				id: session.id,
				payment_status: session.payment_status,
				customer_email: session.customer_details?.email,
				amount_total: session.amount_total,
				metadata: session.metadata?.name,
				customer_name: session.customer_details?.name,
				quantita: quantitaAcquistata,
				ticketId,
				ticketType,
				sessione: sessioneData, // 👈 incluso nella risposta
			},
		});
	} catch (error) {
		console.error("Error retrieving checkout session:", error);
		return NextResponse.json(
			{ message: "Errore nel recupero della sessione" },
			{ status: 500 },
		);
	}
}
