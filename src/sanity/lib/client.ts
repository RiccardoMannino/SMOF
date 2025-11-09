import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Client per SCRITTURA (create, update, delete)
export const writeClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // Necessario per scrivere
	stega: { studioUrl: "https://smof.sanity.studio" },
	token: process.env.SANITY_API_WRITE_TOKEN,
});

// Client per LETTURA (fetch, queries veloci)
export const readClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Veloce grazie alla CDN
	stega: { studioUrl: "https://smof.sanity.studio" },
	// Nessun token necessario per le letture pubbliche
});

// Client principale - alias per retrocompatibilità
export const client = writeClient;
