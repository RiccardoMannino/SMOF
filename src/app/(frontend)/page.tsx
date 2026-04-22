import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "../../sanity/lib/live";
import { HOME_PAGE_QUERY, PARTNER_QUERY } from "../../sanity/lib/queries";

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCard";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import CookieBanner from "@/components/CookieBanner";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = (await props.params).slug;
	const { data: page } = await sanityFetch({
		query: HOME_PAGE_QUERY,
		params: { slug: params },
		// Metadata non deve mai contenere stega
		stega: false,
	});

	return {
		title: "SMOF - San Martino Outdoor Fest",
		description:
			"San Martino Outdoor Fest - Natura, territorio e comunità. Scopri gli eventi outdoor e l'ospitalità a San Martino delle Scale.",
		keywords: [
			"San Martino Outdoor Fest",
			"SMOF",
			"Eventi Oudoor San Martino delle scale",
			"Festival San Martino",
		],
		openGraph: {
			title: page?.homePage?.intestazione || "SMOF - San Martino Outdoor Fest",
			locale: "it_IT",
			siteName: "SMOF - San Martino Outdoor Fest",
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
			title: "SMOF - San Martino Outdoor Fest",
			description: "San Martino Outdoor Fest - Natura, territorio e comunità",
			images: ["/logo_smof.png"],
		},
	} satisfies Metadata;
}

export default async function Page() {
	const { data: page } = await sanityFetch({
		query: HOME_PAGE_QUERY,
	});

	const { data: partner } = await sanityFetch({
		query: PARTNER_QUERY,
	});

	// home page
	return page?.homePage?.content ? (
		<>
			<CookieBanner />
			<main className="grid grid-cols-1 pt-4 px-4">
				{/* top section */}
				<section className="mb-8 md:p-8 flex flex-col">
					{page.homePage?.mainImage ? (
						<Image
							className="rounded-2xl "
							src={urlFor(page?.homePage?.mainImage)
								.auto("format")
								.format("webp")
								.quality(70)
								.url()}
							alt={page?.homePage.intestazione || ""}
							width="1800"
							height="480"
						/>
					) : null}
				</section>
				{/* hero section */}
				<PageBuilder
					documentId={page?.homePage._id}
					documentType={page?.homePage._type}
					content={page?.homePage.content}
					className="flex flex-col gap-5"
				/>
				<h1 className="text-xl mb-8 sm:mb-3 sm:text-2xl lg:text-4xl lg:mb-20 xl:text-6xl tracking-tight font-bold text-center mt-10 text-mustard">
					{page.homePage.intestazione}
				</h1>

				{/* Carosello sponsor */}
				<div className="flex justify-center mb-20">
					<InfiniteMovingCards image={partner} speed="slow" />
				</div>
			</main>
		</>
	) : null;
}
