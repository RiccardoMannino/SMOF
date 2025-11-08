// app/api/create-checkout/success/route.ts
import { writeClient } from "../../../../sanity/lib/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: Request) {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

		const { searchParams } = new URL(req.url);
		// Ottieni il session_id dai parametri di query
		const sessionId = searchParams.get("session_id");

		// se non esiste il session_id blocca la richiesta
		if (!sessionId) {
			return NextResponse.json(
				{ message: "Session ID mancante" },
				{ status: 400 }
			);
		}

		// Recupera i dettagli della sessione di checkout
		const session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ["line_items", "payment_intent"],
		});

		// Verifica lo stato di pagamento
		if (session.payment_status !== "paid") {
			return NextResponse.json(
				{ message: "Il pagamento non è stato completato" },
				{ status: 400 }
			);
		}

		// query ticket : ricava il tipo di ticket e il suo id
		const ticket = await writeClient.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{ 
        _id,
        biglietto, 
        prezzo, 
        quantita 
      }`,
			{
				ticketId: session.metadata?.ticketId,
				ticketType: session.metadata?.ticketType,
			}
		);

		// sincronizzazione quantità eventi disponibili

		try {
			await writeClient
				.patch(ticket._id)
				.set({
					quantita:
						ticket.quantita > 0
							? ticket.quantita - Number(session.metadata?.quantita)
							: ticket.quantita,
				})
				.commit();
		} catch (sanityError) {
			console.error(
				"Errore nell'aggiornamento del database Sanity:",
				sanityError
			);
			return NextResponse.json(
				{ message: "Errore nell'aggiornamento del database" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			//sessione di pagamento
			success: true,
			session: {
				id: session.id,
				payment_status: session.payment_status,
				customer_email: session.customer_details?.email,
				amount_total: session.amount_total,
				metadata: session.metadata?.name,
				customer_name: session.customer_details?.name,
				quantita: Number(session.metadata?.quantita),
				ticketId: session.metadata?.ticketId,
				ticketType: session.metadata?.ticketType,
			},
		});
	} catch (error) {
		console.error("Error retrieving checkout session:", error);
		return NextResponse.json(
			{ message: "Errore nel recupero della sessione" },
			{ status: 500 }
		);
	}
}
