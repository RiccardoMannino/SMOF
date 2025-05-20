import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { EventCard } from "@/components/EventCard";

export default async function Page() {
	const { data: eventi } = await sanityFetch({ query: EVENTS_QUERY });

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<h1 className="text-4xl font-bold">Pagina Eventi</h1>
			<div className="flex flex-col gap-24 py-12">
				{eventi.map((event) => (
					<EventCard key={event._id} {...event} />
				))}
			</div>
			<hr />
			<Link href="/">&larr; Torna alla home</Link>
		</main>
	);
}
