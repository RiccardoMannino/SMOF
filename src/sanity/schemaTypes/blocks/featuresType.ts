import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const featuresType = defineType({
	name: "features",
	type: "object",
	icon: StarIcon,
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title,
				subtitle: "Features",
			};
		},
	},
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "features",
			type: "array",
			of: [
				defineField({
					name: "feature",
					type: "object",
					fields: [
						defineField({
							name: "title",
							type: "string",
						}),
						defineField({
							name: "text",
							type: "string",
						}),
					],
				}),
			],
		}),
	],
});
