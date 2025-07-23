import { PersonStandingIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const partner = defineType({
	name: "partner",
	title: "Partner",
	type: "document",
	icon: PersonStandingIcon,
	fields: [
		defineField({
			name: "nome",
			title: "Nome Partner",
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "tipo",
			title: "Tipo di partner",
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "link",
			title: "Link partner",
			type: "url",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "immagine",
			title: "Immagine Partner",
			type: "image",
			options: {
				hotspot: true,
			},

			validation: (e) => e.required(),
		}),
	],
});
