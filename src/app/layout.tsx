import { NavbarProvider } from "@/context/NavbarContext";
import "./globals.css";
import Navbar from "@/components/Navbar";

const baseUrl: string | undefined = process.env.BASE_URL;

export const metadata = {
	title: {
		default: "Akhyar - OSPEK UNIDA Gontor 2026",
		template: "%s | Akhyar OSPEK UNIDA Gontor 2026",
	},
	description:
		"OSPEK Akhyar 2026 adalah orientasi kampus Universitas Darussalam Gontor. Temukan info jadwal, kegiatan, dan tata cara OSPEK 2026 di sini.",
	applicationName: "Akhyar",
	authors: [{ name: "UNIDA Gontor", url: "https://unida.gontor.ac.id" }],
	...(baseUrl && { metadataBase: new URL(baseUrl) }),
	openGraph: {
		title: "Akhyar - OSPEK UNIDA Gontor 2026 ",
		description: "The official Akhyar Website,",
		...(baseUrl && { url: new URL(baseUrl) }),
		siteName: "Akhyar",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "Akhyar - OSPEK UNIDA Gontor 2026",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Akhyar - OSPEK UNIDA Gontor 2026",
		description: "The official Akhyar Website",
		images: ["/opengraph-image.png"],
	},
	icons: {
		icon: [
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		apple: [
			{
				url: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/apple-touch-icon",
			},
		],
	},
	manifest: "/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<NavbarProvider>
					<header>
						<Navbar />
					</header>
					{children}
				</NavbarProvider>
			</body>
		</html>
	);
}
