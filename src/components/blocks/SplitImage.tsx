import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { PAGE_QUERYResult } from "../../sanity/types";
import { stegaClean } from "next-sanity";
import { components } from "../../sanity/portableTextComponent";
import { PortableText } from "next-sanity";

type SplitImageProps = Extract<
	NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
	{ _type: "splitImage" }
>;

export function SplitImage({
	title,
	testo,
	image,
	orientation,
}: SplitImageProps) {
	return (
		<section
			className="bg-ivory max-sm:p-5 p-10 mt-10 rounded-2xl flex gap-8 py-16 data-[orientation='imageRight']:flex-row-reverse max-lg:flex-col"
			data-orientation={stegaClean(orientation) || "imageLeft"}
		>
			<div className="lg:w-1/2 sm:w-full  ">
				{image ? (
					<Image
						className="rounded-xl h-auto w-full"
						src={urlFor(image).width(800).height(600).url()}
						width={800}
						height={600}
						alt=""
					/>
				) : null}
			</div>
			<div className="w-1/2 max-lg:w-full flex flex-col gap-6">
				{title && testo ? (
					<>
						<h2 className="text-3xl max-sm:text-center mx-auto md:text-5xl lg:text-6xl font-light  text-pretty max-w-3xl smof">
							{title}
						</h2>
						<div>
							<PortableText value={testo} components={components} />
						</div>
					</>
				) : null}
			</div>
		</section>
	);
}
