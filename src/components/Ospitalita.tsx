import { OspitalitaList } from "@/components/OspitalitaList";

export default function Ospitalita() {
	return (
		<main className="container mx-auto p-12 flex flex-col gap-6 text-3xl">
			<h1 className="text-center text-mustard font-semibold mb-5 clamp">
				Ospitalità
			</h1>
			<OspitalitaList />
		</main>
	);
}
