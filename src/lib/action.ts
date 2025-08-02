"use server";
import { readClient, writeClient } from "@/sanity/lib/client";
import { signIn, signOut } from "./auth";
import { User } from "next-auth";

type Uid = {
	uid: string | undefined;
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

export async function signInAction() {
	await signIn("google", { redirectTo: "/ticket" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
