import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Header } from "@/components/Header";
import "../globals.css";
import { SanityLive } from "../../sanity/lib/live";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "react-toastify";
// import { SessionGuard } from "@/components/SessionGuard";

export default async function FrontendLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <SessionGuard>
		<>
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
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				draggable={false}
				pauseOnHover
				theme="light"
			/>
		</>
		// </SessionGuard>
	);
}
