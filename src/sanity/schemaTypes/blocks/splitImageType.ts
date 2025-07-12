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
			type: "text",
		}),
		defineField({
			name: "image",
			type: "image",
		}),
	],
});
