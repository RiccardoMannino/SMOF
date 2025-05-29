import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("SMOF")
		.items([
			S.documentTypeListItem("eventi").title("Eventi"),
			S.documentTypeListItem("speaker").title("Ospiti"),
			S.divider(),
			S.documentTypeListItem("page").title("Pages"),
			S.documentTypeListItem("faq").title("FAQs"),
			S.divider(),
			S.listItem()
				.id("siteSettings")
				.schemaType("siteSettings")
				.title("Site Settings")
				.child(
					S.editor()
						.id("siteSettings")
						.schemaType("siteSettings")
						.documentId("siteSettings")
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					!["eventi", "speaker", "page", "faq", "siteSettings"].includes(
						item.getId()!
					)
			),
		]);
