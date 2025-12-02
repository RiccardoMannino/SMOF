import React from "react";
import { TicketPurchaseButton } from "@/components/TicketPurchaseButton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import { readClient, writeClient } from "../../../sanity/lib/client";
import { CheckIcon } from "lucide-react";
import { auth } from "@/lib/auth";

type SingleTicket = {
	_id: string;
	_type: string;
	biglietto: { eventName: string };
	eventName: string;
	prezzo: number;
	quantita: number;
};

type Ticket = {
	_id: string;
	_type: string;
	biglietto: string;
	prezzo: number;
	quantita: number;
};

async function getTickets() {
	// Biglietti giornalieri
	const dailyTicket = await readClient.fetch(
		`*[_type == "giornaliero" && quantita >= 0][0..2]{ 
      _id, 
      _type,
      biglietto, 
      prezzo, 
      quantita,
    }`
	);

	// Biglietti festival completo
	const festTicket = await readClient.fetch(
		`*[_type == "festival" && quantita >= 0][0]{ 
      _id, 
      _type,
      biglietto, 
      prezzo, 
      quantita,
    }`
	);

	// Biglietti singolo eventi

	const singleEvent = await readClient.fetch(
		`*[_type == "biglietto" && quantita >= 0][0...50]{ 
      biglietto ->{ 
			eventName,
			}, 
			_id, 
      _type,
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
	const sessione = await auth();
	const tickets = await getTickets();

	// console.log("ticket", sessione?.user?.email);

	console.log("ticket singoli eventi", tickets.singleEvent);

	return (
		<main className="container mx-auto h-full min-h-screen">
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
			{sessione?.user?.email ? (
				<>
					<section className="max-w-4xl mx-auto my-10 p-8">
						<h1 className="text-3xl font-bold text-mustard text-center mb-6">
							Biglietti Eventi Singoli
						</h1>
						{tickets.singleEvent && (
							<div className="grid gap-8 md:grid-cols-2">
								{tickets?.singleEvent?.map((ticket: SingleTicket) => (
									<div
										key={`${ticket._type}-${ticket._id}`}
										className="bg-ivory shadow-md rounded-lg p-6 border border-chocolate/20"
									>
										<h2 className="text-xl font-semibold text-rust mb-2">
											{ticket.biglietto.eventName}
										</h2>
										<p className="text-chocolate text-lg font-bold mb-4">
											€{ticket.prezzo}
										</p>
										<TicketPurchaseButton
											ticket={ticket}
											email={sessione.user?.email}
										/>
									</div>
								))}
							</div>
						)}
					</section>
					<section className="max-w-4xl mx-auto my-10 p-8">
						<h1 className="text-3xl font-bold text-mustard mb-6 text-center">
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
									<TicketPurchaseButton
										ticket={ticket}
										email={sessione.user?.email}
									/>
								</div>
							))}
						</div>
					</section>

					{/* Ticket Festival */}
					<section className="max-w-4xl mx-auto my-10 p-8">
						<h1 className="text-3xl font-bold text-mustard mb-6 text-center">
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

									<TicketPurchaseButton
										ticket={tickets.festTicket}
										email={sessione.user?.email}
									/>
								</div>
							</div>
						)}
					</section>
				</>
			) : (
				<p className="text-center text-mustard text-2xl">
					Accedi per poter visionare i biglietti disponibili
				</p>
			)}
		</main>
	);
}
