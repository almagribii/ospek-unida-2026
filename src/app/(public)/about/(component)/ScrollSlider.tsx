"use client";

// proggres bottom
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
		const onLenisScroll = () => ScrollTrigger.update();
		lenis.on("scroll", onLenisScroll);

		const onTick = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(onTick);

		const totalSlides = SLIDE_COMPONENTS.length;
		const isMobile = window.innerWidth < 768;
		const pinDistance = window.innerHeight * totalSlides * (isMobile ? 2 : 0.8);

		const ctx = gsap.context(() => {
			const trigger = ScrollTrigger.create({
				trigger: containerRef.current,
				start: "top top",
				end: () => `+=${pinDistance}`,
				scrub: isMobile ? 1.5 : 0.5,
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
			// Prevent runaway tickers/listeners when navigating away or during HMR.
			gsap.ticker.remove(onTick);
			lenis.off("scroll", onLenisScroll);

			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;

			ctx.revert();
			lenis.destroy();
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

	return (
		<section
			ref={containerRef}
			className="relative h-svh w-full overflow-hidden "
		>
			{/* Render Slide Components menggunakan ID unik sebagai key */}
			<div className="absolute inset-0 z-0">
				{SLIDE_COMPONENTS.map(({ id, Component }, i) => (
					<div
						key={id}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							activeSlide === i
								? "opacity-100 z-10 pointer-events-auto"
								: "opacity-0 z-0 pointer-events-none"
						}`}
					>
						<Component isActive={activeSlide === i} />
					</div>
				))}
			</div>

			{/* Horizontal Progress Bar at Bottom */}
			<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full px-8 sm:px-12 md:px-16 lg:px-20 flex items-center justify-center z-30">
				<div className="flex gap-1 sm:gap-1.5 md:gap-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
					{SLIDE_COMPONENTS.map(({ id }, i) => (
						<button
							key={`progress-${id}`}
							onClick={() => handleSlideClick(i)}
							type="button"
							className="flex-1 h-0.5 sm:h-0.75 bg-gray-300 transition-all duration-300 cursor-pointer hover:bg-gray-400 relative overflow-hidden group"
						>
							<div
								className={`absolute inset-0 bg-gray-800 transition-all duration-300 origin-left ${
									i < activeSlide
										? "scale-x-100"
										: i === activeSlide
											? "scale-x-100"
											: "scale-x-0"
								}`}
							/>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
