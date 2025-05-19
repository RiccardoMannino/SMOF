import { defineQuery } from "next-sanity";

export const EVENTS_QUERY =
	defineQuery(`*[_type == 'eventi' && defined(slug.current)][0...12]
    {
  _id , data ,slug , eventName, eventType , immagine
, speakers}`);

export const EVENT_QUERY =
	defineQuery(`*[_type == 'eventi' && slug.current == $slug][0]{
  eventName, immagine, data, eventDescription}`);
