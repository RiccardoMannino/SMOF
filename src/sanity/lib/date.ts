// funzione per formattare la data in questo formato esempio: 31 maggio 2025 alle ore 18:06
export function dataFormattata(data: string | null) {
	return new Date(data as string).toLocaleString("it-IT", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

export function dataProva(data: string | null) {
	return new Date(data as string).toLocaleString("it-IT", {
		year: "numeric",
	});
}
