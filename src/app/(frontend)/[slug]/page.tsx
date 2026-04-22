import Image from "next/image";
import { notFound } from "next/navigation";
import { PAGE_QUERY } from "../../../sanity/lib/queries";
import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import { PageBuilder } from "@/components/PageBuilder";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponent";

import Eventi from "@/components/Eventi";
import Partners from "@/components/Partners";
import Ospitalita from "@/components/Ospitalita";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = (await props.params).slug;
	const { data: page } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug: params },
		// Metadata non deve mai contenere stega
		stega: false,
	});

	return {
		title:
			page?.title === "Home"
				? "SMOF - San Martino outdoor Fest"
				: `SMOF - ${page?.title}`,
		keywords: [
			"San Martino outdoor Fest",
			"SMOF",
			"Eventi Oudoor San Martino delle scale",
			"Festival San Martino",
		],
		openGraph: {
			title: page?.title,
			locale: "it_IT",
			siteName: "SMOF - San Martino outdoor Fest",
			type: "website",
			url: `https://www.smofest.it/`,
			images: [
				{
					url: "/logo_smof.png",
					width: 1200,
					height: 630,
					alt: "SMOF - San Martino Outdoor Fest",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: page?.title,
			description: `${page?.descrizione}` || "San Martino Outdoor Fest",
			images: ["/logo_smof.png"],
		},
	} satisfies Metadata;
}

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

	// console.log("pagina attuale:", (await params).slug);

	// Pagina Eventi
	if ((await params).slug === `eventi`) {
		return <Eventi />;
	}

	// Pagina Partner
	if ((await params).slug === `partners`) {
		return <Partners />;
	}

	// Pagina Ospitalità
	if ((await params).slug === `ospitalita`) {
		return <Ospitalita />;
	}

	return page ? (
		<>
			<section className="grid grid-cols-1 gap-6 p-12 max-sm:p-6 place-items-center">
				{page.mainImage ? (
					<Image
						className="rounded-2xl"
						src={urlFor(page?.mainImage).format("webp").quality(70).url()}
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
												src={urlFor(value).format("webp").quality(70).url()}
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
