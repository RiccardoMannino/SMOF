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
			title: "Evento di riferimento",
			type: "reference",
			to: [{ type: "eventi" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "sessioni",
			title: "Sessioni e Disponibilità",
			description: "Gestione orari e quantità per ogni data dell'evento",
			type: "array",
			of: [
				{
					type: "object",
					name: "sessione",
					fields: [
						defineField({
							name: "dataSelezionata",
							title: "Data e ora sessione",
							type: "datetime",
							options: {
								dateFormat: "DD/MM/YYYY",
								timeFormat: "HH:mm",
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "quantita",
							title: "Posti disponibili",
							type: "number",
							validation: (Rule) => Rule.required().min(0),
						}),
					],
					preview: {
						select: {
							date: "dataSelezionata",
							quantita: "quantita",
						},
						prepare({ date, quantita }) {
							const dataFormattata = date
								? new Date(date).toLocaleString("it-IT", {
										day: "2-digit",
										month: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
									})
								: "Data non definita";
							return {
								title: dataFormattata,
								subtitle: `${quantita ?? 0} posti disponibili`,
							};
						},
					},
				},
			],
		}),
		defineField({
			name: "prezzo",
			title: "Prezzo del biglietto",
			type: "number",
			description:
				"Prezzo specifico per questo biglietto (se diverso da quello dell'evento)",
		}),
	],
	preview: {
		select: {
			eventName: "biglietto.eventName",
			eventPrice: "biglietto.biglietto",
			ticketPrice: "prezzo",
			sessions: "sessioni",
		},
		prepare({ eventName, eventPrice, ticketPrice, sessions }) {
			const price = ticketPrice ?? eventPrice;
			return {
				title: eventName || "Biglietto senza evento",
				subtitle: price
					? `€${price} - ${sessions?.length || 0} sessioni`
					: `${sessions?.length || 0} sessioni disponibili`,
			};
		},
	},
});
