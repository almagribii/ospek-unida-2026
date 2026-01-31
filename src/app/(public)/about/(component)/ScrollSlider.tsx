"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Slide1 from "../(filosofi)/Slide1";
import Slide2 from "../(filosofi)/Slide2";
import Slide3 from "../(filosofi)/Slide3";
import Slide4 from "../(filosofi)/Slide4";
import Slide5 from "../(filosofi)/Slide5";
import Slide6 from "../(filosofi)/Slide6";
import Slide7 from "../(filosofi)/Slide7";
import Hero from "./HeroSection";

const SLIDE_COMPONENTS = [
	{ id: "intro-perjalanan", Component: Hero },
	{ id: "filosofi-nama-akhyar", Component: Slide1 },
	{ id: "jelajah-ruang", Component: Slide2 },
	{ id: "cahaya-jalan", Component: Slide3 },
	{ id: "ritme-tenang", Component: Slide4 },
	{ id: "jejak-tertinggal", Component: Slide5 },
	{ id: "tembus-batas", Component: Slide6 },
	{ id: "kesimpulan-akhir", Component: Slide7 },
];

export default function ScrollSlider() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lenisRef = useRef<Lenis | null>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();
		lenisRef.current = lenis;
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		const totalSlides = SLIDE_COMPONENTS.length;
		const isMobile = window.innerWidth < 768;
		const pinDistance = window.innerHeight * totalSlides * (isMobile ? 4 : 1.5);

		const ctx = gsap.context(() => {
			const trigger = ScrollTrigger.create({
				trigger: containerRef.current,
				start: "top top",
				end: () => `+=${pinDistance}`,
				scrub: isMobile ? 2.5 : 1,
				pin: true,
				onUpdate: (self) => {
					const progress = self.progress;
					const newIndex = Math.min(
						Math.floor(progress * totalSlides),
						totalSlides - 1,
					);
					setActiveSlide(newIndex);
				},
			});
			scrollTriggerRef.current = trigger;
		});

		return () => {
			lenis.destroy();
			ctx.revert();
			for (const trigger of ScrollTrigger.getAll()) {
				trigger.kill();
			}
		};
	}, []);

	const handleSlideClick = (targetIndex: number) => {
		if (!scrollTriggerRef.current || !lenisRef.current) return;

		const totalSlides = SLIDE_COMPONENTS.length;
		const targetProgress = (targetIndex + 0.5) / totalSlides;
		const scrollTrigger = scrollTriggerRef.current;
		const scrollDistance =
			scrollTrigger.start +
			(scrollTrigger.end - scrollTrigger.start) * targetProgress;

		lenisRef.current.scrollTo(scrollDistance, {
			duration: 0.8,
			easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
		});
	};

	const handleNextSlide = () => {
		const nextIndex = Math.min(activeSlide + 1, SLIDE_COMPONENTS.length - 1);
		handleSlideClick(nextIndex);
	};

	const handlePrevSlide = () => {
		const prevIndex = Math.max(activeSlide - 1, 0);
		handleSlideClick(prevIndex);
	};

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen h-svh w-full overflow-hidden bg-white"
		>
			<div className="absolute inset-0 z-0 w-full h-full">
				{SLIDE_COMPONENTS.map(({ id, Component }, i) => (
					<div
						key={id}
						className={`absolute inset-0 w-full h-full min-h-screen transition-opacity duration-1000 ${
							activeSlide === i
								? "opacity-100 z-10 pointer-events-auto"
								: "opacity-0 z-0 pointer-events-none"
						}`}
					>
						<Component isActive={activeSlide === i} />
					</div>
				))}
			</div>

			<div
				className={`${activeSlide === 0 ? "hidden" : "hidden md:flex"} absolute left-2 sm:left-3 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 gap-2 md:gap-3 lg:gap-4 z-30 flex-col`}
			>
				<button
					onClick={handlePrevSlide}
					disabled={activeSlide === 0}
					type="button"
					className="p-2 md:p-2.5 lg:p-3 rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:disabled:text-black"
					aria-label="Previous slide"
				>
					<ChevronUp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
				</button>

				<button
					onClick={handleNextSlide}
					disabled={activeSlide === SLIDE_COMPONENTS.length - 1}
					type="button"
					className="p-2 md:p-2.5 lg:p-3 rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:disabled:text-black"
					aria-label="Next slide"
				>
					<ChevronDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
				</button>
			</div>

			<div
				className={`${activeSlide === 0 ? "hidden" : "flex"} absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 md:right-6 lg:right-8 z-30 items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-6`}
			>
				{/* Indicators */}
				<div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 items-end">
					{SLIDE_COMPONENTS.map(({ id }, i) => (
						<button
							key={`indicator-${id}`}
							onClick={() => handleSlideClick(i)}
							type="button"
							className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 cursor-pointer transition-all group lg:hover:scale-105"
						>
							<div
								className={`h-px bg-black transition-all duration-300 lg:group-hover:bg-gray-900 lg:group-hover:w-6 sm:lg:group-hover:w-8 md:lg:group-hover:w-10 ${
									activeSlide === i
										? "w-4 sm:w-6 md:w-8 lg:w-10 opacity-100"
										: "w-1.5 sm:w-2 md:w-3 lg:w-4 opacity-30"
								}`}
							/>
							<span
								className={`font-mono text-[8px] sm:text-[9px] md:text-[10px] text-black transition-all duration-300 lg:group-hover:opacity-100 lg:group-hover:scale-110 ${
									activeSlide === i ? "opacity-100" : "opacity-30"
								}`}
							>
								{(i + 1).toString().padStart(2, "0")}
							</span>
						</button>
					))}
				</div>
				{/* Vertical Progress Bar */}
				<div className="relative w-px h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-900">
					<div
						className="absolute top-0 left-0 w-px bg-gray-600 transition-transform duration-300 origin-top"
						style={{
							height: "100%",
							transform: `scaleY(${(activeSlide + 1) / SLIDE_COMPONENTS.length})`,
						}}
					/>
				</div>
			</div>

			<div
				className={`${activeSlide === 0 ? "hidden" : "flex md:hidden"} absolute bottom-20 left-1/2 -translate-x-1/2 items-center gap-3 z-30`}
			>
				<button
					onClick={handlePrevSlide}
					disabled={activeSlide === 0}
					type="button"
					className="p-2 sm:p-2.5 rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:disabled:text-black"
					aria-label="Previous slide"
				>
					<ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
				</button>

				<div className="px-4 py-1 text-center">
					<span className="font-mono text-sm text-black">
						{(activeSlide + 1).toString().padStart(2, "0")} /{" "}
						{SLIDE_COMPONENTS.length.toString().padStart(2, "0")}
					</span>
				</div>

				<button
					onClick={handleNextSlide}
					disabled={activeSlide === SLIDE_COMPONENTS.length - 1}
					type="button"
					className="p-2 sm:p-2.5 rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:disabled:bg-transparent hover:disabled:text-black"
					aria-label="Next slide"
				>
					<ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
				</button>
			</div>
		</section>
	);
}
