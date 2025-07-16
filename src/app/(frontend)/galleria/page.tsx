import { sanityFetch } from "@/sanity/lib/live";
import { GALLERIES_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import React from "react";

export default async function Page() {
	const { data: galleria } = await sanityFetch({
		query: GALLERIES_QUERY,
	});

	return (
		<div className="container mx-auto h-[60rem] flex gap-10 mt-5 ">
			{galleria.map((el) => (
				<Link
					key={el._id}
					href={`/galleria/${el.slug?.current}`}
					className="text-mustard font-semibold"
				>
					<h1>{el.titolo}</h1>
				</Link>
			))}
		</div>
	);
}
