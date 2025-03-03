import { Header } from './../components/Header/Header';
import { Footer } from './../components/Footer/Footer';
import { Popup } from './../components/Popup/Popup';

import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["400", "700", "900"]
});



export const metadata = {
	title: `Easy money with the MOBCASH App`,
	description: "Earn USD 20 for each USD 100 on Mostbet players' deposits and withdrawals",
	openGraph: {
		type: 'website',
		// title: '',
		// description: '',
		siteName: 'MOSTBET Agent',
		images: '/favicon.png'
	},
	alternates: {
        canonical: 'https://nextjs-mbc-agent.vercel.app/',
    }
};

export default function RootLayout({ children }) {
	function ym() {}
	function rstat() {}
	function rstat4() {}


	return (
		<html lang="en">
			<link rel="icon" href="/favicon-star.png" sizes="any" />
			<meta name="format-detection" content="telephone=no" />
			{/* <meta property="og:image" content="/favicon.png" /> */}
			{/* <link rel="canonical" href="https://nextjs-mbc-agent.vercel.app/" /> */}

			<body className={font.variable}>
				<div className="wrapper">
					<Header />
					{children}
					<Footer />
				</div>
				<Popup />
			</body>
		</html>
	);
}
