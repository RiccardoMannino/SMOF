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
			<article className="flex flex-col md:flex-row ">
				<div className="flex flex-col md:flex-row md:gap-4  ">
					<div className="overflow-hidden">
						{immagine ? (
							<Image
								src={urlFor(immagine).width(400).height(200).url()}
								className="rounded-lg mb-2"
								width={400}
								height={200}
								alt={immagine.alt || eventName || ""}
							/>
						) : null}
					</div>

					<div className="flex flex-col md:pt-1 py-2.5 gap-2">
						<h2 className="text-2xl w-fit  text-pretty font-semibold text-slate-800 group-hover:text-pink-600 transition-colors relative">
							<span className="relative z-[1]">{eventName}</span>
							<span className="bg-pink-50 z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75" />
						</h2>
						<div className="flex gap-2.5 items-center">
							<Speaker speakers={speakers} />
							<span>{dataFormattata(data)}</span>
						</div>
						<span className="bg-cyan-50 rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold text-cyan-700 w-fit">
							{eventType}
						</span>
					</div>
				</div>
				{/* <div className="flex flex-col items-center gap-5">
						{eventDescription ? (
							<div className=" text-center ">
								<PortableText
									value={eventDescription}
									components={components}
								/>
							</div>
						) : null}
					</div> */}
			</article>
		</Link>
	);
}
