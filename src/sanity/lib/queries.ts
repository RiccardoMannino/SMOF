import { defineQuery } from "next-sanity";

export const EVENTS_QUERY =
	defineQuery(`*[_type == 'eventi' && defined(slug.current)][0...12]
    {
  _id , data ,slug , eventName, eventType, eventDescription, immagine, speakers->{
    speakerName,
    speakerBio,
    speakerImage
  }}`);

export const EVENT_QUERY =
	defineQuery(`*[_type == 'eventi' && slug.current == $slug][0]{
  _id , eventName, eventType, immagine, data, eventDescription, speakers->{
    speakerName,
    speakerBio,
    speakerImage
  }, relatedEvents[]{
    _key, // nessario per il drag and drop
    ...@->{_id, eventName, slug} // get fields from the referenced event
  }}`);

export const EVENTS_SLUGS_QUERY =
	defineQuery(`*[_type == "eventi" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const PAGE_QUERY =
	defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->
    }
  }
}`);
