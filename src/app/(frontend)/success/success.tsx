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
						name: data?.session?.eventName || data?.session?.nome_biglietto,
						price: (data?.session?.amount_total / 100).toFixed(2),
						quantity: data?.session?.quantita,
					},
				],
			};

			console.log("[SUCCESS-PAGE] 💾 Ordine salvato nello store:", {
				orderId: newOrder.orderId,
				ticketType: newOrder.items[0]._type,
				quantita: newOrder.items[0].quantity,
				prezzo: newOrder.items[0].price,
			});

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
		<div className="max-w-4xl mx-auto p-8">
			<div className="bg-ivory border-2 border-mustard text-chocolate px-6 py-4 rounded-lg mb-6">
				<h1 className="text-3xl font-bold">✓ Pagamento riuscito!</h1>
				<p className="text-lg mt-2">Il tuo biglietto è stato confermato</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Dettagli ordine */}
				<div className="bg-white text-chocolate shadow-md rounded-lg px-6 py-6 border border-chocolate/20">
					<h2 className="text-xl font-bold text-mustard mb-4">
						Dati personali
					</h2>
					<div className="space-y-3">
						<p>
							<strong>Nome:</strong> {data?.session?.customer_name || "N/A"}
						</p>
						<p>
							<strong>Email:</strong> {data?.session?.customer_email}
						</p>
						<p>
							<strong>ID Ordine:</strong> <br />
							<span className="text-sm font-mono">{data?.session?.id}</span>
						</p>
						<p>
							<strong>Data:</strong> {new Date().toLocaleDateString("it-IT")}
						</p>
					</div>
				</div>

				{/* Dettagli biglietto */}
				<div className="bg-ivory text-chocolate shadow-md rounded-lg px-6 py-6 border border-chocolate/20">
					<h2 className="text-xl font-bold text-mustard mb-4">
						Biglietto acquistato
					</h2>
					<div className="space-y-3">
						<p>
							<strong>Tipo:</strong> {data?.session?.tipo_ticket}
						</p>
						<p>
							<strong>Nome:</strong>{" "}
							{data?.session?.eventName || data?.session?.nome_biglietto}
						</p>
						<p>
							<strong>Quantità:</strong> {data?.session?.quantita}
						</p>
						{data?.session?.sessione && (
							<p>
								<strong>Data/Ora:</strong> <br />
								{new Date(data.session.sessione).toLocaleString("it-IT")}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Riepilogo pagamento */}
			<div className="bg-white text-chocolate shadow-md rounded-lg px-6 py-6 border border-mustard/30 mt-6">
				<h2 className="text-xl font-bold text-mustard mb-4">
					Riepilogo pagamento
				</h2>
				<div className="space-y-3 border-t pt-4">
					<div className="flex justify-between">
						<span>Prezzo unitario:</span>
						<span>€{(data?.session?.prezzo_unitario || 0).toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span>Quantità:</span>
						<span>x{data?.session?.quantita}</span>
					</div>
					<div className="flex justify-between border-t pt-2 font-bold text-lg">
						<span>Totale pagato:</span>
						<span className="text-rust">
							€{(data?.session?.amount_total / 100).toFixed(2)}
						</span>
					</div>
					<p className="text-sm text-gray-600 mt-2">
						<strong>Stato:</strong>{" "}
						{data?.session?.payment_status === "paid" ? "✓ Pagato" : "Pendente"}
					</p>
				</div>
			</div>

			<div className="text-center mt-8">
				<p className="text-chocolate mb-4">
					Un email di conferma è stato inviato a {data?.session?.customer_email}
				</p>
				<Link
					href="/"
					className="inline-block px-6 py-3 bg-mustard text-ivory rounded-lg hover:bg-rust transition-colors font-semibold"
				>
					Torna alla home
				</Link>
			</div>
		</div>
	);
}
