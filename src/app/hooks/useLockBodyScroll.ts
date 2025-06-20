import { useEffect } from "react";

export function useMenuLockBodyScroll(
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 899px)");

		// Funzione per controllare e aggiornare stato + scroll
		const handleChange = () => {
			if (mediaQuery.matches && open) {
				// Siamo mobile + menu aperto: blocca scroll
				document.body.style.overflow = "hidden";
			} else {
				// Non siamo mobile: chiudi menu e sblocca scroll
				setOpen(false);
				document.body.style.overflow = "";
			}
		};

		// Controlla subito
		handleChange();

		// Aggiungi listener per quando cambia la viewport
		mediaQuery.addEventListener("change", handleChange);

		// Cleanup: rimuovi listener e sblocca scroll
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
			document.body.style.overflow = "";
		};
	}, [open, setOpen]);
}
