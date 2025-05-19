import { sanityFetch } from "@/sanity/lib/live";
import { EVENT_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { dataFormattata } from "@/sanity/lib/date";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: evento } = await sanityFetch({
		query: EVENT_QUERY,
		params: await params,
	});

	if (!evento) {
		notFound();
	}

	return (
		<main className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<h1 className="text-4xl font-bold text-balance">{evento?.eventName}</h1>
			<h2 className="text-3xl text-balance">{evento?.eventDescription}</h2>
			<p>{dataFormattata(evento?.data)}</p>
			<hr />
			<Link href="/eventi">&larr; Torna agli eventi</Link>
		</main>
	);
}
