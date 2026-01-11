"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import Slide1 from "./(filosofi)/Slide1";
import Slide2 from "./(filosofi)/Slide2";
import Slide3 from "./(filosofi)/Slide3";
import Slide4 from "./(filosofi)/Slide4";
import Slide5 from "./(filosofi)/Slide5";
import Slide6 from "./(filosofi)/Slide6";
import Slide7 from "./(filosofi)/Slide7";
// Import komponen slide
import Hero from "./HeroSection";

// Definisikan array objek dengan ID unik (bukan cuma array komponen)
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
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		const totalSlides = SLIDE_COMPONENTS.length;
		const pinDistance = window.innerHeight * totalSlides * 1.2;

		const ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: containerRef.current,
				start: "top top",
				end: () => `+=${pinDistance}`,
				scrub: 1,
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
		});

		return () => {
			lenis.destroy();
			ctx.revert();
			for (const trigger of ScrollTrigger.getAll()) {
				trigger.kill();
			}
		};
	}, []);

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

			{/* Side Indicators */}
			<div className="absolute top-1/2 right-8 -translate-y-1/2 flex items-center gap-6 z-30">
				<div className="flex flex-col gap-4 items-end">
					{SLIDE_COMPONENTS.map(({ id }, i) => (
						<div
							key={`indicator-${id}`} // PERBAIKAN: Key unik untuk indikator
							className="flex items-center gap-4"
						>
							<div
								className={`h-px transition-all duration-500 ${
									activeSlide === i ? "w-10 opacity-100" : "w-4 opacity-30"
								}`}
							/>
							<span
								className={`font-mono text-[10px] ${
									activeSlide === i ? "opacity-100" : "opacity-30"
								}`}
							>
								{(i + 1).toString().padStart(2, "0")}
							</span>
						</div>
					))}
				</div>
				{/* Vertical Progress Bar */}
				<div className="relative w-px h-64 bg-black0">
					<div
						className="absolute top-0 -left-px w-0.75 bg-black transition-transform duration-300 origin-top"
						style={{
							height: "100%",
							transform: `scaleY(${(activeSlide + 1) / SLIDE_COMPONENTS.length})`,
						}}
					/>
				</div>
			</div>
		</section>
	);
}
