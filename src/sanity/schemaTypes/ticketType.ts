import { TicketIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const biglietto = defineType({
	name: "biglietto",
	title: "Biglietto Singolo Evento",
	type: "document",
	icon: TicketIcon,
	fields: [
		defineField({
			name: "biglietto",
			title: "Nome Ticket",
			type: "reference",
			to: [{ type: "eventi" }],
			validation: (e) => e.required(),
		}),
		defineField({
			name: "prezzo",
			title: "Prezzo",
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "quantita",
			title: "Quantità disponibile",
			type: "number",
			validation: (e) => e.required().min(0),
		}),
	],
});
