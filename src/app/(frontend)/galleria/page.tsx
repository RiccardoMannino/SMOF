import { GALLERIES_QUERY } from "../../../sanity/lib/queries";
import { sanityFetch } from "../../../sanity/lib/live";
import { urlFor } from "../../../sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: `SMOF - Gallerie`,
		description:
			"Esplora le gallerie fotografiche del San Martino Outdoor Fest",

		keywords: [
			"San Martino outdoor Fest",
			"SMOF",
			"Eventi Oudoor San Martino delle scale",
			"Festival San Martino",
		],
		openGraph: {
			title: `SMOF - Gallerie`,
			description:
				"Esplora le gallerie fotografiche del San Martino Outdoor Fest",
			locale: "it_IT",
			siteName: "SMOF - San Martino outdoor Fest",
			type: "website",
			url: `https://www.smofest.it/galleria`,
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
			title: "SMOF - Gallerie",
			description:
				"Esplora le gallerie fotografiche del San Martino Outdoor Fest",
			images: ["/logo_smof.png"],
		},
	} satisfies Metadata;
}

export default async function Page() {
	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	return (
		<div className="container mx-auto flex flex-col gap-10 my-10 max-sm:p-4">
			<h1 className="text-center text-[clamp(2rem,5vw+0.5rem,3rem)] font-semibold  text-mustard text-pretty mb-10">
				Gallerie
			</h1>
			<div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-6">
				{galleria.map((el) => (
					<div
						className="flex max-sm:flex-col w-full justify-center items-center bg-ivory rounded-2xl p-4"
						key={el._id}
					>
						<Link
							key={el._id}
							href={`/galleria/${el.slug?.current}`}
							className="text-mustard font-semibold max-sm:first-of-type:ml-2 flex gap-5 flex-col justify-center"
						>
							<h1 className="text-center text-xl sm:text-2xl">{el.titolo}</h1>
							{el.images ? (
								<Image
									src={urlFor(el?.images[0])
										.width(500)
										.height(350)
										.format("webp")
										.quality(70)
										.url()}
									alt=""
									width="500"
									height="350"
									className="self-center mb-4 rounded-2xl  "
								/>
							) : null}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
