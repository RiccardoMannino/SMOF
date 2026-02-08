import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const staffType = defineType({
	name: "staff",
	icon: UserIcon,
	type: "object",
	fields: [
		defineField({
			name: "nome", // valore usato nella query
			title: "nome", // titolo nell'editor
			type: "string",
		}),
		defineField({
			name: "descrizione", //  valore usato nella query
			type: "text",
		}),
		defineField({
			name: "immagini", // valore usato nella query
			title: "Immagini", // titolo nell'editor
			type: "array", // tipo del field
			of: [{ type: "image", options: { hotspot: true } }],
			validation: (Rule) => Rule.required().min(1),
			description: "Inserisci le immagini dello staff.",
		}),
		defineField({
			name: "slug", // valore usato nella query
			title: "Slug", // titolo nell'editor
			type: "slug", // tipo del field
			options: {
				source: "nome",
			},
		}),
	],
});
