"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERYResult } from "@/sanity/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@sanity/icons";

type HeroProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "hero" }
>;

export function Hero({ images }: HeroProps) {
	const [index, setIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const totalSlides = images?.length ?? 0;

	const scrollToSlide = (i: number) => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				left: containerRef.current.clientWidth * i,
				behavior: "smooth",
			});
		}
	};

	const next = useCallback(() => {
		const nextIndex = (index + 1) % totalSlides;
		setIndex(nextIndex);
		scrollToSlide(nextIndex);
	}, [index, totalSlides]);

	const prev = () => {
		const prevIndex = (index - 1 + totalSlides) % totalSlides;
		setIndex(prevIndex);
		scrollToSlide(prevIndex);
	};

	useEffect(() => {
		if (totalSlides <= 1) return;

		intervalRef.current = setInterval(() => {
			next();
		}, 3000);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [index, totalSlides, next]);

	if (!images || images.length === 0) return null;

	return (
		<div className="relative w-full overflow-hidden ">
			<button
				onClick={prev}
				className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 hover:cursor-pointer transition color"
			>
				<ChevronLeftIcon className="h-4 w-4 md:h-8 md:w-8" />
			</button>
			<button
				onClick={next}
				className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 text-white p-2 rounded-full hover:bg-black/40 transition-colors hover:cursor-pointer"
			>
				<ChevronRightIcon className="h-4 w-4 md:h-8 md:w-8 " />
			</button>

			<div
				ref={containerRef}
				className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-2xl"
			>
				{images.map((image) => (
					<div
						key={image._key}
						className="min-w-full max-h-max snap-center relative "
					>
						<Image
							src={urlFor(image).width(1600).height(1200).url()}
							alt="carosello"
							quality={90}
							width={800}
							height={600}
							className="object-cover w-full"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
