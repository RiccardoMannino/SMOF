import { auth } from "@/lib/auth";
import Facebook from "../../public/facebook.svg";
import Instagram from "../../public/instagram.svg";
import Youtube from "../../public/youtube.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Sezione = {
	titolo: string;
	link: { nome: string; href: string; icona?: React.JSX.Element }[];
}[];

export async function Footer() {
	const session = await auth();

	const sezioni: Sezione = [
		{
			titolo: "Pagine",
			link: [
				{ nome: "Chi siamo", href: "chi-siamo" },
				{ nome: "Eventi", href: "eventi" },
				{ nome: "Partners", href: "partners" },
				{ nome: "Ticket", href: "ticket" },
				{ nome: "Ospitalità", href: "ospitalita" },
				{ nome: "Programma", href: "programma" },
				{ nome: "Galleria", href: "galleria" },
			],
		},
		{
			titolo: "Social",
			link: [
				{
					nome: "Facebook",
					href: "https://www.facebook.com/profile.php?id=61586684685045",
					icona: (
						<Image
							src={Facebook}
							height={25}
							width={25}
							className="h-5 w-5"
							alt="link facebook"
						/>
					),
				},
				{
					nome: "Instagram",
					href: "https://www.instagram.com/smof_fest/",
					icona: (
						<Image
							src={Instagram}
							height={25}
							width={25}
							className="h-5 w-5"
							alt="link Instagram"
						/>
					),
				},
				{
					nome: "Youtube",
					href: "https://www.youtube.com/@Sanmartinooutdoorfest",
					icona: (
						<Image
							src={Youtube}
							height={25}
							width={25}
							className="h-5 w-5"
							alt="link canale youtube"
						/>
					),
				},
			],
		},
		{
			titolo: "Legale",
			link: [
				{ nome: "Privacy Policy", href: "" },
				{ nome: "Termini di Servizio", href: "" },
				{ nome: "Cookie Policy", href: "" },
			],
		},
		{
			titolo: "Registrati / Accedi",
			link: [
				{
					nome: `${session?.user?.email ? "Esci" : "Accedi"}`,
					href: `${session?.user?.email ? "/" : "login"}`,
				},
			],
		},
	];

	return (
		<footer className="px-6 py-12 w-full bg-ivory border-t border-earth">
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:place-items-end items-start gap-10">
				{/* Logo e mappa */}
				<div className="col-span-2 max-sm:col-span-3 flex gap-5 flex-col relative md:flex-row lg:flex-col md:justify-between w-full">
					<Link href="/" className="w-auto">
						<Image
							src="/logo_smof.png"
							alt="SMOF"
							className=" flex-1 object-cover md:w-fit md:h-20 "
							height={100}
							width={150}
						/>
					</Link>

					<div className="overflow-hidden rounded-lg border border-earth/40 shadow-sm w-full ">
						<iframe
							className="w-full h-80"
							src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=it&amp;q=San%20Martino%20delle%20Scale+(SMOF)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
							loading="lazy"
							allowFullScreen
							title="Mappa SMOF"
						/>
					</div>
				</div>

				{/* Sezioni */}
				<div
					className={`grid grid-cols-2 sm:grid-cols-2 col-span-3  md:place-self-stretch lg:place-self-stretch gap-5 md:[&>*:nth-child(2)]:self-center md:items-end`}
				>
					{sezioni.map((sezione) => (
						<div
							key={sezione.titolo}
							className={`flex flex-col  space-y-4 items-start lg:items-end `}
						>
							<p className="text-md font-semibold text-olive ">
								{sezione.titolo}
							</p>
							<ul
								className={`space-y-2 text-start lg:text-end ${sezione.titolo === "Social" ? "flex flex-row gap-3" : ""}`}
							>
								{sezione.link
									? sezione.link.map((voce) => (
											<li key={voce.nome}>
												<Link
													target={`${(sezione.titolo === "Social" && "_blank") || ""}`}
													href={`${sezione.titolo === "Social" ? voce.href : `/${voce.href?.toLowerCase().replace(" ", "-")}`}`}
													className={`text-sm text-chocolate  hover:text-burnt transition-colors `}
												>
													{sezione.titolo === "Social" ? voce.icona : voce.nome}
												</Link>
											</li>
										))
									: null}
							</ul>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col">
				<p className="text-sm text-center text-chocolate mt-10">
					© SMOF by Effetto Outdoor - Natura e Territorio APS ETS. Tutti i
					diritti riservati.
				</p>
				<p className="text-center text-sm text-chocolate">C.F. 97386790824</p>
				<Link
					href="https://www.riccardomannino.it"
					target="_blank"
					className="text-sm text-center text-chocolate  mt-5 hover:text-burnt transition-colors"
				>
					Sviluppato da Riccardo Mannino
				</Link>
			</div>
		</footer>
	);
}
