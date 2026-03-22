"use client";

import { useState } from "react";
import { createCart } from "@/lib/action";
import { toast } from "react-toastify";
import { ShoppingCartIcon } from "lucide-react";
import { dataFormattata } from "@/lib/date";

type Sessione = {
	_key: string;
	dataSelezionata: string;
	quantita: number;
};

type Ticket = {
	_id: string;
	_type: string;
	biglietto: string;
	prezzo: number;
	quantita: number;
};

type SingleTicket = {
	_id: string;
	_type: string;
	biglietto: {
		eventName: string;
	};
	prezzo: number;
	quantita: number;
	sessioni: Sessione[];
};

type nuovoOggetto = {
	id_biglietto: string;
	email: string | null | undefined;
	nome: string | { eventName: string };
	prezzo: number;
	quantita: number;
	sessione?: string; // data ISO della sessione scelta
};

export function TicketPurchaseButton({
	ticket,
	email,
}: {
	ticket: Ticket | SingleTicket;
	email: string | null | undefined;
}) {
	const isSingle = ticket._type === "biglietto";
	const sessioni: Sessione[] = isSingle
		? ((ticket as SingleTicket).sessioni ?? [])
		: [];

	const [isLoading, setIsLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [sessioneSelezionata, setSessioneSelezionata] =
		useState<Sessione | null>(sessioni.length > 0 ? sessioni[0] : null);

	// La quantità disponibile dipende dalla sessione scelta (se esiste)
	const quantitaDisponibile = sessioneSelezionata
		? sessioneSelezionata.quantita
		: ticket.quantita;

	const handlePurchase = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ticketId: ticket._id,
					ticketType: ticket._type,
					quantity: quantity,
					sessione: sessioneSelezionata?.dataSelezionata ?? null, // 👈 passa la data scelta
				}),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(
					data.message || "Errore durante la creazione del checkout",
				);
			}
			window.location.href = data.url;
		} catch (error) {
			console.error("Errore:", error);
			alert("Si è verificato un errore. Riprova più tardi.");
		} finally {
			setIsLoading(false);
		}
	};

	function handleAddCart() {
		const nuovoOggetto: nuovoOggetto = {
			id_biglietto: ticket._id,
			email: email,
			nome: isSingle
				? (ticket as SingleTicket).biglietto.eventName
				: ticket.biglietto,
			prezzo: ticket.prezzo,
			quantita: quantity,
			sessione: sessioneSelezionata?.dataSelezionata ?? undefined, // 👈 passa la data scelta
		};

		toast.promise(
			createCart(
				email,
				nuovoOggetto,
				nuovoOggetto.id_biglietto,
				nuovoOggetto.quantita,
			),
			{
				pending: "Aggiornamento carrello in corso...",
				success: {
					render({ data }) {
						return data.message;
					},
				},
				error: {
					render({ data }) {
						const errorObject = data as Error;
						return `Operazione fallita: ${errorObject.message || errorObject.toString() || "Errore generico"}`;
					},
				},
			},
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* SELECT SESSIONE — solo per biglietti singoli con sessioni */}
			{isSingle && sessioni.length > 0 && (
				<div className="flex flex-col gap-1">
					<label className="text-chocolate">Scegli data e ora:</label>
					<select
						className="p-2 border border-chocolate rounded bg-white text-chocolate"
						value={sessioneSelezionata?._key ?? ""}
						onChange={(e) => {
							const scelta = sessioni.find((s) => s._key === e.target.value);
							setSessioneSelezionata(scelta ?? null);
							setQuantity(1); // reset quantità al cambio sessione
						}}
					>
						{sessioni.map((s) => (
							<option key={s._key} value={s._key} disabled={s.quantita === 0}>
								{dataFormattata(s.dataSelezionata)}
								{s.quantita === 0 ? " — Esaurito" : ` — ${s.quantita} posti`}
							</option>
						))}
					</select>
				</div>
			)}

			{/* QUANTITÀ */}
			<div className="flex items-center gap-4">
				<label htmlFor={`quantity-${ticket._id}`} className="text-chocolate">
					Quantità:
				</label>
				<input
					id={`quantity-${ticket._id}`}
					type="number"
					min="1"
					max={quantitaDisponibile}
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					disabled={quantitaDisponibile === 0}
					className="w-16 p-2 border border-chocolate rounded"
				/>
				<span className="text-sm text-gray-500">
					(Disponibili: {quantitaDisponibile})
				</span>
			</div>

			{/* ACQUISTA */}
			<button
				onClick={handlePurchase}
				disabled={isLoading || quantitaDisponibile < 1 || quantity < 1}
				className={`py-2 px-4 rounded ${
					isLoading || quantitaDisponibile < 1
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer"
				}`}
			>
				{isLoading
					? "Caricamento..."
					: quantitaDisponibile < 1
						? "Esaurito"
						: `Acquista Subito - €${Number(ticket.prezzo) * quantity}`}
			</button>

			{/* CARRELLO */}
			<form action={handleAddCart}>
				<button
					type="submit"
					className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded ${
						isLoading || quantitaDisponibile < 1
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer"
					}`}
					disabled={isLoading || quantitaDisponibile < 1 || quantity < 1}
				>
					Aggiungi al Carrello <ShoppingCartIcon />
				</button>
			</form>
		</div>
	);
}
