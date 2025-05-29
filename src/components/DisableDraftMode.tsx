"use client";

import { useDraftModeEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
	const environment = useDraftModeEnvironment();

	// Mostra solamente la modalità draft quando si è fuori dal tool di presentazione
	if (environment !== "live" && environment !== "unknown") {
		return null;
	}

	return (
		<a
			href="/api/draft-mode/disable"
			className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
		>
			Disable Draft Mode
		</a>
	);
}
