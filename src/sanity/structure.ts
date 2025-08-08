import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("SMOF")
		.items([
			S.documentTypeListItem("eventi").title("Eventi"),
			S.documentTypeListItem("speaker").title("Speaker"),
			S.divider(),
			S.documentTypeListItem("page").title("Pagine"),
			S.documentTypeListItem("faq").title("FAQs"),
			S.divider(),
			S.listItem()
				.id("siteSettings")
				.schemaType("siteSettings")
				.title("Impostazioni Sito")
				.child(
					S.editor()
						.id("siteSettings")
						.schemaType("siteSettings")
						.documentId("siteSettings")
				),
			S.divider(),
			S.documentTypeListItem("biglietto").title("Biglietti Singolo Evento"),
			S.documentTypeListItem("giornaliero").title("Biglietto Giornaliero"),
			S.documentTypeListItem("festival").title("Biglietto Festival"),
			S.divider(),
			S.documentTypeListItem("galleria").title("Gallerie Immagini"),
			S.documentTypeListItem("user").title("Tutti gli utenti autenticati"),
			S.listItem()
				.title("Utenti iscritti alla Newsletter ")
				.child(
					S.documentList()
						.title("Newsletter Subscribers")
						.apiVersion("v2025-02-19")
						.filter('_type == "user" && subscribeNewsletter == true')
				),
			// Lista filtrata per non iscritti
			S.listItem()
				.title("Non-Subscribers")
				.child(
					S.documentList()
						.title("Non-Subscribers")
						.apiVersion("v2025-02-19")
						.filter('_type == "user" && subscribeNewsletter != true')
				),
			S.documentTypeListItem("partner").title("Partners"),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					![
						"eventi",
						"speaker",
						"page",
						"faq",
						"siteSettings",
						"biglietto",
						"festival",
						"giornaliero",
						"galleria",
						"partner",
						"user",
					].includes(item.getId()!)
			),
		]);
