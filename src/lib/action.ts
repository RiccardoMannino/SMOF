"use server";

import { readClient, writeClient } from "@/sanity/lib/client";
import { signIn, signOut } from "./auth";
import { User } from "next-auth";
import { auth } from "@/lib/auth";
import Stripe from "stripe";
import { revalidatePath, revalidateTag } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-06-30.basil",
});

// tutte le action (comprese quelle di stripe)

type Uid = {
	uid: string | undefined;
	subscribeNewsletter?: boolean;
};

export async function createOrUpdateUser(userData: User & Uid) {
	const { uid, name, email, image: profileImage } = userData;
	console.log("Tentativo di creare/aggiornare utente:", { uid, name, email });

	try {
		// Prima controlla se l'utente esiste già
		const existingUser = await readClient.fetch(
			`*[_type == "user" && uid == $uid][0]`,
			{ uid }
		);
		console.log(existingUser);
		if (existingUser) {
			// Se esiste, aggiorna solo i campi necessari
			console.log("Utente esistente trovato, aggiornamento in corso...");
			const result = await writeClient
				.patch(existingUser._id)
				.set({
					name,
					email,
					profileImage,
				})
				.commit();

			console.log("Utente aggiornato:", result);
			return result;
		} else {
			// Se non esiste, crea un nuovo utente
			console.log("Creazione nuovo utente...");
			const result = await writeClient.create({
				_type: "user",
				uid,
				name,
				email,
				profileImage,
				subscribeNewsletter: false,
			});

			console.log("Nuovo utente creato:", result);
			return result;
		}
	} catch (error) {
		console.error("Errore dettagliato nella gestione utente:", error);
		throw error;
	}
}

export async function updateNewsletterSubscription(subscribe: boolean) {
	try {
		// Ottieni la sessione corrente
		const session = await auth();

		if (!session?.user) {
			throw new Error("Utente non autenticato");
		}

		const userEmail = session.user.email;
		console.log("Aggiornamento per utente:", userEmail);

		// Trova l'utente tramite email (più affidabile dell'ID)
		const existingUser = await readClient.fetch(
			`*[_type == "user" && email == $email][0]`,
			{ email: userEmail }
		);

		if (!existingUser) {
			throw new Error("Utente non trovato nel database");
		}

		// Aggiorna solo il campo subscribeNewsletter
		const result = await writeClient
			.patch(existingUser._id)
			.set({
				subscribeNewsletter: subscribe,
			})
			.commit();

		console.log("✅ Newsletter subscription aggiornata:", result);
		revalidatePath("/utente");
		revalidatePath("/");

		revalidateTag("newsletter-status");
		if (userEmail) revalidateTag(`newsletter-status:${userEmail}`);

		return { ok: true };
	} catch (error) {
		console.error("❌ Errore nell'aggiornamento newsletter:", error);
	}
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/utente" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function purchaseTicket(ticketId: string, quantity: number) {
	// 1. Controllo autenticazione
	const session = await auth();
	if (!session?.user) {
		throw new Error("Utente non autenticato");
	}

	// 2. Recupera il biglietto da Sanity
	const ticket = await readClient.fetch(
		`*[_type in ["biglietto", "festival", "giornaliero"] && _id == $id][0]`,
		{ id: ticketId }
	);

	if (!ticket) {
		throw new Error("Biglietto non trovato");
	}

	if (ticket.quantita < quantity) {
		throw new Error("Quantità richiesta non disponibile");
	}

	// 3. Gestione campo prezzo e nome biglietto
	const price =
		typeof ticket.prezzo === "string"
			? parseFloat(ticket.prezzo)
			: typeof ticket.Prezzo === "string"
				? parseFloat(ticket.Prezzo)
				: 0;

	const ticketName = ticket.biglietto ?? ticket.bigliettoGiorno ?? "Biglietto";

	// 4. Crea sessione Stripe
	const stripeSession = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "eur",
					product_data: {
						name: ticketName,
					},
					unit_amount: Math.round(price * 100),
				},
				quantity,
			},
		],
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?ticketId=${ticketId}&quantity=${quantity}`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
		customer_email: session.user.email ?? undefined,
		// payment_method_types non serve più, Stripe lo gestisce in automatico
	});

	// 5. Aggiorna quantità su Sanity (scalata)
	await writeClient.patch(ticket._id).dec({ quantita: quantity }).commit();

	return stripeSession.url;
}
