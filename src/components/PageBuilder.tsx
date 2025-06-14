"use client";

import { Hero } from "@/components/blocks/Hero";
import { Features } from "@/components/blocks/Features";
import { SplitImage } from "@/components/blocks/SplitImage";
import { FAQs } from "@/components/blocks/FAQs";
import { PAGE_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import { Staff } from "@/components/blocks/Staff";

type PageBuilderProps = {
	content: NonNullable<PAGE_QUERYResult>["content"];
	documentId: string;
	documentType: string;
	className?: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
	projectId,
	dataset,
	baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function PageBuilder({
	content,
	documentId,
	documentType,
	className,
}: PageBuilderProps) {
	const blocks = useOptimistic<
		NonNullable<PAGE_QUERYResult>["content"] | undefined,
		NonNullable<PAGE_QUERYResult>
	>(content, (state, action) => {
		if (action.id === documentId) {
			return action?.document?.content?.map(
				(block) => state?.find((s) => s._key === block?._key) || block
			);
		}
		return state;
	});

	if (!Array.isArray(blocks)) {
		return null;
	}

	return (
		<section
			data-sanity={createDataAttribute({
				...createDataAttributeConfig,
				id: documentId,
				type: documentType,
				path: "content",
			}).toString()}
			className={className}
		>
			{blocks.map((block) => {
				const DragHandle = ({ children }: { children: React.ReactNode }) => (
					<div
						data-sanity={createDataAttribute({
							...createDataAttributeConfig,
							id: documentId,
							type: documentType,
							path: `content[_key=="${block._key}"]`,
						}).toString()}
						className={`${block._type === "staff" ? "grid grid-flow-col" : ""}`}
					>
						{children}
					</div>
				);

				switch (block._type) {
					case "hero":
						return (
							<DragHandle key={block._key}>
								<Hero {...block} />
							</DragHandle>
						);
					case "features":
						return (
							<DragHandle key={block._key}>
								<Features {...block} />
							</DragHandle>
						);
					case "splitImage":
						return (
							<DragHandle key={block._key}>
								<SplitImage {...block} />
							</DragHandle>
						);
					case "faqs":
						return (
							<DragHandle key={block._key}>
								<FAQs {...block} />
							</DragHandle>
						);
					case "staff":
						return (
							<DragHandle key={block._key}>
								<Staff {...block} />
							</DragHandle>
						);
					default:
						return <div>Blocco non trovato</div>;
				}
			})}
		</section>
	);
}
