"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Facebook,
	Globe,
	Instagram,
	Mail,
	MapPin,
	Music2,
	Phone,
	Send,
	Youtube,
} from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FormSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const q = gsap.utils.selector(sectionRef);

			gsap.from(q(".channel-title"), {
				y: 30,
				opacity: 0,
				duration: 0.6,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
				},
			});

			gsap.from(q(".form-card"), {
				y: 40,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 60%",
				},
			});

			gsap.from(q(".info-card"), {
				x: 40,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.1,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 60%",
				},
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			id="contact-form"
			className="relative min-h-screen bg-primary py-8 flex items-center m-0"
		>
			<div className="mx-auto w-full max-w-7xl px-6 relative z-10">
				{/* Header */}
				<div className="text-center mb-12">
					
					<h2 className="channel-title font-mirage text-3xl md:text-5xl font-semibold text-white mb-3">
						Siap Membantu <span className="text-foreground">Kapan Saja</span>
					</h2>
					<p className="max-w-2xl mx-auto text-sm md:text-base text-white/70">
						Ceritakan kebutuhanmu melalui form di bawah ini. Tim kami siap
						merespon dalam 1x24 jam.
					</p>
				</div>

				{/* Form & Info Section */}
				<div className="grid lg:grid-cols-[1fr_380px] gap-6">
					{/* Form */}
					<div className="form-card rounded-2xl border border-foreground/10 bg-white/90 p-7 shadow-xl">
						<div className="mb-5">
							<h3 className="font-mirage text-2xl font-semibold text-foreground mb-1">
								Kirim Pesan
							</h3>
							<p className="text-xs text-muted-foreground">
								Ceritakan kebutuhanmu, kami akan follow up secepat mungkin.
							</p>
						</div>
						<form
							className="space-y-4"
							onSubmit={(event) => event.preventDefault()}
						>
							<div className="grid sm:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<label
										htmlFor="name"
										className="text-xs font-semibold text-foreground"
									>
										Nama Lengkap
									</label>
									<input
										id="name"
										className="w-full rounded-xl border border-foreground/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
										placeholder="Nama kamu"
										name="name"
										required
									/>
								</div>
								<div className="space-y-1.5">
									<label
										htmlFor="email"
										className="text-xs font-semibold text-foreground"
									>
										Email
									</label>
									<input
										id="email"
										className="w-full rounded-xl border border-foreground/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
										placeholder="email@contoh.com"
										name="email"
										type="email"
										required
									/>
								</div>
							</div>
							<div className="space-y-1.5">
								<label
									htmlFor="status"
									className="text-xs font-semibold text-foreground"
								>
									Status
								</label>
								<select
									id="status"
									className="w-full rounded-xl border border-foreground/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
									name="status"
									required
								>
									<option value="">Pilih Status</option>
									<option value="calon-mahasiswa">Calon Mahasiswa</option>
									<option value="wali">Wali Calon Mahasiswa</option>
								</select>
							</div>
							<div className="space-y-1.5">
								<label
									htmlFor="subject"
									className="text-xs font-semibold text-foreground"
								>
									Subjek
								</label>
								<input
									id="subject"
									className="w-full rounded-xl border border-foreground/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
									placeholder="Topik pesan kamu"
									name="subject"
									required
								/>
							</div>
							<div className="space-y-1.5">
								<label
									htmlFor="message"
									className="text-xs font-semibold text-foreground"
								>
									Pesan
								</label>
								<textarea
									id="message"
									className="w-full min-h-25 rounded-xl border border-foreground/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
									placeholder="Tulis pesan atau pertanyaanmu di sini..."
									name="message"
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
							>
								<Send className="h-4 w-4" />
								Kirim Pesan
							</button>
						</form>
					</div>

					{/* Info Sidebar */}
					<div className="space-y-4">
						{/* Map Section */}
						<div className="info-card rounded-2xl border border-foreground/10 bg-white/90 p-6 shadow-lg">
							<div className="flex gap-3 mb-4">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 shrink-0">
									<MapPin className="h-5 w-5 text-primary" />
								</div>
								<div className="min-w-0">
									<h4 className="text-sm font-bold text-foreground mb-1">
										Universitas Darussalam Gontor
									</h4>
									<p className="text-xs text-muted-foreground leading-relaxed">
										Jl. Raya Siman, Desa Siman, Kec. Siman
										<br />
										Kab. Ponorogo, Jawa Timur 63471, Indonesia
									</p>
								</div>
							</div>
							{/* Map Embed */}
							<div className="w-full h-56 rounded-xl overflow-hidden mb-3 border border-foreground/10">
								<iframe
									src="https://maps.google.com/maps?q=UNIDA%20Gontor&z=16&output=embed"
									title="Lokasi UNIDA Gontor (Google Maps)"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
							<a
								href="https://maps.google.com"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-all"
							>
								Lihat di Maps →
							</a>
						</div>

						{/* Social Media & Contact Section */}
						<div className="info-card rounded-2xl border border-foreground/10 bg-white/90 p-6 shadow-lg">
							<h4 className="text-sm font-bold text-foreground mb-4">
								Hubungi Kami
							</h4>
							<div className="space-y-3">
								<a
									href="mailto:pmb@.unida.gontor.ac.id"
									className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all group"
								>
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 shrink-0">
										<Mail className="h-4 w-4 text-white" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-xs font-semibold text-foreground">
											Email
										</p>
										<p className="text-xs text-muted-foreground truncate">
											pmb@unida.gontor.ac.id
										</p>
									</div>
								</a>

								<a
									href="tel:+6282139703726"
									className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-all group"
								>
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 shrink-0">
										<Phone className="h-4 w-4 text-white" />
									</div>
									<div className="min-w-0">
										<p className="text-xs font-semibold text-foreground">
											WhatsApp
										</p>
										<p className="text-xs text-muted-foreground">
											+62 821 3970 3726
										</p>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* Social Media Strip */}
				<div className="info-card rounded-2xl  p-2 pt-4 lg:p-6">
					<div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:py-6 md:overflow-x-auto md:no-scrollbar">
						<a
							href="https://unida.gontor.ac.id"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-blue-500 md:hover:shadow-lg md:hover:shadow-blue-500/40"
						>
							<Globe className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-blue-500" />
							<span className="hidden md:inline">unida.gontor.ac.id</span>
							<span className="md:hidden">Website</span>
						</a>
						<a
							href="https://instagram.com/unida.gontor"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-pink-500 md:hover:shadow-lg md:hover:shadow-pink-500/40"
						>
							<Instagram className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-pink-500" />
							<span className="hidden md:inline">@unida.gontor</span>
							<span className="md:hidden">IG</span>
						</a>
						<a
							href="https://instagram.com/ospekunida.gontor"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-pink-500 md:hover:shadow-lg md:hover:shadow-pink-500/40"
						>
							<Instagram className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-pink-500" />
							<span className="hidden md:inline">@ospekunida.gontor</span>
							<span className="md:hidden">OSPEK</span>
						</a>
						<a
							href="https://www.youtube.com/@unidagontortv"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-red-500 md:hover:shadow-lg md:hover:shadow-red-500/40"
						>
							<Youtube className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-red-500" />
							<span className="hidden md:inline">unidagontortv</span>
							<span className="md:hidden">YT</span>
						</a>
						<a
							href="https://www.youtube.com/@gontortv"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-red-500 md:hover:shadow-lg md:hover:shadow-red-500/40"
						>
							<Youtube className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-red-500" />
							<span className="hidden md:inline">gontortv</span>
							<span className="md:hidden">YT2</span>
						</a>
						<a
							href="https://facebook.com/UniversitasDarussalamGontor"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-blue-600 md:hover:shadow-lg md:hover:shadow-blue-600/40"
						>
							<Facebook className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-blue-600" />
							<span className="hidden md:inline">
								Universitas Darussalam Gontor
							</span>
							<span className="md:hidden">FB</span>
						</a>
						<a
							href="https://tiktok.com/@unida.gontor"
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-1 md:gap-2 shrink-0 rounded-full border border-foreground/10 bg-white px-2 md:px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 md:hover:scale-110 md:hover:border-black md:hover:shadow-lg md:hover:shadow-black/40"
						>
							<Music2 className="h-3 md:h-4 w-3 md:w-4 text-foreground transition-colors duration-300 md:group-hover:text-black" />
							<span className="hidden md:inline">@unida.gontor</span>
							<span className="md:hidden">TikTok</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
