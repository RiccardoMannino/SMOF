"use client";
import { toast } from "react-toastify";

import { createCart } from "@/lib/action";

import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

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
};

type nuovoOggetto = {
	id_biglietto: string;
	email: string | null | undefined;
	nome:
		| string
		| {
				eventName: string;
		  };
	prezzo: number;
	quantita: number;
};

export function TicketPurchaseButton({
	ticket,
	email,
}: {
	ticket: Ticket | SingleTicket;
	email: string | null | undefined;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handlePurchase = async () => {
		setIsLoading(true);

		try {
			// Crea una sessione di checkout
			const response = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ticketId: ticket._id,
					ticketType: ticket._type,
					quantity: quantity,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Errore durante la creazione del checkout"
				);
			}
			// Ottieni la URL della sessione e reindirizza
			window.location.href = data.url;
		} catch (error) {
			console.error("Errore:", error);
			alert("Si è verificato un errore. Riprova più tardi.");
		} finally {
			setIsLoading(false);
		}
	};

	// Aggiungi oggetto al carrello
	function handleAddCart() {
		const nuovoOggetto: nuovoOggetto = {
			// id: ticket._id,
			id_biglietto: ticket._id,
			email: email,
			nome:
				ticket._type === "biglietto"
					? (ticket as SingleTicket).biglietto.eventName
					: ticket.biglietto,
			prezzo: ticket.prezzo,
			quantita: quantity,
		};

		toast.promise(
			createCart(
				email,
				nuovoOggetto,
				nuovoOggetto.id_biglietto,
				nuovoOggetto.quantita
			),
			{
				pending: "Aggiornamento carrello in corso...",
				// ✅ Usa la proprietà 'message' ritornata dalla Server Action
				success: {
					render({ data }) {
						return data.message;
					},
				},

				error: {
					render({ data }) {
						// 'data' qui è l'oggetto Error lanciato: Error("Errore...")
						// Ora puoi accedere alla proprietà 'message' di quell'oggetto.
						const errorObject = data as Error; // Aggiungi un type assertion per sicurezza

						return `Operazione fallita: ${errorObject.message || errorObject.toString() || "Errore generico"}`;
					},
				},
			}
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<label htmlFor={`quantity-${ticket._id}`} className="text-chocolate">
					Quantità:
				</label>
				<input
					id={`quantity-${ticket._id}`}
					type="number"
					min="1"
					max={ticket.quantita}
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
					disabled={ticket.quantita === 0}
					className="w-16 p-2 border border-chocolate rounded"
				/>
				<span className="text-sm text-gray-500">
					(Disponibili: {ticket.quantita})
				</span>
			</div>

			<button
				onClick={handlePurchase}
				disabled={isLoading || ticket.quantita < 1 || quantity < 1}
				className={`py-2 px-4 rounded ${
					isLoading || ticket.quantita < 1
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer"
				}`}
			>
				{isLoading
					? "Caricamento..."
					: ticket.quantita < 1
						? "Esaurito"
						: `Acquista Subito - €${Number(ticket.prezzo) * quantity}`}
			</button>

			{/* aggiungere toast con l'esito dell'aggiunta al carrello */}
			<form action={handleAddCart} className="">
				<button
					type="submit"
					className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded ${
						isLoading || ticket.quantita < 1
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer "
					}`}
					disabled={isLoading || ticket.quantita < 1 || quantity < 1}
				>
					Aggiungi al Carrello <ShoppingCartIcon />
				</button>
			</form>
		</div>
	);
}
