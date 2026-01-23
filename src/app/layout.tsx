import { Bounce, ToastContainer } from "react-toastify";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
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
