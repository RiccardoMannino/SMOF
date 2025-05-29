import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";
import "../globals.css";
import { SanityLive } from "@/sanity/lib/live";

export default async function FrontendLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="bg-white min-h-screen">
			<Header />
			{children}
			<SanityLive />
			{(await draftMode()).isEnabled && (
				<>
					<DisableDraftMode />
					<VisualEditing />
				</>
			)}
		</section>
	);
}
