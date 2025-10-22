import { GALLERIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import React from "react";

export default async function Page() {
	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	return (
		<div className="container mx-auto h-[60rem] flex flex-col gap-10 mt-5 ">
			<h1 className="text-2xl text-center md:text-3xl lg:text-5xl  text-mustard text-pretty mb-10">
				Gallerie
			</h1>
			<div className="flex gap-4">
				{galleria.map((el) => (
					<Link
						key={el._id}
						href={`/galleria/${el.slug?.current}`}
						className="text-mustard font-semibold max-sm:first-of-type:ml-2"
					>
						<h1>{el.titolo}</h1>
					</Link>
				))}
			</div>
		</div>
	);
}
