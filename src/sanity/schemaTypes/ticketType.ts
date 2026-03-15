import { TicketIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const biglietto = defineType({
	name: "biglietto",
	title: "Biglietto Singolo Evento",
	type: "document",
	icon: TicketIcon,
	preview: {
		select: {
			title: "biglietto.eventName",
			subtitle: "biglietto.biglietto",
		},
		prepare({ title, subtitle }) {
			return {
				title: title || "Biglietto senza evento",
				subtitle: subtitle ? `€${subtitle}` : "Prezzo non impostato",
			};
		},
	},
	fields: [
		defineField({
			name: "biglietto",
			title: "Nome Ticket",
			type: "reference",
			to: [{ type: "eventi" }],
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
