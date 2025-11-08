import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { readClient } from "../../../../sanity/lib/client";

export async function GET() {
	const session = await auth();

	if (!session?.user?.email) {
		// Nessuna sessione, non c'è bisogno di fare logout
		return NextResponse.json({ shouldSignOut: false });
	}

	const user = await readClient.fetch(
		`*[_type == "user" && email == $email][0]`,
		{ email: session.user.email }
	);

	// Se l'utente non esiste, notifica il client che deve effettuare il logout
	if (!user) {
		return NextResponse.json({ shouldSignOut: true });
	}

	// L'utente esiste, tutto a posto
	return NextResponse.json({ shouldSignOut: false });
}
