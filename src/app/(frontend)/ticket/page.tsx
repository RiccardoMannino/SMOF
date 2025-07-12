import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import { sanityFetch } from "@/sanity/lib/live";
import { TICKET_QUERY } from "@/sanity/lib/queries";
import { CheckIcon } from "lucide-react";
import React from "react";

export default async function page() {
	const { data: ticket } = await sanityFetch({
		// query dei ticket
		query: TICKET_QUERY,
	});
	return (
		<main className="container mx-auto bg-forest h-full min-h-screen">
			<h1 className="text-2xl  sm:text-3xl md:text-4xl mt-7 font-bold text-mustard  transition-colors">
				Informazioni Ticket
			</h1>
			<div className="bg-ivory p-10 rounded-2xl my-20 w-full text-chocolate flex flex-col  relative">
				<h1 className="text-center text-3xl sm:text-4xl mb-6">
					Tipi di ticket
				</h1>
				<div className="flex  h-fit w-full gap-5 justify-center my-6 relative">
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
									€200 <span className="font-normal">per tutti i giorni</span>
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
		</main>
	);
}
