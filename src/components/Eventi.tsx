import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { CustomSelect } from "@/components/CustomSelect";
import { dataGiornaliera } from "@/lib/date";
import { sanityFetch } from "@/sanity/lib/live";
import { EVENTS_QUERY } from "@/sanity/lib/queries";

// Componente Eventi che riceve i dati ordinati, gli eventi e i tipi di eventi come props
export default async function Eventi() {
	// query degli eventi
	const { data: eventi } = await sanityFetch({
		query: EVENTS_QUERY,
	});

	// elimina i doppioni degli anni di tutti gli eventi, fattibile anche con la GROQ di sanity
	const dateEventi = Array.from(
		new Set(
			eventi.map((date) =>
				date.dateEvento?.map((data) => dataGiornaliera(data)),
			),
		),
	);

	const dataOrdinata = new Set([...dateEventi].sort().flat());

	// Tipi eventi non duplicati , fattibile anche con la GROQ di sanity
	const tipiEventi = Array.from(new Set(eventi.map((tipo) => tipo.eventType)));
	return (
		<main className="container mx-auto bg-forest grid gap-6 p-12 max-sm:p-8">
			<h1 className="text-2xl sm:text-3xl md:text-4xl mt-5 font-bold text-mustard transition-colors">
				Eventi
			</h1>

			<div className="flex flex-col md:grid container md:grid-flow-row   gap-24 py-12 items-center max-sm:w-full">
				<CustomSelect data={dataOrdinata} eventi={eventi} tipo={tipiEventi} />
			</div>
			<Link
				href="/"
				className="flex gap-2 items-center text-lg sm:text-xl md:text-2xl font-semibold text-mustard"
			>
				<ArrowBigLeft className="hover:-translate-x-1.5 transition-all" />
				Torna alla home
			</Link>
		</main>
	);
}
