import { MetadataRoute } from "next";
import { readClient } from "@/sanity/lib/client";

async function getSitemapData() {
	try {
		// Fetch pages
		const pages = await readClient.fetch(
			`*[_type == "page" && defined(slug)] | order(_updatedAt desc) {
        slug,
        _updatedAt
      }`,
		);

		// Fetch events
		const eventi = await readClient.fetch(
			`*[_type == "evento" && defined(slug)] | order(_updatedAt desc) {
        slug,
        _updatedAt
      }`,
		);

		// Fetch ospitalita
		const ospitalita = await readClient.fetch(
			`*[_type == "ospitalita" && defined(slug)] | order(_updatedAt desc) {
        slug,
        _updatedAt
      }`,
		);

		// Fetch galleries
		const gallerie = await readClient.fetch(
			`*[_type == "gallery" && defined(slug)] | order(_updatedAt desc) {
        slug,
        _updatedAt
      }`,
		);

		return { pages, eventi, ospitalita, gallerie };
	} catch (error) {
		console.error("Errore nel fetch del sitemap:", error);
		return { pages: [], eventi: [], ospitalita: [], gallerie: [] };
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://www.smofest.it";
	const { pages, eventi, ospitalita, gallerie } = await getSitemapData();

	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/tickets`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contatti`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/galleria`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];

	// Dynamic pages
	const pageRoutes: MetadataRoute.Sitemap = pages.map((page: any) => ({
		url: `${baseUrl}/${page.slug.current}`,
		lastModified: new Date(page._updatedAt),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	// Dynamic events
	const eventiRoutes: MetadataRoute.Sitemap = eventi.map((evento: any) => ({
		url: `${baseUrl}/eventi/${evento.slug.current}`,
		lastModified: new Date(evento._updatedAt),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	// Dynamic ospitalita
	const ospitalitaRoutes: MetadataRoute.Sitemap = ospitalita.map(
		(ospo: any) => ({
			url: `${baseUrl}/ospitalita/${ospo.slug.current}`,
			lastModified: new Date(ospo._updatedAt),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		}),
	);

	// Dynamic galleries
	const galerieRoutes: MetadataRoute.Sitemap = gallerie.map((gal: any) => ({
		url: `${baseUrl}/galleria/${gal.slug.current}`,
		lastModified: new Date(gal._updatedAt),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	return [
		...staticRoutes,
		...pageRoutes,
		...eventiRoutes,
		...ospitalitaRoutes,
		...galerieRoutes,
	];
}
