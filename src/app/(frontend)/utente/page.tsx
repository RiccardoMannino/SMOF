import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCurrentUserRole } from "@/lib/getUserRole";
import { getNewsletterStatus } from "@/lib/getNewsletterStatus";
import Utente from "./utente";

export default async function UtentePage() {
	const { isSubscribed } = await getNewsletterStatus();
	const { session, role } = await getCurrentUserRole();

	// se non esiste l'utente
	if (!session?.user) return notFound();

	return (
		<section className="max-w-2xl sm:mx-auto max-sm:mx-[1rem] my-10 p-8 rounded-lg bg-ivory shadow-lg border border-chocolate">
			<h1 className="text-3xl font-bold text-chocolate mb-6">
				{role === "admin" ? "Pannello Admin" : "Area Utente"}
			</h1>
			<div className="mb-8">
				{role === "admin" ? (
					<h2 className="text-xl font-semibold text-rust mb-3">
						Scrivi newsletter
					</h2>
				) : (
					<>
						<h2 className="text-xl font-semibold text-rust mb-3">
							Biglietti acquistati
						</h2>
						<div className="bg-mustard/20 rounded p-4 text-chocolate overflow-y-scroll">
							<Utente />
						</div>
						<div>
							<h2 className="text-xl font-semibold text-rust my-3">
								Newsletter
							</h2>
							<div className="bg-mustard/20 rounded p-4 flex flex-col items-center w-full">
								<NewsletterForm
									key={String(isSubscribed)} // forza remount quando cambia
									context="utente"
									subscribe={isSubscribed}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
