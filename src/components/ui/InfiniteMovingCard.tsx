"use client";

import { cn } from "@/lib/utils";
import { urlFor } from "../../sanity/lib/image";
import { PARTNER_QUERY_RESULT } from "../../sanity/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
	image,
	direction = "left",
	speed,
	pauseOnHover = true,
	className,
}: {
	image: PARTNER_QUERY_RESULT;

	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);

	const [start, setStart] = useState(false);
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards",
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse",
				);
			}
		}
	};

	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "80s");
			}
		}
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
				className,
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex w-max min-w-full shrink-0 h-full flex-nowrap gap-4 py-4",
					start && "animate-scroll",
					pauseOnHover && "hover:paused",
				)}
			>
				{image.map((item) => (
					<li key={item.link} className="min-h-44">
						{item.immagine ? (
							<Link
								href={item.link as string}
								target="_blank"
								className="flex items-center bg-ivory h-full rounded-2xl"
								key={item._id}
							>
								<Image
									src={urlFor(item?.immagine)
										.maxWidth(280)
										.maxHeight(200)
										.quality(60)
										.format("webp")
										.url()}
									className="hover:scale-105 transition-transform px-2"
									width={200}
									height={160}
									alt={item?.nome || ""}
									loading="lazy"
								/>
							</Link>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
};
