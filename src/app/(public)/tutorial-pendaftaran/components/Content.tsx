"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { PanduanCard } from "./PanduanCard";
import { SupportSection } from "./SupportSection";
import { tutorialStepsData } from "./tutorialData";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Content: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const splitText = SplitText.create(".content-title", {
				type: "words, chars",
			});

			gsap.from(splitText.words, {
				y: 100,
				autoAlpha: 0,
				stagger: 0.1,
				duration: 0.8,
				ease: "expo.out",
				scrollTrigger: {
					trigger: ".tutorial-section",
					start: "top 40%",
					toggleActions: "play none none none",
				},
			});

			gsap.from(".content-subtitle", {
				y: 20,
				autoAlpha: 0,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".tutorial-section",
					start: "top 40%",
					toggleActions: "play none none none",
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<section
			ref={containerRef}
			className="flex-1 flex flex-col bg-[url('/background/white_texture.webp')] bg-cover"
		>
			<div className="tutorial-section max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="content-title font-mirage text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
						Tutorial Pendaftaran Mahasiswa Baru
					</h2>
					<p className="content-subtitle mt-6 text-slate-600 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
						Ikuti panduan ini untuk mendaftar sebagai mahasiswa UNIDA Gontor
						dengan mudah
					</p>
				</div>

				<div className="space-y-6 sm:space-y-10">
					{tutorialStepsData.map((data) => (
						<PanduanCard key={data.steps[0].step} {...data} />
					))}
				</div>

				<SupportSection />
			</div>
		</section>
	);
};
