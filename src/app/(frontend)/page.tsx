import Link from "next/link";
import { Title } from "@/components/Title";

export default async function Page() {
	return (
		<section className="container mx-auto grid grid-cols-1 gap-6 p-12">
			<Title>SMOF Home Page</Title>
			<hr />
			<Link href="/eventi">Indice Eventi &rarr;</Link>
		</section>
	);
}
