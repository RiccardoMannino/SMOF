"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@sanity/icons";

type HeroProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "hero" }
>;

export function Hero({ images, text }: HeroProps) {
	const [index, setIndex] = useState(0);
	const [hover, setHover] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	// ref che ci serve per l'intervallo di tempo da una slide all'altra
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// slide totali : se la lunghezza dello slider è null o undefined ritorna 0
	const totalSlides = images?.length ?? 0;

	//  funzione per lo scroll del container
	const scrollToSlide = (i: number) => {
		// containare che scorre in modo fluido grazie allo smooth
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
		<div className="relative w-full overflow-hidden ">
			<button
				onClick={prev}
				className={`absolute ${(!text && "left-[1%]") || "max-sm:left-3.5 sm:left-4"} lg:left-[51%] top-[60%] sm:top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 hover:cursor-pointer transition color`}
			>
				<ChevronLeftIcon className="h-4 w-4 md:h-8 md:w-8" />
			</button>
			<button
				onClick={next}
				className="absolute right-4 top-[60%] sm:top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors hover:cursor-pointer"
			>
				<ChevronRightIcon className="h-4 w-4 md:h-8 md:w-8 " />
			</button>
			{/* Carosello sulla destra e Testo di benvenuto a sinistra */}
			<div
				className={`${text ? "grid-cols-2" : ""} justify-center max-lg:grid-cols-1 grid max-h-max w-full `}
			>
				<div className={`w-full ${!text && "hidden"} `}>
					{text ? (
						<motion.h1
							initial={{ transform: "translateX(-300px)" }}
							animate={{ transform: "translateX(0px)" }}
							transition={{ type: "spring" }}
							className=" max-[360px]:text-[13px] min-[400px]:text-xl max-lg:text-center mb-7 sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl tracking-tight text-mustard font-bold lg:mr-2"
						>
							{text.toUpperCase()}
						</motion.h1>
					) : null}
				</div>
				<div
					ref={containerRef}
					onMouseEnter={() => {
						setHover(true);
					}}
					onMouseLeave={() => {
						setHover(false);
					}}
					className={`flex mb-10 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-2xl`}
				>
					{images.map((image) => (
						<motion.div
							initial={{ transform: "translateX(300px)" }}
							animate={{ transform: "translateX(0px)" }}
							transition={{ type: "spring" }}
							key={image._key}
							className="min-w-full max-h-max relative flex flex-row-reverse"
						>
							<Image
								src={urlFor(image).width(1600).height(1200).url()}
								alt="carosello"
								quality={90}
								width={800}
								height={600}
								className="object-cover w-full"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
