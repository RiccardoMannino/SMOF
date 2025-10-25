import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dataFormattata } from "@/lib/date";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponent";
import { RelatedEvents } from "@/components/RelatedEvents";
import Image from "next/image";
import { ArrowBigLeft, MapPin } from "lucide-react";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: evento } = await sanityFetch({
		query: EVENT_QUERY,
		params: await params,
	});

	if (!evento) {
		notFound();
	}

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12 ">
			<div className="flex max-lg:gap-10 max-sm:flex-col gap-2 bg-ivory rounded-2xl p-5 text-chocolate min-h-80">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold  text-red-600">
						{evento?.eventName}
					</h1>
					{evento?.eventDescription ? (
						<div className="prose mt-2">
							<span>Data evento: {dataFormattata(evento?.data)}</span>
							<PortableText
								value={evento?.eventDescription}
								components={components}
							/>
						</div>
					) : null}
					<div className="flex flex-col gap-2">
						<p className="flex gap-1.5 prose">
							<MapPin className="fill-red-500 stroke-white w-6 h-6" /> Punto
							Raduno: {evento?.raduno}
						</p>
						<p className="prose">Equipaggiamento: {evento?.equipaggiamento}</p>
						<p className="prose">Costo: {evento.biglietto}€</p>
					</div>
				</div>
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
