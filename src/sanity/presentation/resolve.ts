import {
	defineLocations,
	PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
	locations: {
		// Add more locations per altri tipi di eventi
		page: defineLocations({
			select: {
				title: "title",
				slug: "slug.current",
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || "Untitled",
						href: `/${doc?.slug}`,
					},
				],
			}),
		}),
		eventi: defineLocations({
			select: {
				title: "title",
				slug: "slug.current",
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || "Untitled",
						href: `/eventi/${doc?.slug}`,
					},
					{ title: "Indice eventi", href: `/eventi` },
				],
			}),
		}),
	},
};
