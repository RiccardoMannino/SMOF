import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { CustomSelect } from "@/components/CustomSelect";
import { EVENTS_QUERY_RESULT } from "@/sanity/sanity.types";

// Componente Eventi che riceve i dati ordinati, gli eventi e i tipi di eventi come props
export default function Eventi({
	dataOrdinata,
	eventi,
	tipiEventi,
}: {
	dataOrdinata: Set<string | undefined>;
	eventi: EVENTS_QUERY_RESULT;
	tipiEventi: (
		| "Documentario"
		| "Educazione Ambientale"
		| "Corsi"
		| "Inaugurazione"
		| "Trekking"
		| "Trail"
		| "Yoga"
		| "Dog Trekking"
		| "Musica"
		| "Smof Grill"
		| "Workshop"
		| "Orienteering"
		| "Visite Guidate"
		| null
	)[];
}) {
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
