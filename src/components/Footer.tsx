"use client";

import { Globe, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import LogoSvg from "@/components/LogoSvg";

const NAV_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Jurusan", href: "/jurusan" },
	{ label: "Timeline", href: "/timeline" },
	{ label: "Informasi", href: "/informasi" },
	{ label: "Pembayaran", href: "/pembayaran" },
	{ label: "Kontak", href: "/kontak" },
	{ label: "Tentang", href: "/about" },
];

const SOCIAL_LINKS = [
	{
		label: "OSPEK Instagram",
		icon: Instagram,
		href: "https://www.instagram.com/ospek.unidagontor/",
	},
	{
		label: "UNIDA Instagram",
		icon: Instagram,
		href: "https://www.instagram.com/unida.gontor/",
	},
	{
		label: "UNIDA Youtube",
		icon: Youtube,
		href: "https://www.youtube.com/@unidagontortv",
	},
	{
		label: "UNIDA Website",
		icon: Globe,
		href: "https://unida.gontor.ac.id",
	},
	{
		label: "Admisi",
		icon: Globe,
		href: "https://admisi.unida.gontor.ac.id/",
	},
];

const ADDRESS = [
	"Universitas Darussalam Gontor",
	"Jl. Raya Siman, Dusun I, Demangan",
	"Kec. Siman, Kabupaten Ponorogo",
	"Jawa Timur 63471",
];

const CONTACT = [
	{ label: "Email", value: "ospek@unida.gontor.ac.id" },
	{ label: "Email PMB", value: "pmb@unida.gontor.ac.id" },
	{ label: "Whatsapp PMB", value: "+62 821 3970 3726" },
];

export default function Footer() {
	return (
		<footer className="w-full bg-foreground text-background pt-20 pb-10 px-6 sm:px-10 lg:px-20 overflow-hidden relative font-sans -mt-10 z-50">
			<div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
				{/* Top Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
					{/* Brand & Address - Columns 1-4 */}
					<div className="lg:col-span-4 flex flex-col gap-6 lg:border-r border-b lg:border-0 border-background/10">
						<Link href="/" className="w-fit group">
							<div className="w-20 h-auto text-background group-hover:text-primary group-hover:scale-95 duration-500 transition-all">
								<LogoSvg />
							</div>
							<h2 className="font-mirage text-3xl mt-4 tracking-wide group-hover:text-primary transition-colors duration-300">
								AKHYAR
							</h2>
						</Link>
						<div className="flex flex-col gap-1 text-sm sm:text-base text-background/80 font-light leading-relaxed">
							{ADDRESS.map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
					</div>

					{/* Navigation - Columns 5-7 */}
					<div className="lg:col-span-3 flex flex-col gap-6 lg:border-r border-b lg:border-0 border-background/10">
						<h3 className="font-mirage text-xl">Sitemap</h3>
						<nav className="flex flex-col gap-3">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-background/70 hover:text-primary transition-all duration-300 w-fit hover:translate-x-1"
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Contact & Socials - Columns 8-12 */}
					<div className="lg:col-span-5 flex flex-col gap-8">
						<div className="flex flex-col gap-6">
							<h3 className="font-mirage text-xl">Hubungi Kami</h3>
							<div className="flex flex-col gap-4">
								{CONTACT.map((item) => (
									<div key={item.label} className="flex flex-col gap-1">
										<span className="text-xs uppercase tracking-wider text-background/50">
											{item.label}
										</span>
										<p className="text-lg font-medium">{item.value}</p>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-6 mt-4">
							<h3 className="font-mirage text-xl">Sosial Media</h3>
							<div className="flex flex-wrap gap-3">
								{SOCIAL_LINKS.map((social) => (
									<a
										key={social.href}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-background/20 hover:border-primary hover:bg-primary transition-all duration-300"
										aria-label={social.label}
									>
										<social.icon className="w-5 h-5 text-background group-hover:text-foreground transition-colors duration-300" />
									</a>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-background/40">
					<p>© 2026 UNIDA Gontor. All Rights Reserved.</p>
					<div className="flex items-center gap-6">
						<p>OSPEK Akhyar 2026.</p>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute right-0 top-0 py-1 w-full bg-primary" />
		</footer>
	);
}
