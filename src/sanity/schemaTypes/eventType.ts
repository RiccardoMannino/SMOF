import { defineArrayMember, defineField, defineType } from "sanity";

import { DocumentTextIcon } from "@sanity/icons";

export const event = defineType({
	type: "document",
	icon: DocumentTextIcon,
	name: "eventi",
	title: "Eventi",
	fields: [
		defineField({
			name: "eventName",
			title: "Nome Evento", // titolo nell'editor
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "eventType",
			title: "Tipo Evento", // titolo nell'editor
			type: "string",
			options: {
				list: ["escursione", "conferenza"],
				layout: "dropdown",
			},
			validation: (e) => e.required(),
		}),
		defineField({
			name: "eventDescription",
			title: "Descrizione Evento", // titolo nell'editor
			type: "text",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "eventName" },
		}),
		defineField({
			name: "data",
			title: "Data evento",
			type: "datetime",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "immagine",
			title: "Immagine Evento",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Testo alternativo",
					validation: (rule) =>
						rule.custom((value, context) => {
							const parent = context?.parent as { asset?: { _ref?: string } };

							return !value && parent?.asset?._ref
								? "Alt text is required when an image is present"
								: true;
						}),
				},
			],
			validation: (e) => e.required(),
		}),
		defineField({
			name: "biglietto",
			type: "url",
		}),
		defineField({
			name: "speakers",
			title: "Speakers",
			type: "array",
			validation: (e) => e.required(),
			of: [defineArrayMember({ type: "reference", to: [{ type: "speaker" }] })],
		}),
	],
});
