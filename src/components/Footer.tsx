import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
	const sezioni = [
		{
			titolo: "Pagine",
			link: [
				{ nome: "Chi siamo", href: "chi-siamo" },
				{ nome: "Eventi", href: "eventi" },
				{ nome: "Partner", href: "partner" },
				{ nome: "Ticket", href: "ticket" },
				{ nome: "Ospitalità", href: "ospitalità" },
				{ nome: "Programma", href: "programma" },
			],
		},
		{
			titolo: "Social",
			link: [
				{ nome: "Facebook", href: "" },
				{ nome: "Instagram", href: "" },
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
			titolo: "Registrati",
			link: [
				{ nome: "Sign Up", href: "" },
				{ nome: "Login", href: "" },
				{ nome: "Password Dimenticata", href: "" },
			],
		},
	];

	return (
		<footer className="px-6 py-12 w-full bg-ivory border-t border-earth">
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:place-items-end items-start gap-10">
				{/* Logo e mappa */}
				<div className="col-span-2 flex gap-5 flex-col relative md:flex-row lg:flex-col md:justify-between w-full">
					<Link href="/" className="w-auto">
						<Image
							src="/logo_smof.png"
							alt="SMOF"
							className=" flex-1 object-cover md:w-fit md:h-20"
							height={100}
							width={150}
						/>
					</Link>

					<div className="overflow-hidden rounded-lg border border-earth/40 shadow-sm w-full ">
						<iframe
							className="w-full h-96"
							src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=it&amp;q=San%20Martino%20delle%20Scale+(SMOF)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
							loading="lazy"
							allowFullScreen
							title="Mappa SMOF"
						/>
					</div>
				</div>

				{/* Sezioni */}
				<div className="grid grid-cols-2 sm:grid-cols-2 col-span-3  md:place-self-stretch lg:place-self-stretch gap-5 md:[&>*:nth-child(2)]:self-center md:items-end ">
					{sezioni.map((sezione) => (
						<div
							key={sezione.titolo}
							className="flex flex-col space-y-4 items-start lg:items-end "
						>
							<p className="text-md font-semibold text-olive ">
								{sezione.titolo}
							</p>
							<ul className="space-y-2 text-start lg:text-end">
								{sezione.link.map((voce) => (
									<li key={voce.nome}>
										<Link
											href={`/${voce.href?.toLowerCase().replace(" ", "-")}`}
											className="text-sm text-chocolate  hover:text-burnt transition-colors"
										>
											{voce.nome}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			<p className="text-sm text-center text-chocolate  mt-10">
				© SMOF 2025. Tutti i diritti riservati.
			</p>
		</footer>
	);
}
