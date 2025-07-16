import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<section className="flex flex-col gap-8 min-h-96 container items-center justify-center">
			<div className="font-semibold text-mustard text-2xl sm:text-3xl md:text-4xl ">
				Pagina Non trovata
			</div>
			<Link
				className="flex items-center font-semibold text-mustard text-2xl sm:text-3xl md:text-4xl"
				href={"/"}
			>
				<ChevronLeft
					size={32}
					className="hover:-translate-x-2.5 duration-200 "
				/>
				<span className="">Torna alla Home</span>
			</Link>
		</section>
	);
}
