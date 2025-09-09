"use client";
import { dataFormattata } from "@/lib/date";
import { useBuyedTicketStore } from "@/store/useBuyedTicketStore";

export default function Utente() {
	const ordine = useBuyedTicketStore((state) => state.ordine);

	return (
		<div>
			{/* Se la lungezza dell'array è maggiore di 0 quindi è popolato visualizza il contenuto altrimenti "Nessun biglietto acquistato" */}
			{ordine.length > 0 ? (
				ordine?.map((u, idx) => (
					<div key={idx}>
						{u?.items?.map((it, id) => (
							<p key={it?.name}>
								{idx + 1}) Biglietto: {it?.name} , Prezzo: {it.price}€ ,
								Quantità: {it.quantity}
							</p>
						))}
						Acquistato il {dataFormattata(u?.date)}
					</div>
				))
			) : (
				<p>Nessun Biglietto Acquistato</p>
			)}
		</div>
	);
}
