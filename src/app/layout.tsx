import { NavbarProvider } from "@/context/NavbarContext";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const nonEmpty = (value: string | undefined) => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : undefined;
};

const withProtocol = (value: string) =>
	value.startsWith("http://") || value.startsWith("https://")
		? value
		: `https://${value}`;

const resolvedBaseUrl: string | undefined =
	nonEmpty(process.env.BASE_URL) ??
	nonEmpty(process.env.NEXT_PUBLIC_SITE_URL) ??
	(nonEmpty(process.env.VERCEL_URL)
		? `https://${nonEmpty(process.env.VERCEL_URL)}`
		: undefined);

const metadataBase = new URL(
	withProtocol(resolvedBaseUrl ?? "http://localhost:3000"),
);

export const metadata = {
	title: {
		default: "Akhyar - OSPEK UNIDA Gontor 2026",
		template: "%s | Akhyar OSPEK UNIDA Gontor 2026",
	},
	description:
		"OSPEK Akhyar 2026 adalah orientasi kampus Universitas Darussalam Gontor. Temukan info jadwal, kegiatan, dan tata cara OSPEK 2026 di sini.",
	applicationName: "Akhyar",
	authors: [{ name: "UNIDA Gontor", url: "https://unida.gontor.ac.id" }],
	metadataBase,
	openGraph: {
		title: "Akhyar - OSPEK UNIDA Gontor 2026 ",
		description: "The official Akhyar Website,",
		url: metadataBase,
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
					<Footer />
				</NavbarProvider>
			</body>
		</html>
	);
}
