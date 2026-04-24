import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.smofest.it"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="it"
			suppressHydrationWarning={true}
			title="SMOF - Il Festival dell'Outdoor Siciliano"
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
