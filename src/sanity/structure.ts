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
					].includes(item.getId()!)
			),
		]);
