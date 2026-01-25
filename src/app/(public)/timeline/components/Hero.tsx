"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import { ScrollDown } from "@/app/(home)/components/ScrollDown";

gsap.registerPlugin(SplitText);

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const splitText = SplitText.create("#desc", {
				type: "words, chars",
			});

			const tl = gsap.timeline();
			tl.from("#image", {
				autoAlpha: 0,
				duration: 1,
				ease: "power3.out",
				scale: 0.2,
				y: 100,
			}).from(splitText.chars, {
				duration: 1,
				y: 100,
				stagger: 0.05,
				ease: "expo.out",
			});
		},
		{ scope: sectionRef },
	);
	return (
		<section
			ref={sectionRef}
			className="h-screen bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center flex flex-col justify-center items-center gap-2"
		>
			<div className="h-82.5 w-50">
				<Image
					id="image"
					src="/logo/logo.webp"
					alt="Logo Akhyar"
					width={200}
					height={330}
				/>
			</div>
			<div className="max-h-[80px] px-2 overflow-hidden">
				<h1 id="desc" className="font-mirage font-semibold text-6xl">
					Timeline OSPEK
				</h1>
			</div>
			<div className="scroll-down-animate absolute inset-x-0 bottom-14 z-20 flex justify-center">
				<ScrollDown />
			</div>{" "}
		</section>
	);
}
