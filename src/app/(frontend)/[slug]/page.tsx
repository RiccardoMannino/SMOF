import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: page } = await sanityFetch({
		// query pagina attuale, carica la pagina attuale grazie alla configurazione impostata, ricavando lo slug
		query: PAGE_QUERY,
		params: await params,
	});

	const { data: eventi } = await sanityFetch({
		// query degli eventi
		query: EVENTS_QUERY,
	});

	console.log("pagina attuale:", (await params).slug);

	if ((await params).slug === `eventi`) {
		return (
			<main className="container mx-auto bg-forest grid grid-cols-1 gap-6 p-12">
				<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard  transition-colors">
					Eventi
				</h1>
				<div className="flex flex-col md:flex-row gap-24 py-12">
					{eventi.map((event) => (
						<EventCard key={event._id} {...event} />
					))}
				</div>
				<Link href="/">&larr; Torna alla home</Link>
			</main>
		);
	}

	return page?.content ? (
		<>
			<h1 className="text-3xl mb-10 sm:mb-0 sm:text-4xl lg:text-6xl lg:mb-20  xl:text-8xl tracking-tight text-mustard font-bold whitespace-pre-line text-center mt-10 ">
				{page.intestazione}
			</h1>

			<PageBuilder
				documentId={page._id}
				documentType={page._type}
				content={page.content}
				className={
					`${(await params).slug}` === "chi-siamo"
						? "grid grid-rows-2 sm:grid-cols-4 gap-10 p-5"
						: ""
				}
			/>
		</>
	) : null;
}
