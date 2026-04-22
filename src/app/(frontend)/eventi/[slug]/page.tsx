import { sanityFetch } from "../../../../sanity/lib/live";
import { Fragment } from "react";
import {
	EVENT_QUERY,
	EVENT_TICKETS_QUERY,
} from "../../../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dataFormattata, dataFineEvento, dataSoloData } from "@/lib/date";
import { urlFor } from "../../../../sanity/lib/image";
import { components } from "../../../../sanity/portableTextComponent";
import { RelatedEvents } from "@/components/RelatedEvents";
import { EventTicketPurchase } from "@/components/EventTicketPurchase";
import Image from "next/image";
import { ArrowBigLeft, MapPin } from "lucide-react";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = (await props.params).slug;
	const { data: page } = await sanityFetch({
		query: EVENT_QUERY,
		params: { slug: params },
		// Metadata non deve mai contenere stega
		stega: false,
	});
	return {
		title: `SMOF - ${page?.eventName}`,
		description: `Scopri di più su questo evento del San Martino Outdoor Fest: ${page?.eventName}`,
		keywords: [
			`${page?.eventName}`,
			"San Martino Outdoor Fest",
			"SMOF",
			"Eventi Oudoor San Martino delle scale",
			"Festival San Martino",
		],
		openGraph: {
			title: `SMOF - ${page?.eventName}`,
			description: `Scopri di più su questo evento del San Martino Outdoor Fest`,
			locale: "it_IT",
			siteName: "SMOF - San Martino outdoor Fest",
			type: "website",
			url: `https://www.smofest.it/eventi/${params}`,
			images: ["/logo_smof.png"],
		},
	} satisfies Metadata;
}

export default async function Page({ params }: { params: Props }) {
	// Risolvi i parametri prima di usarli nelle query
	const resolvedParams = await params;

	// Fetch dei dati dell'evento e dei biglietti associati
	const { data: evento } = await sanityFetch({
		query: EVENT_QUERY,
		params: resolvedParams,
	});

	// Fetch dei biglietti associati all'evento
	const { data: eventTickets } = await sanityFetch({
		query: EVENT_TICKETS_QUERY,
		params: resolvedParams,
	});

	// sessione utente autenticato google
	const session = await auth();

	// Se l'evento non esiste, mostra la pagina 404
	if (!evento) {
		notFound();
	}

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12 max-md:p-6 max-sm:text-center ">
			<div className="flex max-lg:gap-10 max-lg:flex-col-reverse gap-2 bg-ivory rounded-2xl p-5 text-chocolate min-h-80">
				<div className="flex flex-col w-full max-lg:text-justify">
					{/* Titolo evento */}
					<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 mb-5  max-lg:text-center text-red-600">
						{evento?.eventName}
					</h1>
					{/* descrizione evento */}
					{evento?.eventDescription ? (
						<div className="prose mt-2   ">
							<div className="flex flex-col  gap-1.5">
								<span className="font-bold">Data evento:</span>{" "}
								{evento.eventName ===
								"Corso di Alimurgia - Piante spontanee alimentari in Sicilia" ? (
									evento?.dateEvento
										?.map((data) => dataFormattata(data))
										.join(" ")
								) : (
									<>
										{evento?.dateEvento?.map((data, index) => {
											const dataFine = evento?.dataFine?.[index];
											return (
												<Fragment key={index}>
													{dataSoloData(data)}{" "}
													{evento.eventName ===
													"Mostra fotografia naturalistica siciliana"
														? "dalle ore"
														: "raduno dalle ore"}{" "}
													{dataFineEvento(data)}
													{dataFine
														? ` alle ore ${dataFineEvento(dataFine)}`
														: ""}
													{index < (evento?.dateEvento?.length ?? 0) - 1 && (
														<>
															{""}
															<br />
														</>
													)}
												</Fragment>
											);
										})}
									</>
								)}
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
					<div className="flex flex-col gap-2 ">
						{evento.raduno && (
							<p className="flex items-center gap-1.5 prose  mt-2">
								<MapPin className="fill-red-500 stroke-white" size={64} />{" "}
								<span className="font-bold">Punto Raduno:</span>
								{evento?.raduno}
							</p>
						)}
						{evento.equipaggiamento && (
							<p className="prose">
								<span className="font-bold">Equipaggiamento:</span>{" "}
								{evento?.equipaggiamento}
							</p>
						)}{" "}
						{/* Bottone di acquisto  funzionante solo se loggati*/}
						<div className="mt-4 w-full flex justify-center min-h-10">
							<EventTicketPurchase
								ticketId={eventTickets?._id || ""}
								eventName={evento.eventName}
								sessioni={
									eventTickets?.sessioni?.filter(
										(s) =>
											s?.dataSelezionata &&
											s?.quantita !== null &&
											s?.quantita !== undefined,
									) as Parameters<typeof EventTicketPurchase>[0]["sessioni"]
								}
								prezzoTicket={
									eventTickets?.prezzo ||
									eventTickets?.biglietto?.biglietto ||
									evento.biglietto ||
									0
								}
								prezzoEvento={evento?.biglietto}
								// Passa lo stato di autenticazione dell'utente al componente di acquisto , se loggati quindi possiamo acquistare altrimenti no
								loggedIn={false}
							/>
						</div>
					</div>
				</div>
				{/* immagine evento */}
				<div className="w-full self-center flex justify-center max-lg:self-start">
					{evento?.immagineEvento ? (
						<Image
							className="rounded-2xl w-auto"
							src={urlFor(evento?.immagineEvento)
								.format("webp")
								.quality(70)
								.url()}
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
