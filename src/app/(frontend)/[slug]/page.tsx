import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
	PAGE_QUERY,
	EVENTS_QUERY,
	PARTNER_QUERY,
	OSPITALITA_QUERY,
} from "../../../sanity/lib/queries";
import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import { PageBuilder } from "@/components/PageBuilder";
import { CustomSelect } from "@/components/CustomSelect";
import { dataGiornaliera } from "@/lib/date";
import { ArrowBigLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponent";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

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

	// query degli eventi
	const { data: eventi } = await sanityFetch({
		query: EVENTS_QUERY,
	});

	// elimina i doppioni degli anni di tutti gli eventi, fattibile anche con la GROQ di sanity
	const dateEventi = Array.from(
		new Set(eventi.map((date) => dataGiornaliera(date.data))),
	);

	// Tipi eventi non duplicati , fattibile anche con la GROQ di sanity
	const tipiEventi = Array.from(new Set(eventi.map((tipo) => tipo.eventType)));

	// query dei partner
	const { data: partner } = await sanityFetch({
		query: PARTNER_QUERY,
	});

	console.log("pagina attuale:", (await params).slug);

	// Pagina Eventi
	if ((await params).slug === `eventi`) {
		return (
			<main className="container mx-auto bg-forest grid grid-cols-1  gap-6 p-12 max-sm:p-8">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard transition-colors">
					Eventi
				</h1>

				<div className="flex flex-col md:grid  md:grid-flow-row  gap-24 py-12 items-center max-sm:w-full">
					<CustomSelect
						data={dateEventi.sort().reverse()}
						eventi={eventi}
						tipo={tipiEventi}
					/>
				</div>
				<Link
					href="/"
					className="flex gap-2 items-center text-lg sm:text-xl md:text-2xl font-semibold text-mustard"
				>
					<ArrowBigLeft className="hover:-translate-x-1.5 transition-all" />
					Torna alla home
				</Link>
			</main>
		);
	}

	// Pagina Partner

	if ((await params).slug === `partners`) {
		// raggruppa i partner per tipo
		const partnerRaggruppati = Object.groupBy(
			partner,
			(pa) => pa?.tipo as string,
		);

		return (
			<main className="container mx-auto bg-forest grid grid-cols-1 gap-6 p-12 ">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard max-sm:text-center">
					I nostri Partners
				</h1>
				<h2 className="max-sm:text-center text-xl sm:text-2xl md:text-3xl  font-bold text-mustard">
					Un ringraziamento speciale ai collaboratori e sostenitori del San
					Martino Outdoor Fest
				</h2>
				{/* renderizza per ogni tipo di partner i partner appartenenti */}
				<div className="grid grid-col-1 grid-flow-row gap-5  ">
					{Object.entries(partnerRaggruppati)?.map(
						([tipoGruppo, partnersDiQuelGruppo]) => (
							<div
								key={tipoGruppo}
								className="flex flex-col text-center items-center justify-center gap-5 "
							>
								<h3 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard text-center">
									{tipoGruppo}
								</h3>
								<div
									className={`flex max-md:flex-col gap-5 justify-center ${partnersDiQuelGruppo && partnersDiQuelGruppo?.length >= 7 && "grid grid-cols-4 grid-flow-row max-md:grid-cols-1"}`}
								>
									{partnersDiQuelGruppo?.map((partnerSingolo) => (
										<Link
											href={partnerSingolo.link as string}
											target="_blank"
											className="flex bg-ivory items-center rounded-2xl h-full"
											key={partnerSingolo._id}
										>
											{partnerSingolo.immagine ? (
												<Image
													className=" hover:scale-105 transition-transform self-center p-2 max-sm:h-48 object-contain"
													src={urlFor(partnerSingolo?.immagine)
														.maxWidth(200)
														.minHeight(299)
														.quality(80)
														.auto("format")
														.url()}
													alt={partnerSingolo?.nome || ""}
													width="220"
													height="170"
												/>
											) : null}
										</Link>
									))}
								</div>
							</div>
						),
					)}
				</div>
			</main>
		);
	}

	if ((await params).slug === "ospitalita") {
		const { data: ospitalita } = await sanityFetch({
			query: OSPITALITA_QUERY,
		});

		return (
			<main className="container mx-auto p-12 flex flex-col gap-6 text-3xl">
				<h1 className="text-center text-mustard font-semibold mb-5 clamp">
					Ospitalità
				</h1>
				<div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 justify-items-center ">
					{ospitalita.map((osp) => (
						<Card
							key={osp._id}
							className="bg-ivory text-chocolate text-center text-2xl 
							"
						>
							<Link
								href={`ospitalita/${osp.slug?.current}`}
								className="flex flex-col gap-3"
							>
								<CardTitle className="">{osp.luogo}</CardTitle>
								<CardContent>
									{osp.immagine ? (
										<Image
											className="rounded-2xl"
											src={urlFor(osp.immagine).auto("format").url()}
											alt={page?.intestazione || ""}
											width="1800"
											height="480"
										/>
									) : null}
								</CardContent>
							</Link>
						</Card>
					))}
				</div>
			</main>
		);
	}

	return page ? (
		<>
			<section className="grid grid-cols-1 gap-6 p-12 max-sm:p-6 place-items-center">
				{page.mainImage ? (
					<Image
						className="rounded-2xl"
						src={urlFor(page?.mainImage).auto("format").url()}
						alt={page?.intestazione || ""}
						width="1800"
						height="480"
					/>
				) : null}
				<h1 className="text-3xl mb-8 sm:mb-3 lg:text-3xl lg:mb-20 xl:text-5xl tracking-tight text-mustard font-bold text-center mt-10">
					{page.intestazione}
				</h1>

				{page.contenuto && (
					<p className="text-xl mb-10 sm:mb-3  lg:mb-20 max-md:text-center tracking-tight text-chocolate bg-ivory rounded-2xl p-5  whitespace-pre-line">
						{page?.contenuto}
					</p>
				)}
				{page?.descrizione ? (
					<div className="bg-ivory p-4 rounded-2xl text-xl text-justify my-20  whitespace-pre-line">
						<PortableText
							value={page?.descrizione}
							components={{
								// tutto components
								...components,
								types: {
									//tutto components types
									...(components as any).types,
									// sostituisce il componente del tipo image con questo
									image: ({ value }: any) =>
										value ? (
											<Image
												src={urlFor(value).auto("format").url()}
												alt={value.alt || "immagine"}
												className="md:float-right ml-8 mb-4 mr-2 w-2/4 max-md:w-full max-md:ml-0 rounded-lg"
												width={1800}
												height={680}
											/>
										) : null,
								},
							}}
						/>
					</div>
				) : null}
			</section>
			{page.content ? (
				<PageBuilder
					documentId={page._id}
					documentType={page._type}
					content={page.content}
					className={
						`${(await params).slug}` === "chi-siamo"
							? "flex flex-wrap gap-10 p-5 justify-center max-w-8xl mb-10 mx-auto"
							: ""
					}
				/>
			) : null}
		</>
	) : (
		notFound()
	);
}
