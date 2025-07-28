import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
	EVENTS_QUERY,
	HOME_PAGE_QUERY,
	PARTNER_QUERY,
} from "@/sanity/lib/queries";
import { EventCard } from "@/components/EventCard";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCard";

export default async function Page() {
	const { data: page } = await sanityFetch({
		query: HOME_PAGE_QUERY,
	});

	const { data: eventi } = await sanityFetch({
		query: EVENTS_QUERY,
	});

	const { data: partner } = await sanityFetch({
		query: PARTNER_QUERY,
	});

	return page?.homePage?.content ? (
		<>
			<main className="grid grid-cols-1 pt-4 px-4">
				{/* hero section */}
				<PageBuilder
					documentId={page?.homePage._id}
					documentType={page?.homePage._type}
					content={page?.homePage.content}
					className="flex flex-col gap-5"
				/>
				<section className="my-20">
					<h1 className="text-2xl sm:text-3xl md:text-4xl mt-20 font-bold text-mustard ">
						Ultimi Eventi
					</h1>
					{/*Tutti gli eventi */}
					<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-24 py-12 items-center">
						{eventi
							.filter((el) => el.data?.includes("2025"))
							.map((event) => (
								<EventCard key={event._id} {...event} />
							))}
					</div>
				</section>
				<div className="flex justify-center mb-20">
					<InfiniteMovingCards image={partner} />
				</div>
			</main>
		</>
	) : null;
}
