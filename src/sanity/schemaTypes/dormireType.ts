import { defineField, defineType } from "sanity";

export const dormireType = defineType({
	name: "dormire",
	title: "Dove dormire",
	type: "document",
	fields: [
		defineField({
			name: "denominazione",
			title: "Denominazione",
			type: "string",
		}),
		defineField({
			name: "indirizzo",
			title: "Indirizzo",
			type: "string",
		}),
		defineField({
			name: "contatti",
			title: "Contatti",
			type: "text",
		}),
		defineField({
			name: "web",
			title: "Sito Web",
			type: "string",
		}),
	],
});
