import { TextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
	name: "hero",
	icon: TextIcon,
	preview: {
		select: {
			title: "title",
			media: "image",
		},
		prepare({ title, media }) {
			return {
				title,
				subtitle: "Hero",
				media: media ?? TextIcon,
			};
		},
	},
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "text",
			type: "blockContent", // text editor
		}),
		defineField({
			name: "images", // nome usato nella query
			title: "Immagini", // titolo nell'editor
			type: "array", // tipo del field
			of: [{ type: "image", options: { hotspot: true } }],
			validation: (Rule) => Rule.required().min(1).max(6),
			description: "Inserisci fino a 6 immagini per il carosello.",
		}),
	],
});
