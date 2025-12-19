import { defineField, defineType } from "sanity";

import { DocumentTextIcon } from "@sanity/icons";

export const ospitalita = defineType({
	type: "document",
	icon: DocumentTextIcon,
	name: "ospitalita",
	title: "Ospitalità",
	fields: [
		defineField({
			name: "luogo",
			title: "Luogo",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: { source: "luogo" },
		}),
		defineField({
			name: "immagine",
			title: "Immagine",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "descrizione", // nome usato nella query
			title: "Descrizione località", // titolo nell'editor
			type: "blockContent",
		}),
		defineField({
			name: "bedAndBreakfast",
			title: "Lista B&B",
			type: "array",
			of: [{ type: "reference", to: [{ type: "dormire" }] }],
		}),
	],
});
