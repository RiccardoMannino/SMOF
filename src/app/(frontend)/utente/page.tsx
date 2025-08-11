import { getNewsletterStatus } from "@/lib/getNewsletterStatus";
import { NewsletterForm } from "@/components/NewsletterForm";

import { notFound } from "next/navigation";

export default async function UtentePage() {
	const { session, isSubscribed } = await getNewsletterStatus();

	// se non esiste l'utente
	if (!session?.user) return notFound();

	return (
		<section className="max-w-2xl mx-auto my-10 p-8 rounded-lg bg-ivory shadow-lg border border-chocolate">
			<h1 className="text-3xl font-bold text-chocolate mb-6">Area Utente</h1>
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-rust mb-3">
					Biglietti acquistati
				</h2>
				{/* Sostituisci con la lista reale dei biglietti */}
				<div className="bg-mustard/20 rounded p-4 text-chocolate">
					<p>Nessun biglietto acquistato.</p>
				</div>
			</div>
			<div>
				<h2 className="text-xl font-semibold text-rust mb-3">Newsletter</h2>
				<div className="bg-mustard/20 rounded p-4 flex flex-col items-center w-full">
					<NewsletterForm
						key={String(isSubscribed)} // forza remount quando cambia
						context="utente"
						subscribe={isSubscribed}
					/>
				</div>
			</div>
		</section>
	);
}
