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
					className="fixed top-0 left-0 w-full h-full z-70 bg-[#000]/70 flex items-center justify-center "
				>
					<div
						onClick={(e) => e.stopPropagation()}
						className=" p-5 bg-ivory overflow-y-auto scrollbar-hide rounded max-w-[75%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[45%] flex flex-col max-sm:max-h-[35rem] sm:max-h-[40rem] gap-2 z-71"
					>
						<p className="text-center font-bold">{nome}</p>
						<Image
							src={urlFor(active).url()}
							alt={`${nome}`}
							width={1200}
							height={800}
							className="w-full  object-contain sm:h-1/2 self-center cursor-pointer rounded-2xl"
						/>
						<p className="text-center whitespace-pre-line font-semibold w-fit">
							{descrizione}
						</p>
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
