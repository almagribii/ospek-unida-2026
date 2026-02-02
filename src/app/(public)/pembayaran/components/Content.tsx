"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
import { type PaymentItem, paymentByProdi } from "./paymentData";

gsap.registerPlugin(ScrollTrigger, SplitText);

const prodiOptions = Object.entries(paymentByProdi).map(([key, value]) => ({
	value: key,
	label: value.nama,
}));

export default function Content() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<
		"maklumat" | "mahasiswa" | "mahasiswi"
	>("maklumat");
	const [selectedProdi, setSelectedProdi] = useState<string>(
		"studi_perbandingan_agama",
	);
	const [expandedItem, setExpandedItem] = useState<string | null>(null);

	useGSAP(
		() => {
			const splitText = SplitText.create(".payment-title", {
				type: "words, chars",
			});

			gsap.from(splitText.words, {
				y: 100,
				autoAlpha: 0,
				stagger: 0.1,
				duration: 0.8,
				ease: "expo.out",
				scrollTrigger: {
					trigger: ".payment-section",
					start: "top 40%",
					toggleActions: "play none none none",
				},
			});

			// Animate subtitle text
			gsap.from(".payment-subtitle", {
				y: 20,
				autoAlpha: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".payment-section",
					start: "top 40%",
					toggleActions: "play none none none",
				},
			});

			// Animate description
			gsap.from(".payment-description", {
				y: 20,
				autoAlpha: 0,
				duration: 0.6,
				delay: 0.1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".payment-section",
					start: "top 40%",
					toggleActions: "play none none none",
				},
			});

			gsap.from(".payment-card", {
				y: 50,
				autoAlpha: 0,
				stagger: 0.08,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".payment-table",
					start: "top 55%",
					toggleActions: "play none none none",
				},
			});

			gsap.from(".rector-content", {
				y: 100,
				autoAlpha: 0,
				duration: 1,
				ease: "expo.out",
				scrollTrigger: {
					trigger: ".rector-section",
					start: "top 50%",
					toggleActions: "play none none none",
				},
			});
		},
		{ scope: containerRef },
	);

	const getCurrentProdiData = (
		gender: "mahasiswa" | "mahasiswi",
	): PaymentItem[] => {
		const prodi = paymentByProdi[selectedProdi];
		if (!prodi) return [];

		const items =
			gender === "mahasiswa" ? [...prodi.mahasiswa] : [...prodi.mahasiswi];
		return items;
	};

	const currentPaymentData =
		activeTab === "mahasiswa" || activeTab === "mahasiswi"
			? getCurrentProdiData(activeTab)
			: null;
	const currentProdiName = paymentByProdi[selectedProdi]?.nama || "";

	const calculateTotal = (items: PaymentItem[]): string => {
		if (!items || items.length === 0) return "Rp 0";
		const total = items.reduce((sum, item) => {
			const nominal = item.nominal.replace(/[^\d]/g, "");
			return sum + parseInt(nominal || "0");
		}, 0);
		return `Rp ${total.toLocaleString("id-ID")}`;
	};

	return (
		<div ref={containerRef} className="overflow-x-hidden bg-white min-h-screen">
			<section className="payment-section relative w-screen px-4 md:px-8 lg:px-16 py-16 md:py-24 text-center">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12 md:mb-16">
						<h2 className="payment-title mt-8 font-mirage text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
							Biaya Pendidikan & Daftar Ulang
						</h2>
						<p className="payment-description mt-6 text-slate-600 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
							Informasi biaya yang ringkas, transparan, dan mudah dipahami untuk
							membantu Anda menyiapkan pembiayaan studi bersama kami.
						</p>
					</div>

					<div className="tab-container flex flex-col md:flex-row gap-3 md:gap-4 justify-center mb-14">
						{/* Maklumat Tab */}
						<button
							key="maklumat"
							type="button"
							onClick={() => setActiveTab("maklumat")}
							className={`tab-btn relative px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-mirage text-sm font-semibold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
								activeTab === "maklumat"
									? "bg-primary text-white shadow-xl md:scale-105"
									: "bg-white/80 backdrop-blur text-slate-700 hover:bg-white hover:shadow-md border border-slate-600/50"
							}`}
						>
							<span className="mr-2">📋</span>
							Maklumat
						</button>

						<div className="flex gap-2 md:gap-4 justify-center">
							{(["mahasiswa", "mahasiswi"] as const).map((tab) => {
								const active = activeTab === tab;
								const icons = {
									mahasiswa: "👨",
									mahasiswi: "🧕",
								};
								return (
									<button
										key={tab}
										type="button"
										onClick={() => setActiveTab(tab)}
										className={`tab-btn relative px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-mirage text-sm font-semibold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
											active
												? "bg-primary text-white shadow-xl md:scale-105"
												: "bg-white/80 backdrop-blur text-slate-700 hover:bg-white hover:shadow-md border border-slate-600/50"
										}`}
									>
										<span className="mr-2">{icons[tab]}</span>
										{tab === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
									</button>
								);
							})}
						</div>
					</div>

					{(activeTab === "mahasiswa" || activeTab === "mahasiswi") && (
						<div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
							<label
								htmlFor="prodi-select"
								className="font-mirage text-sm md:text-base font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2"
							>
								🎓 Pilih Program Studi
							</label>
							<select
								id="prodi-select"
								value={selectedProdi}
								onChange={(e) => setSelectedProdi(e.target.value)}
								className="px-2 py-4 rounded-xl border border-slate-200 bg-white/80 backdrop-blur text-sm text-slate-700 font-mirage font-semibold uppercase tracking-wider cursor-pointer transition-all hover:border-[#3b82f6] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
							>
								{prodiOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					)}

					{activeTab === "maklumat" && (
						<div className="rector-content bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[#0E2345]/20 shadow-2xl transition-all duration-500 text-left">
							<div className="mb-8">
								<div className="flex items-center gap-3 mb-2">
									<div className="w-1 h-8 bg-[#0E2345] rounded-full"></div>
									<h3 className="font-mirage text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
										Maklumat Rektor
									</h3>
								</div>
								<p className="mt-3 text-[#4270ED] text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
									<span className="w-2 h-2 bg-[#4270ED] rounded-full"></span>
									Transparansi Penuh Pembiayaan
								</p>
							</div>

							<div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg">
								<p className="text-slate-800 font-medium text-lg">
									Assalamu'alaikum Warahmatullahi Wabarakatuh,
								</p>
								<p>
									Dengan ini kami informasikan bahwa struktur biaya pendidikan
									di Universitas Darussalam Gontor dirancang dengan cermat untuk
									memberikan kualitas pendidikan terbaik kepada semua mahasiswa.
								</p>
								<p>
									Kami berkomitmen untuk transparansi penuh dalam penggunaan
									dana pendidikan. Universitas menyediakan berbagai program
									beasiswa dan bantuan finansial.
								</p>
								<div className="bg-[#0E2345]/10 border border-[#0E2345]/30 rounded-xl p-6 my-8">
									<p className="font-semibold text-slate-900 text-lg">
										💡 Investasi dalam pendidikan adalah investasi terbaik untuk
										masa depan.
									</p>
								</div>
							</div>

							<div className="mt-10 pt-8 border-t border-[#0E2345]/20 flex items-center justify-between">
								<div>
									<p className="font-mirage font-bold text-slate-900 text-lg">
										Rektor
									</p>
									<p className="text-slate-500 text-sm mt-1">
										Universitas Darussalam Gontor
									</p>
								</div>
								<div className="text-4xl">📚</div>
							</div>
						</div>
					)}

					{(activeTab === "mahasiswa" || activeTab === "mahasiswi") &&
						currentPaymentData && (
							<div className="animate-fadeIn transition-all duration-500">
								<div className="mb-8 text-center">
									<p className="font-mirage text-xl md:text-2xl font-bold text-slate-900 uppercase tracking-widest">
										{currentProdiName}
									</p>
									<p className="text-slate-500 text-sm mt-2">
										Informasi Biaya Pendidikan Lengkap
									</p>
								</div>

								<div className="payment-table grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-12">
									{currentPaymentData.map((item, index) => (
										<button
											key={item.category}
											type="button"
											className="payment-card group relative text-left transition-all"
											onClick={() =>
												setExpandedItem(
													expandedItem === item.category ? null : item.category,
												)
											}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setExpandedItem(
														expandedItem === item.category
															? null
															: item.category,
													);
												}
											}}
										>
											<div className="relative h-full bg-white/90 backdrop-blur border border-[#0E2345]/20 rounded-xl md:rounded-2xl p-3 md:p-6 md:hover:border-[#0E2345]/40 md:hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300">
												<div className="absolute top-3 left-0 w-1 h-8 bg-[#0E2345] rounded-r-full"></div>

												<div className="flex items-start justify-between mb-3">
													<div className="flex items-center gap-3 flex-1">
														<div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-[#0E2345]/10 flex items-center justify-center font-semibold text-[#0E2345] text-xs md:text-sm">
															{index + 1}
														</div>
														<h4 className="font-mirage font-bold text-slate-900 text-xs md:text-sm line-clamp-2">
															{item.category}
														</h4>
													</div>
												</div>

												<p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-3">
													{item.description}
												</p>

												<div className="bg-[#4270ED]/10 rounded-lg p-2 md:p-3 mb-2 md:mb-3">
													<p className="text-xs text-slate-500 uppercase tracking-widest font-semibold hidden md:block">
														Nominal
													</p>
													<p className="text-sm md:text-lg font-bold text-[#4270ED] mt-0 md:mt-1">
														{item.nominal}
													</p>
												</div>

												{item.note && (
													<div
														className={`overflow-hidden transition-all duration-300 ${expandedItem === item.category ? "max-h-20" : "max-h-0"}`}
													>
														<p className="text-[#4270ED] text-xs italic pt-2 border-t border-[#4270ED]/30 mt-2">
															📌 {item.note}
														</p>
													</div>
												)}

												<div className="absolute bottom-0 right-0 w-16 h-16 bg-[#4270ED]/15 rounded-tl-2xl rounded-br-2xl pointer-events-none"></div>
											</div>
										</button>
									))}
								</div>

								<div className="bg-primary rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#0E2345]/30 mb-12">
									<div className="flex flex-col md:flex-row items-center justify-between gap-4">
										<div>
											<p className="text-white/80 text-sm font-semibold uppercase tracking-widest">
												Total Biaya Pendaftaran
											</p>
											<p className="text-3xl md:text-4xl font-bold text-white mt-2 font-mirage">
												{calculateTotal(currentPaymentData)}
											</p>
										</div>
										<div className="text-6xl">💰</div>
									</div>
								</div>

								<div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-[#0E2345]/20 shadow-xl">
									<h3 className="font-mirage text-xl md:text-2xl font-bold mb-8 uppercase tracking-wide text-slate-900 flex items-center gap-3">
										<div className="w-1 h-8 bg-[#0E2345] rounded-full"></div>
										Informasi Penting
									</h3>
									<div className="grid md:grid-cols-2 gap-6">
										{[
											{
												id: "payment",
												icon: "🏦",
												title: "Metode Pembayaran",
												desc: "Transfer bank, e-wallet, atau langsung ke bagian keuangan",
											},
											{
												id: "scholarship",
												icon: "🎓",
												title: "Program Beasiswa",
												desc: "Tersedia untuk mahasiswa berprestasi dan kurang mampu",
											},
											{
												id: "installment",
												icon: "📞",
												title: "Bantuan Cicilan",
												desc: "Hubungi bagian keuangan untuk cicilan tanpa bunga",
											},
											{
												id: "policy",
												icon: "📋",
												title: "Kebijakan Perubahan",
												desc: "Biaya dapat berubah sesuai kebijakan universitas",
											},
										].map((item) => (
											<div
												key={item.id}
												className="flex gap-4 p-4 rounded-xl bg-[#0E2345]/10 border border-[#0E2345]/20 hover:border-[#0E2345]/40 transition-all duration-300 hover:shadow-lg"
											>
												<div className="text-3xl shrink-0">{item.icon}</div>
												<div className="flex-1">
													<h4 className="font-semibold text-slate-900 mb-1">
														{item.title}
													</h4>
													<p className="text-slate-600 text-sm">{item.desc}</p>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
				</div>
			</section>
		</div>
	);
}
