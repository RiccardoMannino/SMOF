import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "SMOF - Login",
	description:
		"Accedi al tuo account SMOF - San Martino Outdoor Fest per gestire i tuoi biglietti e prenotazioni.",
	keywords: ["login", "accedi", "SMOF", "San Martino Outdoor Fest"],
	openGraph: {
		title: "SMOF - Login",
		description:
			"Accedi al tuo account SMOF per gestire i tuoi biglietti e prenotazioni.",
		type: "website",
		locale: "it_IT",
		images: [
			{
				url: "/logo_smof.png",
				width: 1200,
				height: 630,
				alt: "SMOF - San Martino Outdoor Fest",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "SMOF - Login",
		description:
			"Accedi al tuo account SMOF per gestire i tuoi biglietti e prenotazioni.",
		images: ["/logo_smof.png"],
	},
};

export default async function page() {
	const session = await auth();

	return (
		<section className=" flex justify-center items-center h-120">
			<div className="flex flex-col gap-6 p-2 items-center justify-center bg-ivory rounded-2xl">
				<Image
					src={"/logo_smof.png"}
					alt="smof"
					width={100}
					height={120}
					quality={70}
				/>
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
							className="text-3xl flex items-center justify-center gap-4 font-semibold w-full text-center text-chocolate"
						>
							<ArrowLeft />
							<span className="">Torna alla home</span>
						</Link>
					</>
				)}
			</div>
		</section>
	);
}
