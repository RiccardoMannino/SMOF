import { PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export type StaffProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "staff" }
>;

export function Staff({ ...props }: StaffProps) {
	const { nome, descrizione, immagini } = props;

	return (
		<section>
			{nome} , {descrizione}
			{immagini
				? immagini?.map((image) => (
						<Image
							key={image._key}
							src={urlFor(image).width(400).height(400).url()}
							alt={`${nome}`}
							width={400}
							height={400}
							className=" rounded-3xl object-contain "
						/>
					))
				: null}
		</section>
	);
}
