import { LucideGalleryThumbnails } from "lucide-react";
import { defineField, defineType } from "sanity";

export const galleryType = defineType({
	type: "document",
	icon: LucideGalleryThumbnails,
	name: "galleria",
	title: "Galleria",
	fields: [
		defineField({
			name: "titolo", // nome usato nella query
			title: "Titolo", // titolo nell'editor
			type: "string", // tipo del field
			description: "Anno galleria", // sottotitolo
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "titolo" },
		}),
		defineField({
			name: "images", // nome usato nella query
			title: "Immagini", // titolo nell'editor
			type: "array", // tipo del field
			of: [{ type: "image", options: { hotspot: true } }],
			validation: (Rule) => Rule.required().min(1),
			description: "Inserisci Immagini.",
		}),
	],
});
