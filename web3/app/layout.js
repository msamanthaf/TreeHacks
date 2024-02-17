import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "OSINT Blockchain",
	describe:
		"Blockchain-powered web3 app for crowdsourcing (OSINT) information gathering to help solve missing person cases.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
