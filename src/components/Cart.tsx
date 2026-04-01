import { deleteCart, deleteSingleItem } from "@/lib/action";
import { getCart } from "@/lib/data-cart";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Cart({ email }: { email: string }) {
	const vediCarrello = await getCart(email);

	console.log(vediCarrello);

	// totale carrello
	const totale = vediCarrello?.reduce(
		(acc, curr) => acc + curr.prezzo * curr.quantita,
		0,
	);

	// funzione svuota carrello
	const cancellaCarrello = async () => {
		"use server";
		await deleteCart(email);
	};

	if (!email) return;

	console.log("carrello", vediCarrello);

	return (
		<>
			<div className="min-h-fit ">
				<div
					className={`grid place-items-center grid-cols-4  grid-flow-row ${vediCarrello.length === 0 && "hidden"}`}
				>
					<p className="px-6 py-4 text-center col-start-1 ">Nome articolo</p>
					<p className="px-6 py-4 text-center col-start-2 ">Quantità</p>
					<p className="px-6 py-4 text-center col-start-3 ">Prezzo</p>
					<p className="px-6 py-4 text-center col-start-4 ">ID biglietto</p>

					{vediCarrello.length > 0 ? (
						vediCarrello.map((nome) => (
							<React.Fragment key={nome.id}>
								<p className="text-center px-6 py-4 col-start-1 ">
									{nome.nome ? nome.nome : nome.nome?.eventName}
								</p>
								<p className="text-center px-6 py-4  ">{nome.quantita}</p>
								<p className="text-center px-6 py-4 ">€{nome.prezzo}</p>
								<p className="min-w-0 max-w-4 px-6 py-4 col-start-4  overflow-hidden">
									{nome.id_biglietto}
								</p>
								<form
									className="col-start-5 place-items-center"
									action={async () => {
										"use server";
										await deleteSingleItem(email, nome.id);
									}}
								>
									<button className="flex flex-col items-center px-2 py-4 hover:text-rust transition-all hover:cursor-pointer  ">
										Elimina
										<TrashIcon className="" />
									</button>
								</form>
							</React.Fragment>
						))
					) : (
						<p className="text-3xl">Carrello Vuoto</p>
					)}
				</div>
				{/* totale carrello */}
				<p className={`mt-10 mb-4 ${vediCarrello.length === 0 && "hidden"}`}>
					{vediCarrello.length > 0 && `Totale €${totale}`}
				</p>
			</div>

			{/* bottoni carrello se ci sono elementi altrimenti testo */}
			{vediCarrello.length >= 1 ? (
				<div className="flex w-full justify-between">
					<form action={cancellaCarrello}>
						<button
							type="submit"
							className="bg-chocolate py-2 px-4 text-ivory hover:bg-rust transition-all hover:cursor-pointer max-sm:px-2 max-sm:py-1 rounded self"
						>
							Svuota Carrello
						</button>
					</form>
					<form>
						<button
							type="submit"
							className=" max-sm:px-2 max-sm:py-1 bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer py-2 px-4 rounded self"
						>
							Procedi all&apos;acquisto
						</button>
					</form>
				</div>
			) : (
				<div className="flex flex-col gap-4 min-h-80 ">
					<div>
						<p className="text-2xl">Carrello Vuoto</p>
					</div>
					<div className="flex flex-col justify-between min-h-72">
						<p className="text-2xl">
							Vai alla pagina ticket e aggiungi al carrello gli eventi che
							desideri acquistare
						</p>
						<Link
							href="/tickets"
							className="bg-chocolate text-ivory hover:bg-rust transition-all hover:cursor-pointer py-2 px-4 rounded text-center text-lg"
						>
							Pagina Ticket
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
