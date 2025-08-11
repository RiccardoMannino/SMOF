import { create } from "zustand";

type NewsletterStore = {
	subscribed: boolean;
	setSubscribed: (value: boolean) => void;
};

export const useNewsletterStore = create<NewsletterStore>((set) => ({
	subscribed: false,
	setSubscribed: (value) => set({ subscribed: value }),
}));
