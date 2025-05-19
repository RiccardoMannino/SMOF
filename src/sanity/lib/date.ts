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
