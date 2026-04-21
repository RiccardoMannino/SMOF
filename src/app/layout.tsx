import { ToastContainer } from "react-toastify";
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
			title="SMOF - Il festival dell'outdoor Siciliano"
		>
			<body>
				<Providers>{children}</Providers>
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
			</body>
		</html>
	);
}
