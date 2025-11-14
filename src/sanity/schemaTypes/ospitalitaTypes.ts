import { defineField, defineType } from "sanity";

import { DocumentTextIcon } from "@sanity/icons";
import { title } from "process";

export const ospitalita = defineType({
	type: "document",
	icon: DocumentTextIcon,
	name: "ospitalità",
	title: "Ospitalità",
	fields: [
		defineField({
			name: "luogo",
			title: "Luogo",
			type: "string",
		}),
		defineField({
			name: "",
			title: "",
			type: "",
		}),
	],
});
