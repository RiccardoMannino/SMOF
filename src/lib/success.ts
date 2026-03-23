export const success = async (sessionId: string | string[] | undefined) => {
	if (!sessionId) {
		throw new Error("Session ID mancante");
	}

	// const response = await fetch(
	// 	`${process.env.NEXTAUTH_URL}/api/create-checkout/success?session_id=${sessionId}`,
	// 	{ next: { revalidate: false } } // Disabilita la revalidazione
	// );
	const response = await fetch(
		`http://localhost:3000/api/create-checkout/success?session_id=${sessionId}`,
		{ next: { revalidate: false } }, // Disabilita la revalidazione
	);

	if (!response.ok) {
		throw new Error("Errore nel recupero dei dettagli del pagamento");
	}

	return response.json();
};
