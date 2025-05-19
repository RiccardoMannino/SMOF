import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTS_QUERY } from "@/sanity/lib/queries";
import { dataFormattata } from "@/sanity/lib/date";

export default async function Page() {
	const { data: eventi } = await sanityFetch({ query: EVENTS_QUERY });

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<h1 className="text-4xl font-bold">Eventi</h1>
			<ul className="grid grid-cols-1 divide-y divide-blue-100">
				{eventi?.map((event) => (
					<div key={event._id}>
						<li className="flex items-center">
							<Link
								className="block p-4 hover:text-blue-500"
								href={`/eventi/${event?.slug?.current}`}
							>
								{event?.eventName}
							</Link>
							<span>{dataFormattata(event?.data)}</span>
						</li>
					</div>
				))}
			</ul>
			<hr />
			<Link href="/">&larr; Torna alla home</Link>
		</main>
	);
}
