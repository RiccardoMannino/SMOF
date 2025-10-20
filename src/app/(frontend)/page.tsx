import { PageBuilder } from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
	EVENTS_QUERY,
	HOME_PAGE_QUERY,
	PARTNER_QUERY,
} from "@/sanity/lib/queries";
import { EventCard } from "@/components/EventCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCard";
import { getNewsletterStatus } from "@/lib/getNewsletterStatus";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

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

	const { session, isSubscribed } = await getNewsletterStatus();

	console.log("sottoscritto alla newsletter:", isSubscribed);

	// home page
	return page?.homePage?.content ? (
		<>
			<main className="grid grid-cols-1 pt-4 px-4">
				{/* top section */}
				<section className="mb-8 md:p-8 flex flex-col">
					{page.homePage?.mainImage ? (
						<Image
							className="rounded-2xl "
							src={urlFor(page?.homePage?.mainImage).auto("format").url()}
							alt={page?.homePage.intestazione || ""}
							width="1800"
							height="480"
						/>
					) : null}
				</section>
				{/* hero section */}
				<PageBuilder
					documentId={page?.homePage._id}
					documentType={page?.homePage._type}
					content={page?.homePage.content}
					className="flex flex-col gap-5"
				/>
				<h1 className="text-xl mb-8 sm:mb-3 sm:text-2xl lg:text-4xl lg:mb-20 xl:text-6xl tracking-tight font-bold text-center mt-10 text-mustard">
					{page.homePage.intestazione}
				</h1>
				{/* Newsletter Section */}
				<section className="my-20 flex justify-center">
					<div className="bg-ivory p-5 rounded-2xl flex flex-col w-fit justify-center">
						{session?.user?.email ? (
							<NewsletterForm
								context="home"
								subscribe={isSubscribed}
								key={String(isSubscribed)}
							/>
						) : (
							<h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-chocolate ">
								Accedi per poterti iscrivere alla Newsletter e <br /> rimanere
								aggiornato sui nostri eventi
							</h1>
						)}
					</div>
				</section>
				{/* Video Section */}
				{/* Event Section */}
				<section className="my-20">
					<h1 className="text-2xl sm:text-3xl md:text-4xl mt-20 font-bold text-mustard ">
						Eventi
					</h1>
					{/*Tutti gli eventi */}
					<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-24 py-12 items-center place-items-center">
						{eventi.map((event) => (
							<EventCard key={event._id} {...event} />
						))}
					</div>
				</section>
				<div className="flex justify-center mb-20">
					<InfiniteMovingCards image={partner} speed="slow" />
				</div>
			</main>
		</>
	) : null;
}
