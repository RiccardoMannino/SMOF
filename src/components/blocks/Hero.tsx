"use client";

import { motion } from "motion/react";
import { PAGE_QUERY_RESULT } from "../../sanity/sanity.types";

type HeroProps = Extract<
	NonNullable<NonNullable<PAGE_QUERY_RESULT>["content"]>[number],
	{ _type: "hero" }
>;

export function Hero({ text }: HeroProps) {
	return (
		<div className="relative w-full overflow-hidden ">
			{/* Video sulla destra e Testo di benvenuto a sinistra */}
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

				{/* container contenente il video */}
				<div
					className={`flex mb-5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide rounded-2xl max-md:row-start-2 max-md:row-end-2 max-md:mt-8`}
				>
					<motion.div
						initial={{ transform: "translateX(300px)" }}
						animate={{ transform: "translateX(0px)" }}
						transition={{ type: "spring" }}
						className="min-w-full max-h-max relative flex "
					>
						<video
							autoPlay
							controls
							muted
							src={"/Video.mov"}
							className="rounded-2xl"
						/>
					</motion.div>
				</div>
				{/* <div className="flex gap-5 max-sm:gap-2 max-md:col-start-1 col-start-2 place-self-center max-md:row-start-3 max-md:row-end-3">
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
				</div> */}
			</div>
		</div>
	);
}
