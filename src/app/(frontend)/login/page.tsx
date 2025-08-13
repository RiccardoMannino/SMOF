import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
	const session = await auth();

	return (
		<section className=" flex justify-center items-center h-[30rem]">
			<div className="flex flex-col gap-6 p-2 items-center justify-center bg-ivory rounded-2xl">
				<Image src={"/logo_smof.png"} alt="smof" width={100} height={120} />
				{!session?.user?.email ? (
					<>
						<h2
							className="text-3xl font-semibold w-full text-center text-chocolate 
						"
						>
							Accedi
						</h2>
						<SignInButton />
					</>
				) : (
					<>
						<h2 className="p-2 text-3xl font-semibold w-full text-center text-chocolate ">
							Sei già autenticato!
						</h2>
						<Link
							href={"/"}
							className="text-3xl font-semibold w-full text-center text-chocolate"
						>
							Torna alla home
						</Link>
					</>
				)}
			</div>
		</section>
	);
}
