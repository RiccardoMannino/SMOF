"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { PAGE_QUERYResult } from "../../sanity/sanity.types";
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
		<div className="relative w-full overflow-hidden ">
			{/* Carosello sulla destra e Testo di benvenuto a sinistra */}
			<div
				className={`${text && "max-md:grid-cols-1 max-md:grid-rows-[120px_1fr_50px]"} grid-cols-2 justify-center grid max-h-max w-full`}
			>
				{/* testo hero section */}
				<div
					className={`w-full ${!text && "hidden"} max-md:row-start-1 max-md:row-end-1 `}
				>
					{text ? (
						<motion.h1
							initial={{ transform: "translateX(-300px)" }}
							animate={{ transform: "translateX(0px)" }}
							transition={{ type: "spring" }}
							className="max-[360px]:text-[13px] min-[400px]:text-xl max-lg:text-center mb-7 md:text-4xl lg:text-5xl xl:text-7xl whitespace-pre-line tracking-tight text-mustard font-bold lg:mr-2 max-md:mb-3.5 items-center"
						>
							{text.toUpperCase()}
						</motion.h1>
					) : null}
				</div>

				{/* container contenente il carosello */}
				<div
					ref={containerRef}
					onMouseEnter={() => {
						setHover(true);
					}}
					onMouseLeave={() => {
						setHover(false);
					}}
					className={`flex mb-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-2xl max-md:row-start-2 max-md:row-end-2 max-md:mt-8`}
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
								className="object-cover w-full "
							/>
						</motion.div>
					))}
				</div>
				<div className="flex gap-5 max-sm:gap-2 max-md:col-start-1 col-start-2 place-self-center max-md:row-start-3 max-md:row-end-3">
					<button
						onClick={prev}
						className={`w-fit bg-black/20 text-white p-2 rounded-full hover:bg-black/40 hover:cursor-pointer transition color`}
					>
						<ChevronLeftIcon className="h-4 w-4 md:h-8 md:w-8" />
					</button>
					<button
						onClick={next}
						className="w-fit bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors hover:cursor-pointer"
					>
						<ChevronRightIcon className="h-4 w-4 md:h-8 md:w-8 " />
					</button>
				</div>
			</div>
		</div>
	);
}
