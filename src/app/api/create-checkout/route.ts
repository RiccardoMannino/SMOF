// app/api/create-checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
	const sessione = await auth();

	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
		const body = await req.json();
		const { ticketId, ticketType, quantity } = body;

		// Definisci un mapping dei tipi di biglietti supportati
		const supportedTicketTypes = ["giornaliero", "biglietto", "festival"];

		if (!supportedTicketTypes.includes(ticketType)) {
			return NextResponse.json(
				{ message: "Tipo di biglietto non supportato" },
				{ status: 400 }
			);
		}

		// Recupera i dati del biglietto da Sanity usando il tipo di biglietto specificato
		const ticket = await client.fetch(
			`*[_type == $ticketType && _id == $ticketId][0]{ 
        biglietto, 
        prezzo, 
        quantita 
      }`,
			{ ticketId, ticketType }
		);

		if (!ticket || ticket.quantita < quantity) {
			return NextResponse.json(
				{ message: "Biglietti non disponibili" },
				{ status: 400 }
			);
		}

		// Converti il prezzo da stringa a numero se necessario
		const priceInCents = parseInt(ticket.prezzo.replace(/[^\d]/g, "")) * 100;

		if (isNaN(priceInCents)) {
			return NextResponse.json(
				{ message: "Formato prezzo non valido" },
				{ status: 400 }
			);
		}

		// Crea una sessione di checkout
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "eur",
						product_data: {
							name: ticket.biglietto,
							metadata: {
								ticketId,
							},
						},
						unit_amount: priceInCents, // Prezzo in centesimi
					},

					// adjustable_quantity: {
					// 	enabled: true,
					// 	minimum: 1,
					// 	maximum: ticket.quantita, // Usa la quantità disponibile dallo schema
					// },
					quantity: quantity,
				},
			],
			customer_email: sessione?.user?.email,
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"}/ticket`,
			metadata: {
				ticketId: ticketId,
				ticketType: ticketType,
				name: ticket.biglietto,
				quantita: quantity,
			},
		} as Stripe.Checkout.SessionCreateParams);

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json({ message: "Errore nel server" }, { status: 500 });
	}
}
