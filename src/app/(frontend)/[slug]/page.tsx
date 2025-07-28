import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, EVENTS_QUERY, PARTNER_QUERY } from "@/sanity/lib/queries";
import { ChevronLeftIcon } from "@sanity/icons";

import { dataProva } from "@/sanity/lib/date";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// query pagina attuale, carica la pagina attuale grazie alla configurazione impostata, ricavando lo slug
	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: await params,
	});

	console.log(page);

	// query degli eventi
	const { data: eventi } = await sanityFetch({
		query: EVENTS_QUERY,
	});

	// query dei partner
	const { data: partner } = await sanityFetch({
		query: PARTNER_QUERY,
	});

	console.log("pagina attuale:", (await params).slug);

	// Pagina Eventi
	if ((await params).slug === `eventi`) {
		return (
			<main className="container mx-auto bg-forest grid grid-cols-1 gap-6 p-12">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard transition-colors">
					Eventi
				</h1>
				<span>Edizione</span>

				<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-24 py-12">
					{eventi
						.filter((ev) => dataProva(ev.data)?.includes("2025"))
						.map((event) => (
							<EventCard key={event._id} {...event} />
						))}
				</div>
				<Link
					href="/"
					className="flex gap-2 items-center text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard"
				>
					<ChevronLeftIcon className="hover:-translate-x-1.5 transition-all  rounded-full" />
					Torna alla home
				</Link>
			</main>
		);
	}

	//Pagina Partner
	if ((await params).slug === `partner`) {
		const partnerRaggruppati = Object.groupBy(
			partner,
			(pa) => pa?.tipo as string
		);
		return (
			<main className="container mx-auto bg-forest grid grid-cols-1 gap-6 p-12 ">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard max-sm:text-center">
					I nostri Partners
				</h1>
				<h2 className="max-sm:text-center text-xl sm:text-2xl md:text-3xl  font-bold text-mustard">
					Un ringraziamento speciale ai collaboratori e sostenitori dell&apos;
					San Martino Outdoor Fest
				</h2>

				<div className="grid grid-col-1 grid-flow-row gap-5  ">
					{Object.entries(partnerRaggruppati).map(
						([tipoGruppo, partnersDiQuelGruppo]) => (
							<div
								key={tipoGruppo}
								className="flex flex-col text-center items-center justify-center gap-5 "
							>
								<h3 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard text-center">
									{tipoGruppo}
								</h3>
								<div className="flex max-sm:flex-col gap-5 justify-center">
									{partnersDiQuelGruppo?.map((partnerSingolo) => (
										<Link
											href={partnerSingolo.link as string}
											target="_blank"
											className="flex bg-ivory justify-center  rounded-2xl"
											key={partnerSingolo._id}
										>
											{partnerSingolo.immagine ? (
												<Image
													className="   hover:scale-105 transition-transform  self-center p-2 h-[12rem] w-[14rem]"
													src={urlFor(partnerSingolo?.immagine)
														.maxWidth(200)
														.minHeight(299)
														.quality(80)
														.auto("format")
														.url()}
													alt={partnerSingolo?.nome || ""}
													width="200"
													height="170"
												/>
											) : null}
										</Link>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</main>
		);
	}

	return page ? (
		<>
			<section className="grid grid-cols-1 gap-6 p-12 w-full">
				{page.mainImage ? (
					<Image
						className="rounded-2xl relative w-full"
						src={urlFor(page?.mainImage)
							.width(800)
							.height(500)
							.quality(100)
							.auto("format")
							.url()}
						alt={page?.intestazione || ""}
						width="800"
						height="400"
					/>
				) : null}
				<h1 className="text-2xl mb-8 sm:mb-3 sm:text-3xl lg:text-5xl lg:mb-20 xl:text-6xl tracking-tight text-mustard font-bold whitespace-pre-line text-center mt-10">
					{page.intestazione}
				</h1>

				<p className="text-2xl mb-10 sm:mb-3 sm:text-3xl lg:text-5xl lg:mb-20 xl:text-6xl max-md:text-center tracking-tight text-mustard font-semibold whitespace-pre-line">
					{page.contenuto}
				</p>
			</section>
			{page.content ? (
				<PageBuilder
					documentId={page._id}
					documentType={page._type}
					content={page.content}
					className={
						`${(await params).slug}` === "chi-siamo"
							? "grid grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-5 max-sm:place-content-center"
							: ""
					}
				/>
			) : null}
		</>
	) : (
		notFound()
	);
}
