import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
	title: "SMOF - Contatti",
	description:
		"Contattaci per informazioni su eventi outdoor, escursioni e attività naturalistiche. Effetto Outdoor - natura e territorio APS ETS a Monreale, Palermo.",
	keywords: [
		"contatti",
		"effetto outdoor",
		"escursioni",
		"eventi outdoor",
		"natura",
		"territorio",
	],
	openGraph: {
		title: "SMOF - Contatti",
		description:
			"Contattaci per informazioni su eventi outdoor, escursioni e attività naturalistiche.",
		type: "website",
		locale: "it_IT",
		images: [
			{
				url: "/logo_smof.png",
				width: 1200,
				height: 630,
				alt: "SMOF - San Martino Outdoor Festival",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "SMOF - Contatti",
		description:
			"Contattaci per informazioni su eventi outdoor, escursioni e attività naturalistiche.",
		images: ["/logo_smof.png"],
	},
	alternates: {
		canonical: "/contatti",
	},
};

export default function Page() {
	return (
		<section className="container mx-auto mb-14 max-sm:mb-8 max-w-5xl px-2 ">
			<div className="max-h-max">
				<h1 className="text-[clamp(2rem,4vw+1rem,3rem)] mt-20 font-bold text-center max-sm:mb-10 mb-20 text-mustard">
					Contatti
				</h1>
				<ContactForm />
			</div>
		</section>
	);
}
