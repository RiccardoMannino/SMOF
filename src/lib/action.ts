"use server";

import { readClient, writeClient } from "@/sanity/lib/client";
import { signIn, signOut } from "./auth";
import { User } from "next-auth";
import { auth } from "@/lib/auth";
import { supabase } from "./supabase";

import { revalidatePath, revalidateTag } from "next/cache";
import { toast } from "react-toastify";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// 	apiVersion: "2025-06-30.basil",
// });

type Uid = {
	uid: string | undefined;
	subscribeNewsletter?: boolean;
};

type nuovoOggetto = {
	id_biglietto: string;
	email: string | null | undefined;
	nome: string;
	prezzo: number;
	quantita: number;
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
				role: "user",
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

export async function createCart(
	email: string | null | undefined,
	updateFields: nuovoOggetto,
	id_biglietto: string,
	quantita: number
) {
	// Recupera l'oggetto esistente se presente
	const { data, error } = await supabase
		.from("oggetti_carrello")
		.select("quantita")
		.eq("email", email)
		.eq("id_biglietto", id_biglietto);

	if (error) {
		throw new Error("Errore nella lettura del carrello");
	}

	// variabile creata per la visualizzazione del toast
	let resultMessage = "";

	if (data && data.length > 0) {
		// L'oggetto esiste già: aggiorno la quantità
		const nuovaQuantita = data[0]?.quantita + quantita;
		const nuovoUpdateFields = { ...updateFields, quantita: nuovaQuantita };

		//aggiorna la quantità del carrello
		const { error: updateError } = await supabase
			.from("oggetti_carrello")
			.update(nuovoUpdateFields)
			.eq("email", email)
			.eq("id_biglietto", id_biglietto)
			.select();

		if (updateError) {
			throw new Error("Errore nell'aggiornamento della quantità");
		}

		resultMessage = "Quantità biglietto aggiornata con successo! 🛒";
	} else {
		//altrimenti se l'oggetto non esiste: inserisco come nuovo elemento
		const { error: insertError } = await supabase
			.from("oggetti_carrello")
			.insert(updateFields);

		if (insertError) {
			throw new Error("Errore nell'inserimento nuovo oggetto");
		}

		resultMessage = "Biglietto aggiunto al carrello! 🎉";
	}

	revalidatePath("/carrello");
	revalidatePath("/ticket");

	return { data, message: resultMessage };
}

// funzione che svuota il carrello
export async function deleteCart(email: string | null | undefined) {
	const { error } = await supabase
		.from("oggetti_carrello")
		.delete()
		.eq("email", email);

	if (error) {
		throw new Error("Errore nella cancellazione del carrello");
	}

	revalidatePath("/carrello");
}

// funzione elimina un singolo elemento
export async function deleteSingleItem(email: string, item: number) {
	const { error } = await supabase
		.from("oggetti_carrello")
		.delete()
		.eq("email", email)
		.eq("id", item);

	if (error) {
		throw new Error("Errore nella cancellazione del carrello");
	}

	revalidatePath("/carrello");
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/utente" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
