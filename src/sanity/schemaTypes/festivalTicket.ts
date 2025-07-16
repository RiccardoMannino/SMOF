import { TicketIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const festivalTicket = defineType({
	type: "document",
	icon: TicketIcon,
	name: "festival",
	title: "Biglietto Festival",
	fields: [
		defineField({
			name: "biglietto", // nome usato nella query
			title: "Nome Ticket ", // titolo nell'editor
			type: "string",
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
			validation: (e) => e.required(),
		}),
	],
});
