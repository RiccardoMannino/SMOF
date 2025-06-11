"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { resolve } from "@/sanity/presentation/resolve";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { presentationTool } from "sanity/presentation";

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Aggiungi e modifica il content schema nella cartella './sanity/schemaTypes'
	schema,
	plugins: [
		structureTool({ structure }),
		// Vision è per il querying con GROQ dall'interno dello Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		presentationTool({
			resolve,
			previewUrl: {
				previewMode: {
					enable: "/api/draft-mode/enable",
				},
			},
		}),
	],
	document: {
		newDocumentOptions: (prev) =>
			prev.filter((item) => item.templateId !== "siteSettings"),
	},
});
