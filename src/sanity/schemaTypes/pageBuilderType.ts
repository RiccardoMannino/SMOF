import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
	name: "pageBuilder",
	type: "array",
	of: [
		defineArrayMember({ type: "hero" }),
		defineArrayMember({ type: "staff" }),
		defineArrayMember({ type: "splitImage" }),
		defineArrayMember({ type: "features" }),
		defineArrayMember({ type: "faqs" }),
	],
	options: {
		insertMenu: {
			views: [
				{
					name: "grid",
					previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
				},
			],
		},
	},
});
