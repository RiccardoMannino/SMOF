import { defineField, defineType } from "sanity";

import { DocumentTextIcon } from "@sanity/icons";

export const event = defineType({
	type: "document",
	icon: DocumentTextIcon,
	name: "eventi",
	title: "Eventi",
	fields: [
		defineField({
			name: "eventName", // nome usato nella query
			title: "Nome Evento", // titolo nell'editor
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "eventType", // nome usato nella query
			title: "Tipo Evento", // titolo nell'editor
			type: "string",
			options: {
				list: [
					"Documentario",
					"Inaugurazione",
					"Trekking",
					"Trail",
					"Yoga",
					"Dog Trekking",
					"Musica",
					"Smof Grill",
					"Workshop",
					"Orienteering",
					"Visite Guidate",
				], // tipo evento
				layout: "dropdown",
			},
			validation: (e) => e.required(),
		}),
		defineField({
			name: "raduno", // nome usato nella query
			title: "Punto Raduno", // titolo nell'editor
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "equipaggiamento", // nome usato nella query
			title: "Equipaggiamento", // titolo nell'editor
			type: "string",
		}),
		defineField({
			name: "specifiche", // nome usato nella query
			title: "Specifiche percorso", // titolo nell'editor
			type: "blockContent",
		}),
		defineField({
			name: "eventDescription", // nome usato nella query
			title: "Descrizione Evento", // titolo nell'editor
			type: "blockContent",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "relatedEvents", // nome usato nella query
			title: "Eventi Correlati", // titolo nell'editor
			type: "array",
			of: [{ type: "reference", to: { type: "eventi" } }],
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "eventName" },
		}),
		defineField({
			name: "dateEvento",
			title: "Date dell'evento",
			type: "array",
			// Qui definiamo che l'array contiene date
			of: [{ type: "datetime" }],
		}),
		defineField({
			name: "dataFine", // nome usato nella query
			title: "Fine evento",
			type: "array",
			// Qui definiamo che l'array contiene date
			of: [{ type: "datetime" }],
		}),
		defineField({
			name: "immagine", // nome usato nella query
			title: "immagine Card",
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
			name: "immagineEvento", // nome usato nella query
			title: "Immagine Evento ",
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
			name: "biglietto", // nome usato nella query
			title: "Costo biglietto",
			type: "number",
		}),
		// defineField({
		// 	name: "speakers", // nome usato nella query
		// 	title: "Speakers", //  titolo nell'editor
		// 	type: "reference",
		// 	to: [{ type: "speaker" }],
		// 	validation: (e) => e.required(),
		// }),
	],
});
