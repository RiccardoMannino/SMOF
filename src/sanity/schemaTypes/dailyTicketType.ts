import { TicketIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const bigliettoGiornaliero = defineType({
	name: "giornaliero",
	type: "document",
	icon: TicketIcon,
	title: "Biglietto Giornaliero",
	fields: [
		defineField({
			name: "biglietto",
			title: "Nome Ticket",
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
			validation: (e) => e.required().min(0),
		}),
	],
});
