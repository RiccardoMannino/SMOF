import { Speaker } from "@/components/Speaker";
import { EVENTS_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { dataFormattata } from "@/sanity/lib/date";

export function EventCard(props: EVENTS_QUERYResult[0]) {
	const { speakers, immagine, data, eventType, eventName } = props;

	return (
		<Link className="group" href={`/eventi/${props.slug!.current}`}>
			<article className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-0">
				<div className="md:col-span-5 md:w-full">
					<div className="md:col-start-9 md:col-span-4 rounded-lg overflow-hidden flex">
						{immagine ? (
							<Image
								src={urlFor(immagine).width(400).height(200).url()}
								width={400}
								height={200}
								alt={immagine.alt || eventName || ""}
							/>
						) : null}
					</div>
				</div>
				<h2 className="text-2xl text-pretty font-semibold text-slate-800 group-hover:text-pink-600 transition-colors relative ">
					<span className="relative z-[1]">{eventName}</span>
					<span className="bg-pink-50 z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75" />
				</h2>

				<div className="flex items-center mt-2 md:mt-6 gap-x-6">
					<Speaker speakers={speakers} />
					<span>{dataFormattata(data)}</span>
				</div>
				<div className="md:col-span-2 md:pt-1 py-2.5">
					<span className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700">
						{eventType}
					</span>
				</div>
			</article>
		</Link>
	);
}
