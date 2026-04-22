import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { sanityFetch } from "../../../../sanity/lib/live";
import { SINGLE_GALLERY_QUERY } from "../../../../sanity/lib/queries";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = (await props.params).slug;
	const { data: page } = await sanityFetch({
		query: SINGLE_GALLERY_QUERY,
		params: { slug: params },
		// Metadata non deve mai contenere stega
		stega: false,
	});

	return {
		title: `SMOF - Galleria (${page?.titolo})`,
		keywords: [
			"San Martino Outdoor Fest",
			"SMOF",
			"Eventi Oudoor San Martino delle scale",
			"Festival San Martino",
		],
		openGraph: {
			title: `SMOF - Galleria (${page?.titolo})`,
			description: `Esplora la galleria fotografica ${page?.titolo} del San Martino Outdoor Fest`,
			locale: "it_IT",
			siteName: "SMOF - San Martino Outdoor Fest",
			type: "website",
			url: `https://www.smofest.it/gallerie/${params}`,
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
			title: `SMOF - Galleria (${page?.titolo})`,
			description: `Esplora la galleria fotografica ${page?.titolo}`,
			images: ["/logo_smof.png"],
		},
	} satisfies Metadata;
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: galleria } = await sanityFetch({
		query: SINGLE_GALLERY_QUERY,
		params: await params,
	});

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<h3 className="text-2xl max-sm:text-center  md:text-3xl lg:text-5xl font-semibold text-mustard text-pretty mt-20 mb-10">
				{galleria?.titolo}
			</h3>
			<ParallaxScroll className="mb-20" immagini={galleria} />
		</div>
	);
}
