import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";
import "../globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { Footer } from "@/components/Footer";
import { SessionGuard } from "@/components/SessionGuard";

export default async function FrontendLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionGuard>
			<section className="bg-forest min-h-screen">
				<Header />
				{children}
				<Footer />
				<SanityLive />
				{(await draftMode()).isEnabled && (
					<>
						<DisableDraftMode />
						<VisualEditing />
					</>
				)}
			</section>
		</SessionGuard>
	);
}
