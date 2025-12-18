import { defineQuery } from "next-sanity";

export const EVENTS_QUERY =
	defineQuery(`*[_type == 'eventi' && defined(slug.current)][0...120]
    {
  _id , data , slug , eventName, eventType, eventDescription, immagine, raduno, biglietto , equipaggiamento, immagineEvento, speakers->{
    speakerName,
    speakerImage
  }}`);

// Biglietto singolo evento
export const TICKET_QUERY = defineQuery(`*[_type == "biglietto"]{
  _id , prezzo, quantita , biglietto ,
}`);

// Biglietto giornaliero
export const DAILY_TICKET_QUERY = defineQuery(`*[type == "giornaliero"]{
  prezzo , quantita, bigliettoGiorno
}`);

// Biglietto evento
export const FESTIVAL_TICKET_QUERY = defineQuery(`*[type == "festival"]{
  prezzo, quantita, biglietto 
}`);

export const PARTNER_QUERY = defineQuery(`*[_type == "partner" ]{
  _id ,nome , tipo, link ,immagine
}`);

export const GALLERIES_QUERY =
	defineQuery(`*[_type == "galleria" && defined(slug.current)][0...20]{
_id , images , titolo , slug
}`);

export const SINGLE_GALLERY_QUERY =
	defineQuery(`*[_type == "galleria" && slug.current == $slug][0]{
  _id , images , titolo 
}`);
export const SINGLE_OSPITALITA_QUERY =
	defineQuery(`*[_type == "ospitalita" && slug.current == $slug][0]{
  _id , immagine , luogo , descrizione , bedAndBreakfast[]->{
    denominazione,
    indirizzo,
    contatti,
    web
  }
}`);
export const OSPITALITA_QUERY =
	defineQuery(`*[_type == "ospitalita" && defined(slug.current)]{
  _id , immagine , luogo , descrizione , bedAndBreakfast[]->{
    denominazione,
    indirizzo,
    contatti,
    web
  }, slug , 
}`);

export const EVENT_QUERY =
	defineQuery(`*[_type == 'eventi' && slug.current == $slug][0]{
  _id , eventName, specifiche , eventType, biglietto, immagine, immagineEvento, data, eventDescription, raduno, equipaggiamento , speakers->{
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

// utenti autenticati
export const AUTH_USERS = defineQuery(`*[_type == "user"] {
  _id,
  name,
  email,
  profileImage,
  uid,
  subscribeNewsletter,
}`);

// si golo utente autenticato
export const SINGLE_AUTH_USER =
	defineQuery(`*[_type == "user" && uid == $uid][0]{
    email
  }`);

export const PAGE_QUERY =
	defineQuery(`*[_type == "page" && slug.current == $slug][0]{
 descrizione[]{
  ...,
 }, 
 mainImage ,...,
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
    ordine,
    _id,
    "slug": slug.current,
    "Home": slug.current == "/"
  }
  | order(Home desc, ordine asc)
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
