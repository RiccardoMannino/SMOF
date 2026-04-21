import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: [
					"/",
					"/tickets",
					"/contatti",
					"/programma",
					"chi-siamo",
					"/festival",
					"/galleria",
					"/ospitalita",
					"/eventi",
					"/login",
					"/privacy",
					"/cookie",
					"/termini",
				],
				disallow: ["/api/", "/admin/", "/studio/"],
				crawlDelay: 1,
			},
		],
		sitemap: "https://www.smofest.it/sitemap.xml",
	};
}
