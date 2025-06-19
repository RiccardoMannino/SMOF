import { useEffect } from "react";

export function useLockBodyScroll(open: boolean) {
	useEffect(() => {
		if (!open) return;

		const original = (document.body.style.overflow = "scroll");
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = original;
		};
	}, [open]);
}
