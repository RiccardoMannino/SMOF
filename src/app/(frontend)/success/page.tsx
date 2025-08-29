// /app/(frontend)/success/page.tsx
import { getQueryClient } from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { success } from "@/lib/success";
import Success from "./success";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const queryClient = getQueryClient();
	const sessionId = (await searchParams).session_id;

	await queryClient.prefetchQuery({
		queryKey: ["session", sessionId],
		queryFn: () => success(sessionId),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Success sessionId={sessionId} />
		</HydrationBoundary>
	);
}
