import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const sessionId = (await searchParams).session_id;
	console.log("sessionId pagina success:", sessionId);

	const response = await fetch(
		`http://localhost:3000/api/create-checkout/success?session_id=${sessionId}`
	);

	if (!response.ok) {
		throw new Error(`Error: ${response.status} - ${await response.text()}`);
	}

	const data = await response.json();
	console.log("data:", data);

	if (!sessionId) {
		return (
			<div className="text-center p-8">
				<h1 className="text-2xl font-bold mb-4">Sessione non valida</h1>
				<p>Non è stato possibile recuperare i dettagli dell&apos;ordine.</p>
				<Link
					href="/"
					className="text-mustard hover:underline mt-4 inline-block"
				>
					Torna alla home
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-8">
			<div className="bg-ivory border  text-chocolate px-4 py-3 rounded mb-6">
				<h1 className="text-2xl font-bold">Pagamento riuscito!</h1>
			</div>

			<div className="bg-white text-chocolate shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl mb-4">Dettagli dell&apos;ordine:</h2>

				<div className="mb-4">
					{data.session.customer_name && (
						<p>
							{/* Nome acquirente */}
							<strong>Nome:</strong> {data.session.customer_name}
						</p>
					)}
					{data.session.customer_email && (
						<p>
							{/* Email acquirente */}
							<strong>Email:</strong> {data.session.customer_email}
						</p>
					)}
					<p>
						<strong>Stato del pagamento:</strong>{" "}
						{data.session.payment_status === "paid" ? "Pagato" : ""}
					</p>
					<p>Biglietto Acquistato : {data.session.metadata}</p>
					<p>Quantità: {data.session.quantita}</p>
					{data.session.amount_total && (
						<p>
							<strong>Totale pagato:</strong>{" "}
							{(data.session.amount_total / 100).toFixed(2)}€
						</p>
					)}
				</div>
			</div>

			<div className="text-center">
				<Link href="/" className="text-mustard">
					Torna alla home
				</Link>
			</div>
		</div>
	);
}
