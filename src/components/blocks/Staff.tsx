"use client";

import { useState } from "react";
import { PAGE_QUERY_RESULT } from "../../sanity/sanity.types";
import { urlFor } from "../../sanity/lib/image";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

export type StaffProps = Extract<
	NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
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
			{
				createPortal(
					open && (
						// modale
						<AnimatePresence>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								onClick={handleClose}
								className="fixed top-0 left-0 w-full h-full z-70 bg-black/75 flex items-center justify-center "
							>
								<div
									onClick={(e) => e.stopPropagation()}
									className=" p-5 bg-ivory overflow-y-auto rounded-2xl max-sm:max-w-[75%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[45%] flex flex-col max-sm:h-[75%] sm:max-h-160 gap-2 z-71 min-[500px]:h-[80%] scrollbar-hide"
								>
									<p className="text-center font-bold">{nome}</p>
									<Image
										src={urlFor(active).url()}
										alt={`${nome}`}
										width={1200}
										height={800}
										className="w-full min-h-96 max-sm:min-h-64 object-contain  self-center cursor-pointer rounded-2xl"
									/>
									<p className="text-center whitespace-pre-line font-semibold w-fit">
										{descrizione}
									</p>
								</div>
							</motion.div>
						</AnimatePresence>
					),
					document.body,
				)
				//fine modale
			}

			{/* card che al click triggerano la funzione che fa aprire la modale */}
			<div className="relative flex-col flex gap-4 bg-ivory text-chocolate p-5 rounded-2xl hover:bg-ivory/90 transition-colors text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-tight max-sm:w-80 max-sm:self-center">
				{immagini
					? immagini.map((image: ImageType) => (
							<div
								key={image._key}
								className="relative flex flex-col items-center gap-3"
							>
								<Image
									src={urlFor(image).width(400).height(400).url()}
									alt={`${nome}`}
									width={400}
									height={400}
									className="rounded-2xl object-cover max-sm:w-80 self-center max-sm:h-80 h-52 w-fit  "
								/>
								<p className="text-center font-medium">{nome}</p>
								<button
									className={
										"bg-mustard rounded-2xl w-fit p-2 self-center cursor-pointer text-xl"
									}
									onClick={() => handleImage(image)}
								>
									Biografia
								</button>
							</div>
						))
					: null}
			</div>
		</section>
	);
}
