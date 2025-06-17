import { Speaker } from "@/components/Speaker";
import { EVENTS_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { dataFormattata } from "@/sanity/lib/date";
import {
	Card,
	CardAction,
	CardContent,
	// CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./Card";

export function EventCard(props: EVENTS_QUERYResult[0]) {
	const { speakers, immagine, data, eventType, eventName } = props;

	return (
		<Link
			className="group rounded-lg w-fit"
			href={`/eventi/${props.slug!.current}`}
		>
			<Card className="border-0 bg-ivory shadow-md transition-colors">
				<CardHeader>
					<CardTitle className="flex justify-between">
						<h2 className="text-2xl sm:text-3xl  w-fit text-pretty font-semibold text-olive group-hover:text-chocolate transition-colors relative">
							<span className="relative z-[1]">{eventName}</span>
							<span className="bg-mustard z-0 absolute inset-0 rounded-lg opacity-0 transition-all group-hover:opacity-100 group-hover:scale-y-110 group-hover:scale-x-105 scale-75" />
						</h2>
						<span className=" flex bg-chocolate/10 text-chocolate rounded-full px-2 py-1 leading-none whitespace-nowrap text-sm font-semibold  items-center  w-fit">
							{eventType}
						</span>
					</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction></CardAction>
				</CardHeader>
				<CardContent>
					{immagine ? (
						<Image
							src={urlFor(immagine).width(400).height(200).url()}
							className="rounded-lg"
							width={400}
							height={200}
							alt={immagine.alt || eventName || ""}
						/>
					) : null}
				</CardContent>
				<CardFooter className="flex-col gap-3 items-start">
					<Speaker speakers={speakers} />
					<span className="text-sm sm:text-base text-chocolate font-semibold">
						{dataFormattata(data)}
					</span>
				</CardFooter>
			</Card>
		</Link>
	);
}
