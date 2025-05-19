import { type SchemaTypeDefinition } from "sanity";
import { event } from "./eventType";
import { home } from "./homeType";
import { navbar } from "./navbarTypes";
import { speaker } from "./speakerType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [event, speaker, navbar, home],
};
