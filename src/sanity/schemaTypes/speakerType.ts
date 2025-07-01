import { defineField, defineType } from "sanity";

export const speaker = defineType({
	type: "document",
	name: "speaker",
	title: "Speaker",
	fields: [
		defineField({
			type: "string",
			name: "speakerName",
			title: "Nome Speaker",
			validation: (e) => e.required(),
		}),
		defineField({
			type: "image",
			name: "speakerImage",
			title: "Immagine Speaker",
			validation: (e) => e.required(),
		}),
	],
});
