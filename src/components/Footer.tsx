import Image from "next/image";
import Link from "next/link";
import React from "react";

type Sezione = {
	titolo: string;
	link: { nome: string; href: string; icona?: React.JSX.Element }[];
}[];

export function Footer() {
	const sezioni: Sezione = [
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
				{
					nome: "Facebook",
					href: "https://www.facebook.com/profile.php?id=61564533287297&sk=reels_tab",
					icona: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							strokeWidth="1"
							fill="#d9822b"
							className="size-10"
							width="26"
						>
							<path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z"></path>
						</svg>
					),
				},
				{
					nome: "Instagram",
					href: "https://www.instagram.com/effetto.outdoor/",
					icona: (
						<svg
							strokeWidth="1"
							fill="#d9822b"
							xmlns="http://www.w3.org/2000/svg"
							className="size-7"
						>
							<path d="M 7.546875 0 C 3.390625 0 0 3.390625 0 7.546875 L 0 18.453125 C 0 22.609375 3.390625 26 7.546875 26 L 18.453125 26 C 22.609375 26 26 22.609375 26 18.453125 L 26 7.546875 C 26 3.390625 22.609375 0 18.453125 0 Z M 7.546875 2 L 18.453125 2 C 21.527344 2 24 4.46875 24 7.546875 L 24 18.453125 C 24 21.527344 21.53125 24 18.453125 24 L 7.546875 24 C 4.472656 24 2 21.53125 2 18.453125 L 2 7.546875 C 2 4.472656 4.46875 2 7.546875 2 Z M 20.5 4 C 19.671875 4 19 4.671875 19 5.5 C 19 6.328125 19.671875 7 20.5 7 C 21.328125 7 22 6.328125 22 5.5 C 22 4.671875 21.328125 4 20.5 4 Z M 13 6 C 9.144531 6 6 9.144531 6 13 C 6 16.855469 9.144531 20 13 20 C 16.855469 20 20 16.855469 20 13 C 20 9.144531 16.855469 6 13 6 Z M 13 8 C 15.773438 8 18 10.226563 18 13 C 18 15.773438 15.773438 18 13 18 C 10.226563 18 8 15.773438 8 13 C 8 10.226563 10.226563 8 13 8 Z"></path>
						</svg>
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
			titolo: "Registrati",
			link: [
				{ nome: "Sign Up", href: "" },
				{ nome: "Login", href: "" },
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
								className={`space-y-2 text-start lg:text-end ${sezione.titolo === "Social" ? "flex flex-row " : ""}`}
							>
								{sezione.link
									? sezione.link.map((voce) => (
											<li key={voce.nome}>
												<Link
													href={`${sezione.titolo === "Social" ? voce.href : `/${voce.href?.toLowerCase().replace(" ", "-")}`}`}
													className="text-sm text-chocolate  hover:text-burnt transition-colors"
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

			<p className="text-sm text-center text-chocolate  mt-10">
				© SMOF 2025. Tutti i diritti riservati.
			</p>
		</footer>
	);
}
