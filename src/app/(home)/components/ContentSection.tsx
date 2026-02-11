"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
	BanknoteIcon,
	CalendarDaysIcon,
	ContactIcon,
	InfoIcon,
	SchoolIcon,
	SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ---------------------------------------------------------------------------
// SLIDE DATA — SECTION 1 (Info slides)
// ---------------------------------------------------------------------------

interface SlideData {
	tag: string;
	heading: string;
	subheading: string;
	body: string;
	image: string;
	imageAlt: string;
	accent: "primary" | "secondary";
}

const SLIDES: SlideData[] = [
	{
		tag: "01 — Selamat Datang",
		heading: "Universitas Darussalam Gontor",
		subheading: "Kampus Pencetak Pemimpin",
		body: "Universitas Darussalam Gontor berdiri di atas fondasi iman, ilmu, dan amal. Di sini, setiap mahasiswa ditempa menjadi insan yang berintegritas, berwawasan luas, dan siap menghadapi tantangan global.",
		image: "/galeri/gedung-terpadu.webp",
		imageAlt: "Gedung Terpadu UNIDA Gontor",
		accent: "primary",
	},
	{
		tag: "02 — Visi Kampus",
		heading: "Membangun Generasi Berkualitas",
		subheading: "Totality — Morality — Agility",
		body: "Tiga pilar utama yang menjadi landasan kehidupan kampus. Totalitas dalam berkarya, moralitas dalam berperilaku, dan kelincahan dalam beradaptasi dengan perubahan zaman.",
		image: "/galeri/pasca.webp",
		imageAlt: "Masjid Jami' Kampus Pusat",
		accent: "secondary",
	},
	{
		tag: "03 — Fasilitas",
		heading: "Sarana yang Memadai",
		subheading: "Mendukung Proses Pembelajaran",
		body: "Dari gedung perkuliahan modern hingga laboratorium lengkap, perpustakaan yang kaya koleksi, hingga fasilitas olahraga. Semua dirancang untuk menunjang proses belajar mengajar yang optimal.",
		image: "/galeri/cios.webp",
		imageAlt: "Gedung CIOS",
		accent: "primary",
	},
	{
		tag: "04 — Kehidupan Kampus",
		heading: "Pengalaman Tak Terlupakan",
		subheading: "Lebih dari Sekedar Kuliah",
		body: "Kehidupan di asrama membentuk karakter dan kemandirian. Interaksi dengan mahasiswa dari berbagai daerah memperkaya pengalaman dan memperluas perspektif.",
		image: "/galeri/taman-samping-gedung-terpadu.webp",
		imageAlt: "Taman Gedung Terpadu",
		accent: "secondary",
	},
	{
		tag: "05 — Spiritual",
		heading: "Fondasi Keimanan",
		subheading: "Ilmu dan Amal Seiring Sejalan",
		body: "Masjid menjadi pusat aktivitas spiritual kampus. Setiap hari, mahasiswa menjalankan ibadah berjamaah, mengaji, dan mendalami ilmu agama sebagai bekal utama dalam kehidupan.",
		image: "/galeri/masjid-siman.webp",
		imageAlt: "Masjid Jami' Kampus Pusat",
		accent: "primary",
	},
	{
		tag: "06 — Masa Depan",
		heading: "Langkah Menuju Masa Depan",
		subheading: "Bersama AKHYAR 2026",
		body: "OSPEK AKHYAR 2026 adalah gerbang awal perjalananmu di UNIDA Gontor. Bersiaplah untuk pengalaman yang akan mengubah hidupmu, membangun persaudaraan, dan membentuk jati diri yang sesungguhnya.",
		image: "/galeri/gedung-terpadu-air-mancur.webp",
		imageAlt: "Air Mancur Gedung Terpadu",
		accent: "secondary",
	},
];

// ---------------------------------------------------------------------------
// SLIDE DATA — SECTION 2 (Page link cards)
// ---------------------------------------------------------------------------

interface PageSlideData {
	number: string;
	title: string;
	description: string;
	href: string;
	buttonText: string;
	icon: ReactNode;
	bg: "dark" | "accent";
}

const PAGE_SLIDES: PageSlideData[] = [
	{
		number: "01",
		title: "Informasi OSPEK",
		description:
			"Semua informasi penting seputar pelaksanaan OSPEK AKHYAR 2026 mulai dari jadwal, persyaratan, hingga hal-hal yang perlu dipersiapkan.",
		href: "/informasi",
		buttonText: "Lihat Informasi",
		icon: <InfoIcon className="w-12 h-12" />,
		bg: "dark",
	},
	{
		number: "02",
		title: "Timeline Kegiatan",
		description:
			"Rangkaian acara dan jadwal kegiatan OSPEK dari hari pertama hingga akhir. Pastikan kamu tidak melewatkan satu pun.",
		href: "/timeline",
		buttonText: "Lihat Timeline",
		icon: <CalendarDaysIcon className="w-12 h-12" />,
		bg: "accent",
	},
	{
		number: "03",
		title: "Jurusan & Fakultas",
		description:
			"Daftar jurusan dan fakultas yang ada di Universitas Darussalam Gontor.",
		href: "/jurusan",
		buttonText: "Lihat Jurusan",
		icon: <SchoolIcon className="w-12 h-12" />,
		bg: "dark",
	},
	{
		number: "04",
		title: "Pembayaran",
		description:
			"Informasi terkait pembayaran dan biaya uang masuk atau daftar ulang untuk Mahasiswa Baru 2026.",
		href: "/pembayaran",
		buttonText: "Lihat Pembayaran",
		icon: <BanknoteIcon className="w-12 h-12" />,
		bg: "accent",
	},
	{
		number: "05",
		title: "Kontak",
		description:
			"Punya kendala atau pertanyaan? anda bisa menghubungi kami disini.",
		href: "/kontak",
		buttonText: "Hubungi Kami",
		icon: <ContactIcon className="w-12 h-12" />,
		bg: "dark",
	},
	{
		number: "06",
		title: "Tentang OSPEK 2026",
		description:
			"Ingin tahu lebih lanjut tentang OSPEK tahun ini? anda dapat mengetahuinya disini.",
		href: "/about",
		buttonText: "Ketahui Lebih Lanjut",
		icon: <SearchIcon className="w-12 h-12" />,
		bg: "accent",
	},
];

// ---------------------------------------------------------------------------
// INFO SLIDE (Section 1)
// ---------------------------------------------------------------------------

function InfoSlide({ data, index }: { data: SlideData; index: number }) {
	const isEven = index % 2 === 0;
	const accentColor =
		data.accent === "primary" ? "text-primary" : "text-secondary";
	const accentBg = data.accent === "primary" ? "bg-primary" : "bg-secondary";

	return (
		<div
			className="info-slide flex h-dvh w-screen shrink-0 lg:items-center overflow-hidden"
			data-index={index}
		>
			<div
				className={`mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-0 lg:flex-row lg:items-center lg:gap-16 lg:px-12 ${
					isEven ? "" : "lg:flex-row-reverse"
				}`}
			>
				{/* Image */}
				<div className="slide-image relative w-full h-full lg:max-h-full max-h-62.5 overflow-hidden rounded-sm lg:w-1/2">
					<div className="lg:aspect-square w-full h-full lg:max-h-full max-h-62.5 overflow-hidden">
						{/* biome-ignore lint/performance/noImgElement: static gallery image */}
						<img
							src={data.image}
							alt={data.imageAlt}
							className="h-full lg:max-h-full max-h-62.5 w-full object-cover"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>

				{/* Text content */}
				<div className="flex w-full flex-col gap-4 lg:w-1/2 lg:gap-6">
					<p
						className={`slide-tag font-product-sans text-xs font-bold uppercase tracking-[0.3em] ${accentColor}`}
					>
						{data.tag}
					</p>
					<h2 className="slide-heading font-mirage text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
						{data.heading}
					</h2>
					<p className="slide-subheading font-mirage text-lg font-medium tracking-tight text-foreground/60 sm:text-xl lg:text-2xl">
						{data.subheading}
					</p>
					<div className={`slide-divider h-0.5 w-12 ${accentBg}`} />
					<p className="slide-body max-w-lg font-product-sans text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">
						{data.body}
					</p>
				</div>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// PAGE LINK SLIDE (Section 2)
// ---------------------------------------------------------------------------

function PageSlide({ data, index }: { data: PageSlideData; index: number }) {
	const isDark = data.bg === "dark";

	return (
		<div
			className={`page-slide flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden ${
				isDark ? "bg-foreground" : "bg-primary"
			}`}
			data-index={index}
		>
			<div className="relative flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center lg:flex-row lg:gap-16 lg:px-12 lg:text-left">
				{/* Big number */}
				<div className="page-slide-number shrink-0">
					<span
						className={`font-perfectly-nineties text-[8rem] leading-none font-bold lg:text-[12rem] ${
							isDark ? "text-background/10" : "text-background/20"
						}`}
					>
						{data.number}
					</span>
				</div>

				{/* Content */}
				<div className="flex flex-col gap-5">
					{/* Icon */}
					<span className="page-slide-icon text-background self-center lg:self-start">
						{data.icon}
					</span>

					{/* Title */}
					<h3
						className={`page-slide-title font-mirage text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
							isDark ? "text-background" : "text-background"
						}`}
					>
						{data.title}
					</h3>

					{/* Description */}
					<p
						className={`page-slide-desc max-w-md font-product-sans text-sm leading-relaxed sm:text-base lg:text-lg ${
							isDark ? "text-background/60" : "text-background/70"
						}`}
					>
						{data.description}
					</p>

					{/* Button */}
					<div className="page-slide-btn mt-2">
						<Link
							scroll={true}
							href={data.href}
							onClick={() => window.scrollTo(0, 0)}
							className={`inline-block rounded-full px-8 py-3 font-product-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 sm:text-base ${
								isDark
									? "bg-background text-foreground hover:bg-background/90"
									: "bg-background text-primary hover:bg-background/90"
							}`}
						>
							{data.buttonText} →
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// TRANSITION SLIDE (between sections)
// ---------------------------------------------------------------------------

function TransitionSlide() {
	return (
		<div className="transition-slide flex h-screen w-screen shrink-0 items-center justify-center bg-foreground overflow-hidden">
			<div className="flex flex-col items-center gap-4 text-center px-6">
				<p className="transition-tag font-product-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-muted">
					Jelajahi Lebih
				</p>
				<h2 className="transition-heading font-mirage text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl lg:text-7xl">
					Apa Saja yang Tersedia?
				</h2>
				<div className="transition-line mt-4 h-0.5 w-0 bg-secondary" />
				<p className="transition-sub font-product-sans text-base leading-relaxed text-background/50 sm:text-lg lg:text-xl">
					Swipe terus untuk menjelajahi halaman-halaman AKHYAR 2026.
				</p>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// OUTRO (Vertical — after horizontal scroll ends)
// ---------------------------------------------------------------------------

function Outro() {
	return (
		<section className="content-outro relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden bg-foreground px-6 py-24 text-center">
			<div className="mx-auto max-w-2xl">
				<p className="outro-tag mb-4 font-product-sans text-xs font-bold uppercase tracking-[0.3em] text-primary-muted">
					AKHYAR 2026
				</p>
				<h2 className="outro-heading mb-6 font-mirage text-3xl font-bold leading-tight tracking-tight text-background sm:text-4xl lg:text-5xl">
					Siap Memulai Perjalananmu?
				</h2>
				<p className="outro-body font-product-sans text-base leading-relaxed text-background/60 sm:text-lg">
					Mari bersama-sama menulis cerita baru di Universitas Darussalam
					Gontor.
				</p>
			</div>
		</section>
	);
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export function ContentSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const horizontalRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const track = horizontalRef.current;
			const wrapper = sectionRef.current;
			if (!track || !wrapper) return;

			const splitInstances: SplitText[] = [];
			const splitWords = (element: Element | null) => {
				if (!element) return null;
				const split = new SplitText(element, {
					type: "words",
					wordsClass: "split-word",
				});
				splitInstances.push(split);
				return split.words;
			};

			const panelCount = track.querySelectorAll(
				".info-slide, .transition-slide, .page-slide",
			).length;
			const getScrollDistance = () => (panelCount - 1) * window.innerWidth;

			// Pin the wrapper and scroll the track horizontally.
			// The wrapper is a simple h-screen div — GSAP pins it
			// and adds pinSpacing automatically so the Outro flows
			// right after without gaps.
			const horizontalTween = gsap.to(track, {
				x: () => -getScrollDistance(),
				ease: "none",
				scrollTrigger: {
					trigger: wrapper,
					start: "top top",
					end: () => `+=${getScrollDistance()}`,
					scrub: 1,
					pin: true,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					// Crucial: Calculate this trigger AFTER the Hero section (priority 0)
					// creates its pin-spacing, so we know the correct start position.
					refreshPriority: -1,
				},
			});

			// ----- INFO SLIDE ANIMATIONS (Section 1) -----
			const infoSlides = gsap.utils.toArray<HTMLElement>(".info-slide");
			infoSlides.forEach((slide, i) => {
				const image = slide.querySelector(".slide-image");
				const tag = slide.querySelector(".slide-tag");
				const headingWords = splitWords(slide.querySelector(".slide-heading"));
				const subheadingWords = splitWords(
					slide.querySelector(".slide-subheading"),
				);
				const divider = slide.querySelector(".slide-divider");
				const bodyWords = splitWords(slide.querySelector(".slide-body"));

				// SLIDE 1: Animate on vertical scroll (before pinning)
				// SLIDE 2+: Animate on horizontal scroll (during pinning)
				const isFirst = i === 0;

				const tl = gsap.timeline({
					scrollTrigger: isFirst
						? {
								trigger: slide,
								start: "top 80%", // Vertical trigger for first slide
								end: "top 20%",
								toggleActions: "play none none reverse",
							}
						: {
								trigger: slide,
								start: "left 90%", // Horizontal trigger for others
								end: "left 20%",
								toggleActions: "play none none reverse",
								containerAnimation: horizontalTween,
							},
				});

				if (image) {
					tl.fromTo(
						image,
						{ clipPath: "inset(0 100% 0 0)", x: 60 },
						{
							clipPath: "inset(0 0% 0 0)",
							x: 0,
							duration: 1,
							ease: "power3.out",
						},
						0,
					);
				}

				if (tag) {
					tl.fromTo(
						tag,
						{ autoAlpha: 0, x: 40 },
						{ autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" },
						0.2,
					);
				}

				if (headingWords && headingWords.length > 0) {
					tl.fromTo(
						headingWords,
						{ y: "100%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.6,
							stagger: 0.04,
							ease: "power3.out",
						},
						0.3,
					);
				}

				if (subheadingWords && subheadingWords.length > 0) {
					tl.fromTo(
						subheadingWords,
						{ y: "100%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.5,
							stagger: 0.03,
							ease: "power2.out",
						},
						0.5,
					);
				}

				if (divider) {
					tl.fromTo(
						divider,
						{ scaleX: 0, transformOrigin: "left" },
						{ scaleX: 1, duration: 0.6, ease: "power2.out" },
						0.6,
					);
				}

				if (bodyWords && bodyWords.length > 0) {
					tl.fromTo(
						bodyWords,
						{ y: "60%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.4,
							stagger: 0.015,
							ease: "power2.out",
						},
						0.7,
					);
				}
			});

			// ----- TRANSITION SLIDE ANIMATION -----
			const transSlide =
				containerRef.current?.querySelector(".transition-slide");
			if (transSlide) {
				const transTag = transSlide.querySelector(".transition-tag");
				const transHeadingWords = splitWords(
					transSlide.querySelector(".transition-heading"),
				);
				const transLine = transSlide.querySelector(".transition-line");
				const transSubWords = splitWords(
					transSlide.querySelector(".transition-sub"),
				);

				const transTl = gsap.timeline({
					scrollTrigger: {
						trigger: transSlide,
						start: "left 70%",
						end: "left 20%",
						toggleActions: "play none none reverse",
						containerAnimation: horizontalTween,
					},
				});

				if (transTag) {
					transTl.fromTo(
						transTag,
						{ autoAlpha: 0, y: 30 },
						{ autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
						0,
					);
				}

				if (transHeadingWords && transHeadingWords.length > 0) {
					transTl.fromTo(
						transHeadingWords,
						{ y: "120%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.8,
							stagger: 0.05,
							ease: "power3.out",
						},
						0.15,
					);
				}

				if (transLine) {
					transTl.to(
						transLine,
						{ width: "6rem", duration: 0.8, ease: "power2.out" },
						0.5,
					);
				}

				if (transSubWords && transSubWords.length > 0) {
					transTl.fromTo(
						transSubWords,
						{ y: "80%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.5,
							stagger: 0.02,
							ease: "power2.out",
						},
						0.7,
					);
				}
			}

			// ----- PAGE SLIDE ANIMATIONS (Section 2) -----
			const pageSlides = gsap.utils.toArray<HTMLElement>(".page-slide");
			for (const slide of pageSlides) {
				const number = slide.querySelector(".page-slide-number");
				const icon = slide.querySelector(".page-slide-icon");
				const titleWords = splitWords(slide.querySelector(".page-slide-title"));
				const descWords = splitWords(slide.querySelector(".page-slide-desc"));
				const btn = slide.querySelector(".page-slide-btn");

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: slide,
						start: "left 75%",
						end: "left 25%",
						toggleActions: "play none none reverse",
						containerAnimation: horizontalTween,
					},
				});

				if (number) {
					tl.fromTo(
						number,
						{ autoAlpha: 0, scale: 0.5, x: -80 },
						{
							autoAlpha: 1,
							scale: 1,
							x: 0,
							duration: 0.8,
							ease: "power3.out",
						},
						0,
					);
				}

				if (icon) {
					tl.fromTo(
						icon,
						{ autoAlpha: 0, scale: 0, rotation: -180 },
						{
							autoAlpha: 1,
							scale: 1,
							rotation: 0,
							duration: 0.6,
							ease: "back.out(1.7)",
						},
						0.2,
					);
				}

				if (titleWords && titleWords.length > 0) {
					tl.fromTo(
						titleWords,
						{ y: "100%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.6,
							stagger: 0.05,
							ease: "power3.out",
						},
						0.3,
					);
				}

				if (descWords && descWords.length > 0) {
					tl.fromTo(
						descWords,
						{ y: "60%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.4,
							stagger: 0.015,
							ease: "power2.out",
						},
						0.5,
					);
				}

				if (btn) {
					tl.fromTo(
						btn,
						{ autoAlpha: 0, y: 30 },
						{ autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
						0.7,
					);
				}
			}

			// ----- OUTRO ANIMATION (Vertical, normal scroll) -----
			const outro = containerRef.current?.querySelector(".content-outro");
			if (outro) {
				const outroTag = outro.querySelector(".outro-tag");
				const outroHeadingWords = splitWords(
					outro.querySelector(".outro-heading"),
				);
				const outroBodyWords = splitWords(outro.querySelector(".outro-body"));

				const outroTl = gsap.timeline({
					scrollTrigger: {
						trigger: outro,
						start: "top 80%",
						end: "top 30%",
						toggleActions: "play none none reverse",
					},
				});

				if (outroTag) {
					outroTl.fromTo(
						outroTag,
						{ autoAlpha: 0, y: 20 },
						{ autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
						0,
					);
				}

				if (outroHeadingWords && outroHeadingWords.length > 0) {
					outroTl.fromTo(
						outroHeadingWords,
						{ y: "100%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.6,
							stagger: 0.04,
							ease: "power3.out",
						},
						0.2,
					);
				}

				if (outroBodyWords && outroBodyWords.length > 0) {
					outroTl.fromTo(
						outroBodyWords,
						{ y: "60%", autoAlpha: 0 },
						{
							y: "0%",
							autoAlpha: 1,
							duration: 0.4,
							stagger: 0.02,
							ease: "power2.out",
						},
						0.5,
					);
				}
			}
			return () => {
				// biome-ignore lint/suspicious/useIterableCallbackReturn: why not
				splitInstances.forEach((instance) => instance.revert());
			};
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="relative z-10 bg-background">
			{/* This wrapper gets pinned by ScrollTrigger */}
			<div ref={sectionRef} className="h-screen overflow-hidden">
				<div ref={horizontalRef} className="flex h-screen w-max bg-background">
					{/* Section 1: Info slides */}
					{SLIDES.map((slide, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static array
						<InfoSlide key={i} data={slide} index={i} />
					))}

					{/* Transition */}
					<TransitionSlide />

					{/* Section 2: Page link slides */}
					{PAGE_SLIDES.map((slide, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static array
						<PageSlide key={i} data={slide} index={i} />
					))}
				</div>
			</div>

			{/* Vertical outro (after horizontal scroll ends) */}
			<Outro />
		</div>
	);
}
