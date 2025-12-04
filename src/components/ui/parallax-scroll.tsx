"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SINGLE_GALLERY_QUERYResult } from "../../sanity/sanity.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

export const ParallaxScroll = ({
	immagini,
	className,
}: {
	immagini: SINGLE_GALLERY_QUERYResult;
	className?: string;
}) => {
	const gridRef = useRef<HTMLDivElement>(null);
	// const { scrollYProgress } = useScroll({
	// 	container: gridRef,
	// 	offset: ["start start", "end start"],
	// });

	return (
		<div
			className={cn("h-160 items-start overflow-y-auto w-full", className)}
			ref={gridRef}
		>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 pt-10 px-10"
				ref={gridRef}
			>
				{immagini?.images?.map((im, index) => (
					<motion.div key={"grid-1" + index}>
						<Image
							src={urlFor(im)
								.width(400)
								.height(400)
								.quality(80)
								.auto("format")
								.url()}
							className="h-auto w-full object-cover object-top-left rounded-lg gap-10"
							height="400"
							width="400"
							alt="thumbnail"
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
};
