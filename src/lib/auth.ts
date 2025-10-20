import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createOrUpdateUser } from "./action";
import type { NextAuthConfig } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const authConfig: NextAuthConfig = {
	adapter: SupabaseAdapter({
		// L'URL del tuo progetto Supabase
		url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,

		// 🚨 CHIAVE SEGRETA (Service Role Key) - Fondamentale per l'adapter V5!
		secret: process.env.SUPABASE_KEY as string,
	}),
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
				const stableUid = account?.providerAccountId || user?.id;

				await createOrUpdateUser({
					uid: stableUid,
					name: user.name || "",
					email: user.email || "",
					image: user.image || "",
				});

				return true;
			} catch (error) {
				console.error("Errore nel salvare su Sanity:", error);
				return false;
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
