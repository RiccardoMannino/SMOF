import { NextResponse } from "next/server";

export async function GET() {
	// Recupera le variabili d'ambiente
	const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
	const emailJsServiceId = process.env.EMAILJS_SERVICE_ID;
	const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID;

	// Se una delle variabili è mancante, restituisci un errore
	if (!emailJsPublicKey || !emailJsServiceId || !emailJsTemplateId) {
		return NextResponse.json(
			{ error: "Una o più variabili d'ambiente mancano." },
			{ status: 400 }, // Bad Request
		);
	}

	// Crea il dato di risposta
	const responseData = {
		emailJsPublicKey,
		emailJsServiceId,
		emailJsTemplateId,
	};

	// Restituisci la risposta JSON
	return NextResponse.json(responseData);
}
