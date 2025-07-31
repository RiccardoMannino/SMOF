import { defineField, defineType } from "sanity";

// schemas/user.js
export const user = defineType({
	name: "user",
	title: "User",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		defineField({
			name: "email",
			title: "Email",
			type: "string",
		}),
		defineField({
			name: "profileImage",
			title: "Profile Image",
			type: "string",
		}),
		defineField({
			name: "uid",
			title: "User ID",
			type: "string",
			readOnly: true, // Questo campo non deve essere modificato dagli editor
		}),
		defineField({
			name: "subscribeNewsletter",
			title: "Subscribe to Newsletter",
			type: "boolean",
			initialValue: false,
		}),
	],
});
