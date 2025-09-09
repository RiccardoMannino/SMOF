import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definizione del tipo per un singolo articolo acquistato
type OggettoAcquistato = {
	_id: string; // ID del prodotto/biglietto
	_type: string; // Tipo di documento Sanity
	name: string; // Nome del biglietto/prodotto
	price: string; // Prezzo unitario
	quantity: number; // Quantità acquistata
};

// Definizione del tipo per un intero acquisto/ordine
type Ordine = {
	orderId?: string; // ID unico dell'ordine
	date?: string; // Data e ora dell'acquisto
	items: OggettoAcquistato[]; // Array di articoli acquistati
};

// Definizione del tipo per lo stato dello store
type UserStoreState = {
	userId: string | null; // ID dell'utente
	ordine: Ordine[]; // Array degli ordini dell'utente
};

// Definizione del tipo per le azioni dello store
type UserStoreActions = {
	setUserId: (id: string) => void;
	aggiungiOrdine: (orderData: Ordine) => void;
};

export const useBuyedTicketStore = create<UserStoreState & UserStoreActions>()(
	persist(
		(set, get) => ({
			userId: null,
			ordine: [],

			setUserId: (id) => set({ userId: id }),
			aggiungiOrdine: (newOrder) =>
				set((state) => ({
					ordine: [...state.ordine, newOrder],
				})),
		}),
		{
			name: "user-ticket-storage",
		}
	)
);
