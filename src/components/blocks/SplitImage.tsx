"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { urlFor } from "../../sanity/lib/image";
import { PAGE_QUERY_RESULT } from "../../sanity/sanity.types";
import { stegaClean } from "next-sanity";
import { components } from "../../sanity/portableTextComponent";
import { PortableText } from "next-sanity";

type SplitImageProps = Extract<
	NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
	{ _type: "splitImage" }
>;

export function SplitImage({
	title,
	testo,
	images,
	orientation,
}: SplitImageProps) {
	const [index, setIndex] = useState(0);
	const [hover, setHover] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	// ref che ci serve per l'intervallo di tempo da una slide all'altra
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// slide totali : se la lunghezza dello slider è null o undefined ritorna 0
	const totalSlides = images?.length ?? 0;

	//  funzione per lo scroll del container
	const scrollToSlide = (i: number) => {
		// containar che scorre in modo fluido grazie allo smooth
		containerRef.current?.scrollTo({
			left: containerRef.current.clientWidth * i,
			behavior: "smooth",
		});
	};

	// funzione per andare avanti di pagina
	const next = useCallback(() => {
		const nextIndex = (index + 1) % totalSlides;
		setIndex(nextIndex);
		scrollToSlide(nextIndex);
	}, [index, totalSlides]);

	// funzione che ci serve per stoppare lo slider all'hover vedi sotto
	const stop = useCallback(() => {
		const stoptIndex = index % totalSlides;
		setIndex(stoptIndex);
	}, [index, totalSlides]);

	// funzione per andare indietro di pagina
	const prev = () => {
		const prevIndex = (index - 1 + totalSlides) % totalSlides;
		setIndex(prevIndex);
		scrollToSlide(prevIndex);
	};

	// effetto utilizzato per fare andare in autoplay lo slider e stopparlo all'hover dell'immagine
	useEffect(() => {
		if (totalSlides <= 1) return;

		if (hover) {
			// al passaggio del mouse il carosello si stoppa
			stop();
		} else
			//quando usciamo dall'area dell'immagine riparte il carosello
			intervalRef.current = setInterval(() => {
				next();
			}, 3000);

		// funzione di cleanup che ci permette di far ripartire il carosello se hover è falso
		return () => {
			if (intervalRef.current && !hover) clearInterval(intervalRef?.current);
		};
	}, [index, totalSlides, next, hover, stop]);

	// se non ci sono immagini ritorna null
	if (!images || images.length === 0) return null;

	return (
		<section
			className="bg-ivory max-sm:p-5 p-10 mt-10 rounded-2xl flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse max-lg:flex-col"
			data-orientation={stegaClean(orientation) || "imageLeft"}
		>
			<div
				ref={containerRef}
				onMouseEnter={() => {
					setHover(true);
				}}
				onMouseLeave={() => {
					setHover(false);
				}}
				className="lg:w-1/2 sm:w-full flex mb-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-2xl max-md:row-start-2 max-md:row-end-2 max-md:mt-8 "
			>
				{images
					? images.map((image) => (
							<motion.div
								initial={{ transform: "translateX(300px)" }}
								animate={{ transform: "translateX(0px)" }}
								transition={{ type: "spring" }}
								key={image._key}
								className="min-w-full max-h-max relative flex flex-row-reverse"
							>
								<Image
									src={urlFor(image)
										.maxWidth(1200)
										.maxHeight(900)
										.quality(65)
										.format("webp")
										.url()}
									alt="carosello"
									width={800}
									height={600}
									className="object-cover w-full "
									loading="lazy"
								/>
							</motion.div>
						))
					: null}
			</div>
			<div className="w-1/2 max-lg:w-full flex flex-col gap-6">
				{title && testo ? (
					<>
						<h2 className="text-3xl max-sm:text-center mx-auto md:text-5xl lg:text-6xl font-light smof max-w-3xl tracking-tight">
							{title}
						</h2>
						<div className="text-justify">
							<PortableText value={testo} components={components} />
						</div>
					</>
				) : null}
			</div>
		</section>
	);
}
