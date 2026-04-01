// funzione per formattare la data in questo formato esempio: 31 maggio 2025 alle ore 18:06
export function dataFormattata(data: string | null | undefined) {
	return new Date(data as string).toLocaleString("it-IT", {
		timeZone: "Europe/Rome",
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

export function dataGiornoMese(data: string | null) {
	return new Date(data as string).toLocaleString("it-IT", {
		timeZone: "Europe/Rome",
		day: "2-digit",
		month: "long",
	});
}

// funzione per formattare solo data senza ora: 12 settembre 2026
export function dataSoloData(data: string | null | undefined) {
	return new Date(data as string).toLocaleString("it-IT", {
		timeZone: "Europe/Rome",
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

// funzione che restituisce solo l'anno
export function dataAnno(data: string | null) {
	return new Date(data as string).toLocaleString("it-IT", {
		year: "numeric",
	});
}
export function dataFineEvento(data: string | null) {
	return new Date(data as string).toLocaleString("it-IT", {
		timeZone: "Europe/Rome",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function dataGiornaliera(data: string | null) {
	return new Date(data as string).toLocaleDateString("it-IT", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
