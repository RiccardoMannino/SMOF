import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET({ params }: { params: { sessionId: string } }) {
	const sessionId = (await params).sessionId;

	console.log("route sessionId", sessionId);
	try {
		if (!sessionId.startsWith("cs_")) {
			throw new Error("ID sessione non valido");
		}

		const session = await stripe.checkout.sessions.retrieve(sessionId);
		console.log(session);
		return NextResponse.json({
			payment_status: session.payment_status,
			customer_email: session.customer_details?.email,
			amount_total: session.amount_total,
			metadata: session.metadata?.name,
			customer_name: session.customer_details?.name,
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("Errore nel recupero della sessione:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		} else {
			// Gestisci il caso in cui l'errore non è di tipo Error
			console.error("Errore sconosciuto:", error);
			return NextResponse.json(
				{ error: "Si è verificato un errore sconosciuto" },
				{ status: 500 }
			);
		}
	}
}
