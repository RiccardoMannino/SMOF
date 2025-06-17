"use client";

import { PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState } from "react";

export type StaffProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "staff" }
>;

export function Staff({ ...props }: StaffProps) {
	const { nome, descrizione, immagini } = props;

	// Stato per l'immagine attiva (può essere di tipo `any` o `typeof immagini[0]`)
	type ImageType = StaffProps["immagini"] extends (infer U)[] ? U : null;

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
		<div>
			{open && (
				<div
					onClick={handleClose}
					className="fixed top-0 left-0 w-full h-full z-50 bg-zinc-500/70 flex items-center justify-center"
				>
					<div className="relative p-5 bg-ivory  rounded shadow max-w-[90%] max-h-[90%] flex flex-col gap-5">
						<p className="text-center">{nome}</p>
						<Image
							src={urlFor(active).width(1200).height(800).url()}
							alt={`${nome}`}
							width={1200}
							height={800}
							className="w-full sm:w-1/2 self-center rounded-xl"
						/>

						<div className="flex h-fit  flex-col  ">
							<p className="text-center whitespace-pre-line">{descrizione}</p>
						</div>
					</div>
				</div>
			)}
			<div className="relative ">
				{immagini
					? immagini?.map((image) => (
							<Image
								key={image._key}
								src={urlFor(image).width(400).height(400).url()}
								alt={`${nome}`}
								width={400}
								height={400}
								className="rounded-2xl object-contain cursor-pointer w-full"
								onClick={() => handleImage(image)}
							/>
						))
					: null}
				<p>{nome}</p>
			</div>
		</div>
	);
}
