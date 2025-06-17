"use client";

import { useState } from "react";
import { PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "motion/react";

export type StaffProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "staff" }
>;

export function Staff({ ...props }: StaffProps) {
	const { nome, descrizione, immagini } = props;

	// type che non può essere null o undefined cioè non nullable
	type ImageType = NonNullable<StaffProps["immagini"]>[number];

	// Stato per aprire/chiudere
	const [active, setActive] = useState<ImageType | null>(null);

	const open = active !== null;

	// Apre la modale e imposta l'immagine attiva
	const handleImage = (image: ImageType) => {
		setActive(image);
	};

	// Chiude la modale
	const handleClose = () => {
		setActive(null);
	};

	return (
		<section className="overflow-hidden">
			{/* se open visualizza la modale */}
			{open && (
				// modale
				<motion.div
					initial={false}
					onClick={handleClose}
					className="fixed top-0 left-0 w-full h-full z-50 bg-zinc-500/70 flex items-center justify-center"
				>
					<div className="p-5 bg-ivory rounded shadow max-w-[90%] max-h-[90%] flex flex-col gap-5">
						<p className="text-center font-bold">{nome}</p>
						<Image
							src={urlFor(active).width(1200).height(800).url()}
							alt={`${nome}`}
							width={1200}
							height={800}
							className="w-full sm:w-1/2 self-center rounded-xl h-4/5"
						/>
						<div className="flex h-fit flex-col overflow-y-scroll scrollbar-hide ">
							<p className="text-center whitespace-pre-line font-semibold ">
								{descrizione}
							</p>
						</div>
					</div>
				</motion.div>
				//fine modale
			)}
			{/* card che al click triggerano la funzione che fa aprire la modale */}
			<div className="relative flex-col flex gap-4 bg-ivory text-chocolate p-5 rounded-2xl hover:bg-ivory/90 transition-colors text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
				{immagini
					? immagini.map((image) => (
							<Image
								key={image._key}
								src={urlFor(image).width(400).height(400).url()}
								alt={`${nome}`}
								width={400}
								height={400}
								className="rounded-2xl cursor-pointer w-full"
								onClick={() => handleImage(image)}
							/>
						))
					: null}
				<p className="font-semibold text-center">{nome}</p>
			</div>
		</section>
	);
}
