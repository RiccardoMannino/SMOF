import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: DocumentIcon,
	fields: [
		defineField({
			name: "title", //nome usato nella query
			type: "string",
		}),
		defineField({
			name: "intestazione", //nome usato nella query
			type: "text",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		}),
		defineField({
			name: "content",
			type: "pageBuilder",
		}),
		defineField({
			name: "mainImage",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "slug.current",
		},
	},
});
