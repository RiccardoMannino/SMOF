import { sanityFetch } from "@/sanity/lib/live";
import { OSPITALITA_QUERY } from "@/sanity/lib/queries";
import React from "react";
import { Card, CardContent, CardTitle } from "./ui/Card";
import { Link } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity/sanity.types";

export default async function Ospitalita({
	page,
}: {
	page: PAGE_QUERY_RESULT;
}) {
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
										className="rounded-2xl h-72"
										src={urlFor(osp.immagine).format("webp").quality(70).url()}
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
