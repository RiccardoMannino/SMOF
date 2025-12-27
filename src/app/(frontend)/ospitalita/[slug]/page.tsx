import Image from "next/image";
import { urlFor } from "../../../../sanity/lib/image";
import { sanityFetch } from "../../../../sanity/lib/live";
import {
	DORMIRE_QUERY,
	SINGLE_OSPITALITA_QUERY,
} from "../../../../sanity/lib/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponent";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/Table";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { data: ospitalita } = await sanityFetch({
		query: SINGLE_OSPITALITA_QUERY,
		params: await params,
	});

	const { data: dormire } = await sanityFetch({
		query: DORMIRE_QUERY,
		params: await params,
	});

	return (
		<div className="flex flex-col items-center justify-center  gap-5 w-full">
			<div
				className={`container mx-auto flex flex-col max-sm:p-6 pb-10 text-chocolate`}
			>
				<h3
					className={`${ospitalita?.luogo === "Dove Dormire" && "hidden "} text-center text-2xl max-sm:text-center  md:text-3xl lg:text-5xl font-semibold text-mustard text-pretty mt-20 mb-10`}
				>
					{ospitalita?.luogo}
				</h3>
				{/* {ospitalita?.immagine ? (
					<Image
						src={urlFor(ospitalita?.immagine).auto("format").url()}
						className="h-auto  object-cover rounded-lg gap-10"
						width="1800"
						height="480"
						alt="thumbnail"
					/>
				) : null} */}
				{ospitalita?.descrizione ? (
					<div className="bg-ivory p-4 rounded-2xl text-xl text-justify my-20">
						<PortableText
							value={ospitalita?.descrizione}
							components={{
								...components,
								types: {
									...(components as any).types,
									image: ({ value }: any) =>
										value ? (
											<Image
												src={urlFor(value).auto("format").url()}
												alt={value.alt || "immagine"}
												className="md:float-right ml-8 mb-4 mr-2 w-2/4 max-md:w-full max-md:ml-0 rounded-lg "
												width={1800}
												height={680}
											/>
										) : null,
								},
							}}
						/>
					</div>
				) : null}

				{ospitalita?.luogo === "San Martino delle Scale " && (
					<iframe
						className="w-full h-80 rounded-2xl"
						src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=it&amp;q=San%20Martino%20delle%20Scale+(SMOF)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
						loading="lazy"
						allowFullScreen
						title="Mappa SMOF"
					/>
				)}
				{ospitalita?.luogo === "Monreale" && (
					<iframe
						className="w-full h-80 rounded-2xl"
						width="100%"
						height="600"
						src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Monreale+(SMOF)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					/>
				)}

				{(await params).slug === "dove-dormire" && (
					<>
						<h1
							className={`text-center text-[clamp(2rem,5vw+0.5rem,3rem)] font-semibold text-mustard mt-20 mb-20`}
						>
							Ospitalità
						</h1>
						<h2 className="text-center text-[clamp(2rem,5vw+0.5rem,2.5rem)] font-semibold text-mustard mb-10">
							{ospitalita?.luogo}
						</h2>
						<div className="relative">
							<Table className="bg-ivory rounded-2xl  ">
								<TableHeader>
									<TableRow className="text-lg">
										<TableHead className="font-semibold p-4">
											Denominazione
										</TableHead>
										<TableHead className="font-semibold p-4">
											Contatti
										</TableHead>
										<TableHead className="font-semibold p-4">
											Indirizzo
										</TableHead>
										<TableHead className="font-semibold p-4">Web</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{dormire.map((dorm) => (
										<TableRow className="text-lg" key={dorm.denominazione}>
											<TableCell className="p-4 font-semibold">
												{dorm.denominazione}
											</TableCell>
											<TableCell className="whitespace-pre-line p-4">
												{dorm.contatti}
											</TableCell>
											<TableCell className="p-4">{dorm.indirizzo}</TableCell>
											<TableCell className="p-4">{dorm.web}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
