import { BlockContentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const splitImageType = defineType({
	name: "splitImage",
	type: "object",
	icon: BlockContentIcon,
	preview: {
		select: {
			title: "title",
			media: "image",
		},
		prepare({ title, media }) {
			return {
				title: title,
				subtitle: "Split Image",
				media: media ?? BlockContentIcon,
			};
		},
	},
	fields: [
		defineField({
			name: "orientation",
			type: "string",
			options: {
				list: [
					{ value: "imageLeft", title: "Image Left" },
					{ value: "imageRight", title: "Image Right" },
				],
			},
		}),
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "testo",
			type: "blockContent",
		}),
		defineField({
			name: "images", // nome usato nella query
			title: "Immagini", // titolo nell'editor
			type: "array", // tipo del field
			of: [{ type: "image", options: { hotspot: true } }],
			validation: (Rule) => Rule.required().min(1),
			description: "Inserisci le immagini per il carosello.",
		}),
		// defineField({
		// 	name: "image",
		// 	type: "image",
		// }),
	],
});
