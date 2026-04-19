// import { Speaker } from "@/components/Speaker";
import { EVENTS_QUERY_RESULT } from "../sanity/sanity.types";
import { urlFor } from "../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/Card";

export function EventCard(props: EVENTS_QUERY_RESULT[0]) {
	const { speakers, immagine, dateEvento, eventType, eventName } = props;

	return (
		<Link
			className="group rounded-lg  max-lg:w-full max-lg:self-center "
			href={`/eventi/${props.slug?.current}`}
		>
			<Card className="border-0 bg-ivory shadow-md transition-colors">
				<CardHeader>
					<CardTitle className="flex justify-center">
						<h2 className="text-2xl font-semibold p-2 text-center w-fit text-pretty  text-olive group-hover:text-chocolate transition-colors relative">
							<span className="relative z-1">{eventName}</span>
							<span className="bg-mustard z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75" />
						</h2>
					</CardTitle>
				</CardHeader>
				<CardContent className="self-center max-lg:w-full">
					{immagine ? (
						<Image
							src={urlFor(immagine).format("webp").quality(70).url()}
							className="rounded-lg object-cover w-full self-center h-auto"
							width={200}
							height={400}
							alt={immagine.alt || eventName || ""}
						/>
					) : null}
				</CardContent>
				<CardFooter className="flex-col gap-3 items-start ">
					{/* <Speaker speaker={speakers} /> */}
					<button className="text-sm sm:text-base hover:cursor-pointer text-olive transition-all hover:bg-mustard p-2 rounded-2xl font-semibold">
						Dettagli evento
					</button>
				</CardFooter>
			</Card>
		</Link>
	);
}
