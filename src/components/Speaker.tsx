import { EVENT_QUERYResult } from "../sanity/sanity.types";
import { urlFor } from "../sanity/lib/image";
import Image from "next/image";

// type SpeakerProps = {
// 	speaker: NonNullable<EVENT_QUERYResult>["speakers"];
// };

// export function Speaker({ speaker }: SpeakerProps) {
// 	return speaker?.speakerImage || speaker?.speakerName ? (
// 		<div className="flex items-center gap-2">
// 			{speaker?.speakerImage ? (
// 				<Image
// 					src={urlFor(speaker.speakerImage).width(80).height(80).url()}
// 					width={80}
// 					height={80}
// 					alt={speaker.speakerName || ""}
// 					className=" size-10 shadow-inner rounded-full"
// 				/>
// 			) : null}
// 			{speaker?.speakerName ? (
// 				<p className="text-sm sm:text-base text-chocolate font-semibold">
// 					{speaker.speakerName}
// 				</p>
// 			) : null}
// 		</div>
// 	) : null;
// }
