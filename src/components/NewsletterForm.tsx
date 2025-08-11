"use client";

import { useTransition, useState } from "react";
import { updateNewsletterSubscription } from "@/lib/action";
import Link from "next/link";

export function NewsletterForm({
	context = "home",
	subscribe,
}: {
	context?: "home" | "utente";
	subscribe: boolean;
}) {
	const [isPending, startTransition] = useTransition();
	const [optimistic, setOptimistic] = useState(subscribe);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const nextValue = !optimistic;
		setOptimistic(nextValue); // update ottimistico

		startTransition(async () => {
			try {
				await updateNewsletterSubscription(nextValue);
				// La pagina verrà revalidata -> Server rilegge -> prop cambia -> remount via key
			} catch {
				setOptimistic(!nextValue); // rollback
			}
		});
	}

	const isSubscribed = optimistic;

	const title =
		context === "home" ? (
			!isSubscribed ? (
				"Iscriviti alla nostra Newsletter per rimanere aggiornato sugli eventi"
			) : (
				<p>
					Sei già iscritto alla Newsletter! <br /> per disiscriverti vai alla{" "}
					<Link href="/utente" className="underline text-burnt">
						pagina utente
					</Link>
				</p>
			)
		) : isSubscribed && isPending ? (
			"Iscrizione in corso..."
		) : !isSubscribed && isPending ? (
			"Cancellazione in corso..."
		) : !isSubscribed ? (
			"Iscriviti alla newsletter"
		) : (
			"Sei già iscritto alla newsletter"
		);

	const buttonLabel =
		context === "home"
			? "Iscriviti"
			: isSubscribed
				? "Cancellati dalla newsletter"
				: "Iscriviti";

	return (
		<div
			className={`w-full flex justify-between gap-1.5  ${context === "home" ? "flex-col" : "max-sm:flex-col"}`}
		>
			<h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-chocolate">
				{title}
			</h1>
			{context === "home" && isSubscribed ? null : (
				<form onSubmit={handleSubmit} className="self-center">
					<button
						className={`border-2 w-fit border-chocolate rounded-2xl p-2 hover:text-ivory ${
							isPending &&
							"hover:cursor-not-allowed hover:bg-chocolate/50 bg-chocolate/50 text-white border-0 border-ivory"
						} hover:bg-chocolate transition-colors cursor-pointer`}
						type="submit"
						disabled={isPending}
					>
						{isPending ? "Caricamento..." : buttonLabel}
					</button>
				</form>
			)}
		</div>
	);
}
