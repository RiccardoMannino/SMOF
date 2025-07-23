import { type SchemaTypeDefinition } from "sanity";
import { event } from "./eventType";
import { navbar } from "./navbarTypes";
import { speaker } from "./speakerType";
import { blockContentType } from "./blockContentType";
import { pageType } from "./pageType";
import { pageBuilderType } from "./pageBuilderType";
import { faqType } from "./faqType";
import { biglietto } from "./ticketType";
import { faqsType } from "./blocks/faqsType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { siteSettingsType } from "./siteSettingsType";
import { splitImageType } from "./blocks/splitImageType";
import { staffType } from "./blocks/staffType";
import { bigliettoGiornaliero } from "./dailyTicketType";
import { festivalTicket } from "./festivalTicket";
import { galleryType } from "./galleryType";
import { partner } from "./partnerType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		partner,
		event,
		speaker,
		navbar,
		blockContentType,
		pageType,
		pageBuilderType,
		faqType,
		faqsType,
		featuresType,
		heroType,
		splitImageType,
		siteSettingsType,
		staffType,
		biglietto,
		bigliettoGiornaliero,
		festivalTicket,
		galleryType,
	],
};
