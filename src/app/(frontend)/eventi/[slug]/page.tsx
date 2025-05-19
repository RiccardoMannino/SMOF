import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dataFormattata } from "@/sanity/lib/date";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponent";
import Image from "next/image";

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
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			{evento?.immagine ? (
				<Image
					className="w-full aspect-[800/300]"
					src={urlFor(evento?.immagine)
						.width(800)
						.height(300)
						.quality(80)
						.auto("format")
						.url()}
					alt={evento?.immagine?.alt || ""}
					width="800"
					height="300"
				/>
			) : null}
			<h1 className="text-4xl font-bold text-balance">{evento?.eventName}</h1>
			{evento?.eventDescription ? (
				<div className="prose">
					<PortableText
						value={evento?.eventDescription}
						components={components}
					/>
				</div>
			) : null}

			<p>{dataFormattata(evento?.data)}</p>
			<hr />
			<Link href="/eventi">&larr; Torna agli eventi</Link>
		</main>
	);
}
