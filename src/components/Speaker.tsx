import { EVENT_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type SpeakerProps = {
	speakers: NonNullable<EVENT_QUERYResult>["speakers"];
};

export function Speaker({ speakers }: SpeakerProps) {
	return speakers?.speakerImage || speakers?.speakerName ? (
		<div className="flex items-center gap-2">
			{speakers?.speakerImage ? (
				<Image
					src={urlFor(speakers.speakerImage).width(80).height(80).url()}
					width={80}
					height={80}
					alt={speakers.speakerName || ""}
					className=" size-10 shadow-inner rounded-full"
				/>
			) : null}
			{speakers?.speakerName ? (
				<p className="text-sm sm:text-base text-chocolate font-semibold">
					{speakers.speakerName}
				</p>
			) : null}
		</div>
	) : null;
}
