import React from "react";
import { urlFor } from "../sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import { PARTNER_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Partners() {
	const { data: partner } = await sanityFetch({
		query: PARTNER_QUERY,
	});

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
													.quality(70)
													.format("webp")
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
