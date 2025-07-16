import { defineQuery } from "next-sanity";

export const EVENTS_QUERY =
	defineQuery(`*[_type == 'eventi' && defined(slug.current)][0...120]
    {
  _id , data ,slug , eventName, eventType, eventDescription, immagine, speakers->{
    speakerName,
    speakerImage
  }}`);

export const TICKET_QUERY = defineQuery(`*[_type == "biglietto"]{
  _id , prezzo, biglietto 
}`);
export const GALLERIES_QUERY =
	defineQuery(`*[_type == "galleria" && defined(slug.current)][0...20]{
_id , images , titolo , slug
}`);

export const SINGLE_GALLERY_QUERY =
	defineQuery(`*[_type == "galleria" && slug.current == $slug][0]{
  _id , images , titolo 
}`);

export const EVENT_QUERY =
	defineQuery(`*[_type == 'eventi' && slug.current == $slug][0]{
  _id , eventName, eventType, immagine, data, eventDescription, speakers->{
    speakerName,
    speakerImage
  }, relatedEvents[]{
    _key, // necessario per il drag and drop
    ...@->{_id, eventName, slug} // ricevi i campo dall' evento referente
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

export const LIST_PAGE_QUERY = defineQuery(`
  *[_type == "page"]
  {
    title,
    _id,
    "slug": slug.current,
    "Home": slug.current == "/"
  }
  | order(Home desc, title asc)
`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      ...,
      content[]{
        ...,
        _type == "faqs" => {
          ...,
          faqs[]->
        }
      }      
    }
  }`);
