// import { Speaker } from "@/components/Speaker";
import { components } from "@/sanity/portableTextComponent";
import { PortableText } from "next-sanity";
import { EVENT_QUERYResult } from "@/sanity/types";

import { Title } from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { dataFormattata } from "@/lib/date";

export function Event(props: NonNullable<EVENT_QUERYResult>) {
	const { eventName, data, immagine, eventDescription, eventType } = props;
	//  speakers,

	return (
		<article className="grid lg:grid-cols-12 gap-y-12">
			<header className="lg:col-span-12 flex flex-col gap-4 items-start">
				<div className="flex gap-4 items-center">
					<span>{eventType}</span>
					<span>{dataFormattata(data)}</span>
				</div>
				<Title>{eventName}</Title>
				{/* <Speaker speaker={speakers} /> */}
			</header>
			{immagine ? (
				<figure className="lg:col-span-4 flex flex-col gap-2 items-start">
					<Image
						src={urlFor(immagine).width(400).height(400).url()}
						width={400}
						height={400}
						alt=""
					/>
				</figure>
			) : null}
			{eventDescription ? (
				<div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
					<PortableText value={eventDescription} components={components} />
				</div>
			) : null}
		</article>
	);
}
