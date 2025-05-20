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
					className="bg-pink-50 size-10 shadow-inner rounded-full"
				/>
			) : null}
			{speakers?.speakerName ? (
				<p className="text-base text-slate-700">{speakers.speakerName}</p>
			) : null}
		</div>
	) : null;
}
