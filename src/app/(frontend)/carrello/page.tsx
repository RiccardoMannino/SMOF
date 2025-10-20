import Cart from "@/components/Cart";
import { auth } from "@/lib/auth";
import { getCurrentUserRole } from "@/lib/getUserRole";
import { notFound } from "next/navigation";

export default async function Carrello() {
	const session = await auth();
	const email = session?.user?.email;

	// se non esiste l'utente
	if (!email) return notFound();
	return (
		<main className="container mx-auto h-full ">
			<h1 className="text-2xl max-sm:text-center  sm:text-3xl md:text-4xl mt-7 font-bold text-mustard  transition-colors">
				Carrello
			</h1>
			<section className="max-w-3xl sm:mx-auto max-sm:mx-[1rem] my-10 p-8 rounded-lg bg-ivory shadow-lg border border-chocolate min-h-96">
				<div className="bg-mustard/20 rounded p-4 text-chocolate overflow-y-scroll min-h-80 justify-between">
					<Cart email={email} />
				</div>
			</section>
		</main>
	);
}
