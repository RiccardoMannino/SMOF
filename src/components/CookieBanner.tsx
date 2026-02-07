"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieBanner() {
	const [showBanner, setShowBanner] = useState(false);
	const [storedConsent, setStoredConsent] = useState(() => {
		if (typeof window !== "undefined") {
			const consent = localStorage.getItem("cookieConsent");
			return consent ? JSON.parse(consent) : null;
		}
	});

	useEffect(() => {
		if (storedConsent === null) {
			setShowBanner(true);
		} else {
			setShowBanner(false);
		}
	}, []);

	const handleAccept = () => {
		setShowBanner(false);
		setStoredConsent(
			localStorage.setItem("cookieConsent", JSON.stringify(true)),
		);
	};

	return (
		showBanner && (
			<AnimatePresence initial={false}>
				<motion.div
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
					className="bg-ivory max-w-7xl max-sm:w-full max-sm:max-w-96 mx-auto max-sm:h-96 fixed max-sm:bottom-4  bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-2xl text-sm text-chocolate z-50 max-sm:overflow-y-scroll"
				>
					<div className="flex flex-col  items-center gap-4 text-xl max-sm:text-base">
						<h1 className="self-start">🍪 Cookie Banner</h1>
						<p className="text-justify">
							Questo sito utilizza esclusivamente cookie tecnici necessari al
							corretto funzionamento, inclusi quelli utilizzati per
							l’autenticazione tramite Google e per la gestione dei pagamenti
							tramite Stripe.
							<br /> Non vengono utilizzati cookie di profilazione o marketing.
						</p>
						<p>
							Per maggiori informazioni consulta la{" "}
							<Link href="/cookie" target="_blank" className="underline">
								Cookie Policy
							</Link>{" "}
							e la{" "}
							<Link href="/privacy" target="_blank" className="underline">
								Privacy Policy
							</Link>
						</p>
						<button
							onClick={handleAccept}
							className="bg-mustard text-ivory px-4 py-2 rounded-md hover:bg-mustard/90 transition hover:cursor-pointer"
						>
							Chiudi
						</button>
					</div>
				</motion.div>
			</AnimatePresence>
		)
	);
}
