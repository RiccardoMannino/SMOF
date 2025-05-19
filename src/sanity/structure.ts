import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("SMOF")
		.items([
			S.documentTypeListItem("eventi").title("Eventi"),
			S.documentTypeListItem("speaker").title("Ospiti"),
			S.documentTypeListItem("home").title("Home"),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() && !["eventi", "speaker", "home"].includes(item.getId()!)
			),
		]);
