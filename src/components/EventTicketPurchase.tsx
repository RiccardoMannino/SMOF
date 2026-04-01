"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ShoppingCart } from "lucide-react";

interface Sessione {
	_key: string;
	dataSelezionata?: string | null;
	quantita?: number | null;
}

interface EventTicketPurchaseProps {
	ticketId: string;
	eventName: string | null;
	sessioni?: Sessione[];
	prezzoTicket: number;
	prezzoEvento?: number | null;
	loggedIn: boolean;
}

export function EventTicketPurchase({
	ticketId,
	eventName,
	sessioni = [],
	prezzoTicket,
	loggedIn,
}: EventTicketPurchaseProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isOpen, setIsOpen] = useState(false);
	const [selectedSessions, setSelectedSessions] = useState<
		{ _key: string; quantita: number }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	// Controlla se la modale deve essere aperta al mount (basato su search params)
	useEffect(() => {
		const modalParam = searchParams.get("modal");
		if (modalParam === "ticket") {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [searchParams]);

	const openModal = () => {
		setIsOpen(true);
		// Aggiungi il parametro all'URL
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("modal", "ticket");
		router.push(newUrl.toString());
	};

	const closeModal = () => {
		setIsOpen(false);
		setError("");
		// Torna indietro per rimuovere il parametro
		router.back();
	};

	// console.log("[EventTicketPurchase] Props ricevuti:", {
	// 	ticketId,
	// 	eventName,
	// 	sessioni,
	// 	prezzoTicket,
	// 	loggedIn,
	// });
	// console.log(
	// 	`[EventTicketPurchase] Prezzo ricevuto: €${prezzoTicket} (tipo: ${typeof prezzoTicket})`,
	// );

	// Gestisce la selezione/deselezione di una sessione
	const handleSessionToggle = (
		sessionKey: string,
		maxQuantita: number | null | undefined,
	) => {
		setSelectedSessions((prev) => {
			const existing = prev.find((s) => s._key === sessionKey);
			if (existing) {
				return prev.filter((s) => s._key !== sessionKey);
			} else {
				return [...prev, { _key: sessionKey, quantita: 1 }];
			}
		});
	};

	// Gestisce il cambio di quantità per una sessione selezionata
	const handleQuantityChange = (sessionKey: string, quantita: number) => {
		setSelectedSessions((prev) =>
			prev.map((s) =>
				s._key === sessionKey ? { ...s, quantita: Math.max(1, quantita) } : s,
			),
		);
	};

	const totalQuantity = selectedSessions.reduce(
		(acc, s) => acc + s.quantita,
		0,
	);
	const totalPrice = totalQuantity * prezzoTicket;

	const formatDate = (dateString: string | null | undefined) => {
		if (!dateString) return "Data non disponibile";
		return new Date(dateString).toLocaleString("it-IT", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handlePurchase = async () => {
		if (!loggedIn) {
			setError("Devi essere loggato per acquistare i biglietti");
			return;
		}

		if (selectedSessions.length === 0) {
			setError("Seleziona almeno una sessione");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			// Costruisci i dati delle sessioni selezionate con le loro date e quantità
			const sessionsData = selectedSessions.map((selected) => {
				const sessione = sessioni.find((s) => s._key === selected._key);
				return {
					dataSelezionata: sessione?.dataSelezionata,
					quantitaAcquistata: selected.quantita,
					quantitaDisponibile: sessione?.quantita,
				};
			});

			const response = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ticketId,
					ticketType: "biglietto",
					quantity: totalQuantity,
					sessions: sessionsData,
					totalQuantity,
					totalPrice,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Errore durante la creazione del checkout",
				);
			}

			// Reindirizza a Stripe
			window.location.href = data.url;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Errore sconosciuto";
			setError(errorMessage);
			setIsLoading(false);
		}
	};

	if (!loggedIn) {
		return null;
	}

	// Se non ci sono sessioni disponibili, non mostra il bottone di acquisto
	if (!sessioni || sessioni.length === 0) {
		return;
	}

	return (
		<>
			{/* Bottone di acquisto */}
			<button
				onClick={openModal}
				className="bg-mustard text-ivory rounded-2xl w-fit p-3 cursor-pointer font-semibold flex items-center gap-2 hover:cursor-pointer transition-colors"
			>
				<ShoppingCart size={20} />
				Acquista Biglietti
			</button>

			{/* Modal  da modificare come quellla dello staff*/}
			{isOpen && (
				<div className="fixed inset-0 z-80 flex items-center justify-center bg-black/75 bg-opacity-50">
					<div className="bg-ivory rounded-xl shadow-lg max-w-lg w-full mx-4 max-h-96 overflow-auto">
						{/* Header */}
						<div className="sticky top-0 flex items-center justify-between gap-2 border-b p-4 bg-ivory">
							<h2 className="text-xl font-bold text-chocolate">
								Seleziona Sessioni - {eventName}
							</h2>
							<button
								onClick={closeModal}
								className="text-gray-500 hover:text-ivory p-1 rounded-2xl hover:cursor-pointer hover:bg-mustard transition color"
							>
								<X size={24} />
							</button>
						</div>

						{/* Content */}
						<div className="p-4">
							{sessioni.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									Nessuna sessione disponibile per questo evento
								</p>
							) : (
								<div className="space-y-3">
									{sessioni.map((sessione) => {
										const isSelected = selectedSessions.some(
											(s) => s._key === sessione._key,
										);
										const selectedSession = selectedSessions.find(
											(s) => s._key === sessione._key,
										);

										return (
											<div
												key={sessione._key}
												className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
											>
												<div className="flex items-start gap-3">
													<input
														type="checkbox"
														checked={isSelected}
														onChange={() =>
															handleSessionToggle(
																sessione._key,
																sessione.quantita,
															)
														}
														className="mt-1 cursor-pointer accent-mustard"
													/>
													<div className="flex-1">
														<div className="font-semibold text-chocolate">
															{formatDate(sessione.dataSelezionata)}
														</div>
														<div className="text-sm text-gray-600">
															{sessione.quantita ?? 0} posti disponibili
														</div>
													</div>

													{isSelected && (
														<div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
															<button
																onClick={() =>
																	handleQuantityChange(
																		sessione._key,
																		(selectedSession?.quantita || 1) - 1,
																	)
																}
																className="text-gray-600 hover:text-gray-800 font-bold"
																disabled={(selectedSession?.quantita || 1) <= 1}
															>
																−
															</button>
															<span className="w-8 text-center font-semibold">
																{selectedSession?.quantita || 1}
															</span>
															<button
																onClick={() =>
																	handleQuantityChange(
																		sessione._key,
																		(selectedSession?.quantita || 1) + 1,
																	)
																}
																className="text-gray-600 hover:text-gray-800 font-bold"
																disabled={
																	(selectedSession?.quantita || 0) >=
																	(sessione.quantita ?? 0)
																}
															>
																+
															</button>
														</div>
													)}
												</div>
											</div>
										);
									})}
								</div>
							)}

							{error && (
								<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
									{error}
								</div>
							)}
						</div>

						{/* Footer */}
						{sessioni.length > 0 && (
							<div className="sticky bottom-0 border-t bg-ivory p-4 space-y-3">
								<div className="flex justify-between text-lg font-semibold text-chocolate">
									<span>
										Totale ({totalQuantity}{" "}
										{totalQuantity === 1 ? "biglietto" : "biglietti"})
									</span>
									<span>€{totalPrice.toFixed(2)}</span>
								</div>
								<button
									onClick={handlePurchase}
									disabled={isLoading || selectedSessions.length === 0}
									className="w-full bg-mustard text-ivory rounded-lg py-3 font-semibold hover:bg-mustard/90 disabled:bg-gray-400 hover:cursor-pointer disabled:cursor-not-allowed transition-colors"
								>
									{isLoading ? (
										<span className="flex items-center justify-center gap-2">
											<span className="animate-spin">⏳</span>
											In elaborazione...
										</span>
									) : (
										`Procedi al Pagamento`
									)}
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
