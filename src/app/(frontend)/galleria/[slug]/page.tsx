import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_GALLERY_QUERY } from "@/sanity/lib/queries";
import React from "react";

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
