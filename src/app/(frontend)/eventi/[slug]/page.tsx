import { sanityFetch } from "../../../../sanity/lib/live";
import { EVENT_QUERY } from "../../../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dataFormattata, dataFineEvento } from "@/lib/date";
import { urlFor } from "../../../../sanity/lib/image";
import { components } from "../../../../sanity/portableTextComponent";
import { RelatedEvents } from "@/components/RelatedEvents";
import Image from "next/image";
import { ArrowBigLeft, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: evento } = await sanityFetch({
		query: EVENT_QUERY,
		params: await params,
	});

	async function handlePurchase() {
		try {
			// Crea una sessione di checkout
			const response = await fetch("/api/create-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ticketId: evento?._id,
					ticketType: evento?.eventName,
					quantity: 1,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Errore durante la creazione del checkout",
				);
			}
			// Ottieni la URL della sessione e reindirizza
			window.location.href = data.url;
		} catch (error) {
			console.error("Errore:", error);
			alert("Si è verificato un errore. Riprova più tardi.");
		}
	}

	const session = await auth();

	if (!evento) {
		notFound();
	}

	// TODO: collegare l'evento all'acquisto da questa sezione di sito
	// console.log("params", await params);
	// console.log("evento", evento.eventName);

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12 max-md:p-6 max-sm:text-center ">
			<div className="flex max-lg:gap-10 max-sm:flex-col-reverse gap-2 bg-ivory rounded-2xl p-5 text-chocolate min-h-80">
				<div className="flex flex-col w-full">
					{/* Titolo evento */}
					<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5   text-red-600">
						{evento?.eventName}
					</h1>
					{/* descrizione evento */}
					{evento?.eventDescription ? (
						<div className="prose mt-2   ">
							<div className="flex flex-col  gap-1.5">
								<span className="font-bold">Data evento:</span>{" "}
								{evento?.dateEvento
									?.map((data) => dataFormattata(data))
									.join(" e il ")}{" "}
								{evento?.dataFine
									? `fino alle ore ${evento?.dataFine.map((data) => dataFineEvento(data)).pop()}`
									: null}
							</div>

							<PortableText
								value={evento?.eventDescription}
								components={components}
							/>
						</div>
					) : null}
					{/* specifiche evento */}
					{evento?.specifiche ? (
						<div className="prose my-2">
							<PortableText
								value={evento?.specifiche}
								components={components}
							/>
						</div>
					) : null}
					<div className="flex flex-col gap-2">
						<p className="flex items-center gap-1.5 prose  ">
							<MapPin className="fill-red-500 stroke-white" size={64} />{" "}
							<span className="font-bold">Punto Raduno:</span>
							{evento?.raduno}
						</p>
						{evento.equipaggiamento && (
							<p className="prose">
								<span className="font-bold">Equipaggiamento:</span>{" "}
								{evento?.equipaggiamento}
							</p>
						)}
						{/* TODO: aggiungere bottone di acquisto (se loggati) */}
						{/* da aggiungere succesivamente */}
						{/* <p className="prose">
							<span className="font-bold">Costo:</span> {evento.biglietto}€ per
							persona
						</p> */}
						{/* {session?.user?.email ? (
							<button
								onClick={handlePurchase}
								className="bg-chocolate text-ivory rounded-2xl w-fit p-2 cursor-pointer font-semibold"
							>
								Acquista Ticket
							</button>
						) : null} */}
					</div>
				</div>
				{/* immagine evento */}
				<div className="w-full self-center flex justify-center max-lg:self-start">
					{evento?.immagineEvento ? (
						<Image
							className="rounded-2xl"
							src={urlFor(evento?.immagineEvento).auto("format").url()}
							alt={evento?.immagine?.alt || ""}
							width="500"
							height="700"
						/>
					) : null}
				</div>
				{/* eventi correlati */}
				<RelatedEvents
					relatedEvents={evento.relatedEvents}
					documentId={evento._id}
					documentType="eventi"
				/>
			</div>
			<Link
				href="/eventi"
				className="font-semibold flex gap-2 items-center text-mustard text-lg sm:text-xl md:text-2xl"
			>
				<ArrowBigLeft /> Torna agli eventi
			</Link>
		</main>
	);
}
