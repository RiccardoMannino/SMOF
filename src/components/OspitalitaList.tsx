import { OSPITALITA_QUERY } from "@/sanity/lib/queries";

import { Card, CardContent, CardTitle } from "./ui/Card";

import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export async function OspitalitaList() {
	const { data: ospitalita } = await sanityFetch({
		query: OSPITALITA_QUERY,
	});

	return (
		<div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 justify-items-center ">
			{ospitalita?.map((osp) => (
				<Card
					key={osp._id}
					className="bg-ivory text-chocolate text-center text-2xl 
							"
				>
					<Link
						href={`ospitalita/${osp.slug?.current}`}
						className="flex flex-col gap-3"
					>
						<CardTitle className="">{osp?.luogo}</CardTitle>
						<CardContent>
							{osp.immagine ? (
								<Image
									className="rounded-2xl h-72"
									src={urlFor(osp?.immagine).format("webp").quality(70).url()}
									alt={osp?.luogo || ""}
									width="1800"
									height="480"
								/>
							) : null}
						</CardContent>
					</Link>
				</Card>
			))}
		</div>
	);
}
