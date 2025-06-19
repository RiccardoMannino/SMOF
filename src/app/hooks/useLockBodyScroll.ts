import { useEffect } from "react";

export function useLockBodyScroll(open: boolean) {
	useEffect(() => {
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = original;
		};
	}, [open]);
}
