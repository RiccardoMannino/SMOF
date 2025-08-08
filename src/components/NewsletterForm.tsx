"use client";
import { useState, useTransition } from "react";
import { updateNewsletterSubscription } from "@/lib/action";

export function NewsletterForm({ isSubscribed }: { isSubscribed: boolean }) {
	const [subscribed, setSubscribed] = useState(isSubscribed);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	// Funzione per gestire l'invio del modulo
	// e l'aggiornamento della sottoscrizione alla newsletter
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		startTransition(async () => {
			try {
				await updateNewsletterSubscription(!subscribed);
				setSubscribed(!subscribed);
			} catch (err) {
				setError("Errore nell'aggiornamento della newsletter.");
			}
		});
	}

	return (
		<>
			<h1 className="text-2xl mb-5 sm:text-3xl md:text-4xl text-center font-semibold text-chocolate ">
				{!subscribed
					? "Iscriviti alla nostra Newsletter per rimanere aggiornato sugli eventi"
					: "Grazie per esserti iscritto alla Newsletter"}
			</h1>
			<form onSubmit={handleSubmit} className="self-center">
				<button
					className={`border-2 w-fit border-chocolate rounded-2xl p-2 hover:text-ivory ${isPending && "bg-gray-500 text-white border-0 border-ivory "} hover:bg-chocolate transition-colors cursor-pointer`}
					type="submit"
					disabled={isPending}
				>
					{isPending
						? "Caricamento..."
						: subscribed
							? "Cancellati dalla newsletter"
							: "Iscriviti"}
				</button>
			</form>
			{error && <p className="text-red-600 mt-2 text-center">{error}</p>}
		</>
	);
}
