import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createOrUpdateUser } from "./action";

import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth, request }) {
			return !!auth?.user;
		},
		async signIn({ user, account, profile }) {
			console.log("SignIn callback chiamato con:", {
				userId: user.id,
				userName: user.name,
				userEmail: user.email,
			});

			try {
				const result = await createOrUpdateUser({
					uid: user.id,
					name: user.name || "",
					email: user.email || "",
					image: user.image || "",
				});

				console.log("Utente salvato con successo:", result);
				return true;
			} catch (error) {
				console.error("Errore nel salvare su Sanity:", error);
				// Puoi decidere se bloccare il login o permetterlo comunque
				// return false; // Blocca il login
				return true; // Permette il login anche se Sanity fallisce
			}
		},
		async session({ session, token }) {
			// Aggiungi informazioni aggiuntive alla sessione se necessario
			if (session?.user?.email) {
				try {
					// Opzionale: recupera dati aggiuntivi da Sanity
					console.log("Sessione creata per:", session.user.email);
				} catch (error) {
					console.error("Errore nel recuperare dati utente:", error);
				}
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
