import React from "react";
import { TicketPurchaseButton } from "@/components/TicketPurchaseButton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import { writeClient } from "@/sanity/lib/client";
import { CheckIcon } from "lucide-react";

type Ticket = {
	_id: string;
	_type: string;
	biglietto: string;
	prezzo: string;
	quantita: number;
};

async function getTickets() {
	// Biglietti giornalieri
	const dailyTicket = await writeClient.fetch(
		`*[_type == "giornaliero" && quantita >= 0][0..2]{ 
      _id, 
      _type,
      biglietto, 
      prezzo, 
      quantita,
    }`
	);

	// Biglietti festival completo
	const festTicket = await writeClient.fetch(
		`*[_type == "festival" && quantita >= 0][0]{ 
      _id, 
      _type,
      biglietto, 
      prezzo, 
      quantita,
    }`
	);

	// Biglietti singolo eventi

	const singleEvent = await writeClient.fetch(
		`*[_type == "biglietto" && quantita >= 0][0...50]{ 
      _id, 
      _type,
      biglietto, 
      prezzo, 
      quantita,
    }`
	);

	return {
		dailyTicket,
		festTicket,
		singleEvent,
	};
}

export default async function page() {
	const tickets = await getTickets();

	return (
		<main className="container mx-auto bg-forest h-full min-h-screen">
			<h1 className="text-2xl max-sm:text-center  sm:text-3xl md:text-4xl mt-7 font-bold text-mustard  transition-colors">
				Informazioni Ticket
			</h1>
			<div className="bg-ivory mx-auto  p-10 rounded-2xl my-20 w-full text-chocolate flex flex-col  relative">
				<h1 className="text-center text-3xl sm:text-4xl mb-6">
					Tipi di ticket
				</h1>
				<div className="flex max-sm:flex-col  h-fit w-full gap-5 justify-center my-6 relative">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>
								<h2 className="text-2xl">Ticket giornaliero</h2>
								<h3 className="text-3xl font-bold">
									€50 <span className="font-normal">per il giorno scelto</span>
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-center">
							<button className="hover:cursor-pointer border-chocolate border-2 hover:scale-105 transition-all rounded-xl py-2 px-4 ">
								Acquista biglietto
							</button>
						</CardContent>
						<CardFooter className="flex flex-col items-start gap-2">
							<div className="flex ">
								<CheckIcon />
								<span>Accesso a tutti gli eventi di un singolo giorno</span>
							</div>
							<div className="flex">
								<CheckIcon />
								<span>include workshop e attività</span>
							</div>
						</CardFooter>
					</Card>

					<Card className="w-full">
						<CardHeader>
							<CardTitle>
								<h2 className="text-2xl">Ticket Fest</h2>
								<h3 className="text-3xl font-bold">
									€150 <span className="font-normal">per tutti i giorni</span>
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-center">
							<button className="hover:cursor-pointer border-chocolate border-2 hover:scale-105 transition-all rounded-xl py-2 px-4 ">
								Acquista biglietto
							</button>
						</CardContent>
						<CardFooter className="flex flex-col items-start gap-2">
							<div className="flex ">
								<CheckIcon />
								<span>Accesso a tutti gli eventi del festival</span>
							</div>
							<div className="flex">
								<CheckIcon />
								<span>include workshop e attività</span>
							</div>
						</CardFooter>
					</Card>

					<Card className="w-full">
						<CardHeader>
							<CardTitle>
								<h2 className="text-2xl">Ticket Custom</h2>
								<p className="text-xl">
									(scegli i singoli eventi a tuo piacimento)
								</p>
								<h3 className="text-lg font-bold">
									Prezzo variabile a seconda della scelta degli eventi
								</h3>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-center">
							<button className="hover:cursor-pointer border-chocolate border-2 hover:scale-105 transition-all rounded-xl py-2 px-4 ">
								Scegli eventi
							</button>
						</CardContent>
						<CardFooter className="flex flex-col items-start gap-2">
							<div className="flex ">
								<CheckIcon />
								<span>Accesso agli eventi scelti</span>
							</div>
							<div className="flex">
								<CheckIcon />
								<span>include workshop e attività</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>

			{/* Ticket Giornalieri */}
			<section className="max-w-4xl mx-auto my-10 p-8">
				<h1 className="text-3xl font-bold text-mustard mb-6">
					Biglietti Eventi Singoli
				</h1>
				{tickets.singleEvent ? (
					<div className="grid gap-8 md:grid-cols-2">
						{tickets?.singleEvent?.map((ticket: Ticket) => (
							<div
								key={`${ticket._type}-${ticket._id}`}
								className="bg-ivory shadow-md rounded-lg p-6 border border-chocolate/20"
							>
								<h2 className="text-xl font-semibold text-rust mb-2">
									{ticket.biglietto}
								</h2>
								<p className="text-chocolate text-lg font-bold mb-4">
									€{ticket.prezzo}
								</p>
								<TicketPurchaseButton ticket={ticket} />
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-chocolate">
						Nessun biglietto disponibile al momento.
					</p>
				)}
			</section>
			<section className="max-w-4xl mx-auto my-10 p-8">
				<h1 className="text-3xl font-bold text-mustard mb-6">
					Biglietti Giornalieri
				</h1>

				<div className="grid gap-8 md:grid-cols-2">
					{tickets?.dailyTicket?.toReversed().map((ticket: Ticket) => (
						<div
							key={`${ticket._type}-${ticket._id}`}
							className="bg-ivory shadow-md rounded-lg p-6 border border-chocolate/20"
						>
							<h2 className="text-xl font-semibold text-rust mb-2">
								{ticket.biglietto}
							</h2>
							<p className="text-chocolate text-lg font-bold mb-4">
								€{ticket.prezzo}
							</p>
							{ticket.quantita > 0 ? (
								<TicketPurchaseButton ticket={ticket} />
							) : (
								<p className="text-center text-mustard">
									Nessun biglietto disponibile al momento.
								</p>
							)}
						</div>
					))}
				</div>
			</section>
			{/* Ticket Festival */}
			<section className="max-w-4xl mx-auto my-10 p-8">
				<h1 className="text-3xl font-bold text-mustard mb-6">
					Biglietto Festival
				</h1>

				{/* Visto che è un singolo ticket non lo mappiamo */}
				{tickets.festTicket && (
					<div className="grid gap-8 md:grid-cols-2">
						<div className="bg-ivory shadow-md rounded-lg p-6 border border-chocolate/20">
							<h2 className="text-xl font-semibold text-rust mb-2">
								{tickets.festTicket.biglietto}
							</h2>
							<p className="text-chocolate text-lg font-bold mb-4">
								€{tickets.festTicket.prezzo}
							</p>
							{tickets.festTicket.quantita > 0 ? (
								<TicketPurchaseButton ticket={tickets.festTicket} />
							) : (
								<p className="text-center text-mustard">
									Nessun biglietto disponibile al momento.
								</p>
							)}
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
