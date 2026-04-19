import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "./lib/image";

export const components: PortableTextComponents = {
	types: {
		image: (props) =>
			props.value ? (
				<Image
					className="rounded-lg w-full h-auto object-cover "
					src={urlFor(props.value)
						.width(600)
						.height(400)
						.format("webp")
						.quality(70)
						.url()}
					alt={props?.value?.alt || ""}
					width={600}
					height={400}
				/>
			) : null,
	},
};
