"use client";

import Link from "next/link";
import { success } from "@/lib/success";
import { useQuery } from "@tanstack/react-query";
import { useBuyedTicketStore } from "@/store/useBuyedTicketStore";
import { useEffect } from "react";

export default function Success({
	sessionId,
}: {
	sessionId: string | string[] | undefined;
}) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["session", sessionId],
		staleTime: Infinity, // Previene il refetch
		refetchOnMount: false, // non refetchare al mount
		refetchOnWindowFocus: false, // non refetchare quando la finestra riacquisisce il focus
		retry: false, // non riprovare se fallisce
		queryFn: () => success(sessionId),
	});

	// funzione proveniente dallo store per l'aggiunta degli ordini
	const aggiungiOrdine = useBuyedTicketStore((state) => state.aggiungiOrdine);

	useEffect(() => {
		// La logica si esegue solo se i dati esistono e non ci sono errori.
		if (data && !error) {
			const newOrder = {
				orderId: data?.session?.id, // id ordine di stripe
				date: new Date().toISOString(), // data e ora di acquisto
				// dati biglietto
				items: [
					{
						_id: data?.session?.ticketId,
						_type: data?.session?.ticketType,
						name: data?.session?.metadata,
						price: (data?.session?.amount_total / 100).toFixed(2),
						quantity: data?.session?.quantita,
					},
				],
			};

			// Chiamiamo l'azione dello store per salvare l'ordine
			aggiungiOrdine(newOrder);
		}
	}, [data, error, aggiungiOrdine]);

	if (isLoading) return <div>Caricamento in corso...</div>;

	if (error) {
		return (
			<div className="text-center p-8 text-mustard">
				<h1 className="text-2xl font-bold mb-4">Errore</h1>
				<p className="">{(error as Error).message}</p>
				<Link href="/" className="hover:underline mt-4 inline-block">
					Torna alla home
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-8">
			<div className="bg-ivory border text-chocolate px-4 py-3 rounded mb-6">
				<h1 className="text-2xl font-bold">Pagamento riuscito!</h1>
			</div>

			<div className="bg-white text-chocolate shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-xl mb-4">Dettagli dell&apos;ordine:</h2>

				<div className="mb-4">
					<p>
						<strong>Nome:</strong> {data?.session?.customer_name}
					</p>

					<p>
						<strong>Email:</strong> {data?.session?.customer_email}
					</p>

					<p>
						<strong>Stato del pagamento:</strong>{" "}
						{data?.session?.payment_status === "paid" ? "Pagato" : ""}
					</p>

					<p>Biglietto Acquistato: {data?.session.metadata}</p>
					<p>Quantità: {data?.session?.quantita}</p>

					<p>
						<strong>Totale pagato:</strong>{" "}
						{(data?.session?.amount_total / 100).toFixed(2)}€
					</p>
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
