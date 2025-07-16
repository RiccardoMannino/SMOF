import { TicketIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const bigliettoGiornaliero = defineType({
	type: "document",
	icon: TicketIcon,
	name: "giornaliero",
	title: "Biglietto Giornaliero",
	fields: [
		defineField({
			name: "bigliettoGiorno",
			title: "Nome Ticket",
			type: "string",
			validation: (e) => e.required(),
		}),
		defineField({
			name: "Prezzo",
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
