import { type SchemaTypeDefinition } from "sanity";
import { event } from "./eventType";
import { home } from "./homeType";
import { navbar } from "./navbarTypes";
import { speaker } from "./speakerType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [event, speaker, navbar, home, blockContentType],
};
