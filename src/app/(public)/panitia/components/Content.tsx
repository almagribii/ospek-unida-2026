"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Content() {
	const containerRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const splitText = SplitText.create("#title", {
				type: "words",
			});

			gsap.from(splitText.words, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
				y: 100,
				stagger: 0.1,
				ease: "expo.out",
				duration: 1,
			});
		},
		{ scope: containerRef },
	);

	return (
		<section ref={containerRef} className="relative w-full h-full">
			{/* Background top */}
			<div className="h-screen w-screen absolute -z-10 top-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"></div>

			{/* Text Top */}
			<div className="flex justify-center items-center px-4 py-2 overflow-hidden">
				<h1
					id="title"
					className="text-4xl font-mirage font-medium text-center mt-30"
				>
					Struktur Panitia OSPEK 2026
				</h1>
			</div>
		</section>
	);
}
