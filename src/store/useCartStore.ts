import { create } from "zustand";

type OggettoCarrello = {
	id: string;
	nome: string;
	prezzo: string;
	quantita: number;
};

type Carrello = { carrello: OggettoCarrello[] };

type AzioniCarrello = {
	aggiungiArticolo: (articleData: OggettoCarrello) => void;
	eliminaArticolo: (articleData: OggettoCarrello) => void;
	svuotaCarrello: (carrello: OggettoCarrello[]) => void;
};

export const useCartStore = create<Carrello & AzioniCarrello>()((set, get) => ({
	carrello: [],

	aggiungiArticolo: (nuovoArticolo) =>
		set((state) => ({
			carrello: [...state.carrello, nuovoArticolo],
		})),

	eliminaArticolo: (articolo) =>
		set((state) => ({
			carrello: state.carrello.filter((cart) => cart.id !== articolo?.id),
		})),

	svuotaCarrello: () =>
		set(() => ({
			carrello: [],
		})),
}));
