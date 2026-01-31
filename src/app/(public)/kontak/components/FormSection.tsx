"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, Send, Sparkles } from "lucide-react";
import { useRef } from "react";

const OPERASIONAL = [
	{ day: "Senin - Jumat", time: "08.00 - 20.00" },
	{ day: "Sabtu", time: "09.00 - 17.00" },
	{ day: "Minggu", time: "Emergency Only" },
];

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
			className="relative min-h-screen bg-[#0e2345] py-6 md:py-16 flex items-center m-0"
		>
			<div className="mx-auto w-full max-w-7xl px-6 relative z-10">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
						<Sparkles className="h-4 w-4" />
						<span className="font-product-sans">Hubungi Kami</span>
					</div>
					<h2 className="channel-title font-mirage text-3xl md:text-5xl font-semibold text-white mb-3">
						Siap Membantu <span className="text-primary">Kapan Saja</span>
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
								className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
							>
								<Send className="h-4 w-4" />
								Kirim Pesan
							</button>
						</form>
					</div>

					{/* Info Sidebar */}
					<div className="space-y-4">
						<div className="info-card rounded-2xl border border-foreground/10 bg-white/90 p-6 shadow-lg">
							<div className="flex gap-3 mb-4">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 shrink-0">
									<MapPin className="h-5 w-5 text-primary" />
								</div>
								<div className="min-w-0">
									<h4 className="text-sm font-bold text-foreground mb-1">
										Sekretariat
									</h4>
									<p className="text-xs text-muted-foreground leading-relaxed">
										Kampus Pusat UNIDA Gontor
										<br />
										Siman, Ponorogo
									</p>
								</div>
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

						<div className="info-card rounded-2xl border border-foreground/10 bg-white/90 p-6 shadow-lg">
							<div className="flex gap-3 mb-4">
								<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 shrink-0">
									<Clock className="h-5 w-5 text-secondary" />
								</div>
								<div>
									<h4 className="text-sm font-bold text-foreground mb-1">
										Jam Operasional
									</h4>
									<p className="text-xs text-muted-foreground">
										Waktu layanan kami
									</p>
								</div>
							</div>
							<ul className="space-y-2">
								{OPERASIONAL.map((item) => (
									<li
										key={item.day}
										className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2"
									>
										<span className="text-muted-foreground">{item.day}</span>
										<span className="font-bold text-foreground">
											{item.time}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
