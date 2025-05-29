import { type SchemaTypeDefinition } from "sanity";
import { event } from "./eventType";
import { home } from "./homeType";
import { navbar } from "./navbarTypes";
import { speaker } from "./speakerType";
import { blockContentType } from "./blockContentType";
import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { siteSettingsType } from "./siteSettingsType";
import { splitImageType } from "./blocks/splitImageType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		event,
		speaker,
		navbar,
		home,
		blockContentType,
		pageType,
		pageBuilderType,
		faqType,
		faqsType,
		featuresType,
		heroType,
		splitImageType,
		siteSettingsType,
	],
};
