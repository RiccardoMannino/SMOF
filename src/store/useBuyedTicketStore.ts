import { create } from "zustand";

type userTickeStore = {
	_id: string;
	_type: string;
	biglietto: string;
	prezzo: string;
	quantita: number;
};

type actionTicketStore = {
	updateId: (_id: userTickeStore["_id"]) => void;
};

// TODO: continuare lo store per aggiornare i biglietti comprati per utente

export const useBuyedTicketStore = create<userTickeStore & actionTicketStore>(
	(set) => ({
		_id: "",
		_type: "",
		biglietto: "",
		prezzo: "",
		quantita: 0,
		updateId: (_id) => set(() => ({ _id: _id })),
	})
);
