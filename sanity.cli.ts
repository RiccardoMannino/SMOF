/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASE;

export default defineCliConfig({
	deployment: {
		appId: "n093ptv1tboqi5lofuvbanqb",
	},
	api: {
		projectId: projectId,
		dataset: dataset,
	},
});
