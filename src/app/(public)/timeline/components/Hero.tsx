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
			})
				.from(splitText.chars, {
					duration: 0.7,
					y: 100,
					stagger: 0.05,
					ease: "expo.out",
					delay: -0.5,
				})
				.from("#scroll-down", {
					autoAlpha: 0,
					ease: "power2.out",
					delay: -0.3,
				});
		},
		{ scope: sectionRef },
	);
	return (
		<section
			ref={sectionRef}
			className="h-screen bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center flex flex-col justify-center items-center gap-2"
		>
			<div className="lg:h-82.5 lg:w-50 h-75.5 w-40">
				<Image
					id="image"
					src="/logo/logo.webp"
					alt="Logo Akhyar"
					width={200}
					height={330}
				/>
			</div>
			<div className="px-2 overflow-hidden mb-3">
				<h1
					id="desc"
					className="font-mirage text-center font-semibold lg:text-6xl text-4xl"
				>
					Timeline OSPEK 2026
				</h1>
			</div>
			<div className="px-2 overflow-hidden">
				<h2 id="desc" className="text-center text-lg">
					Universitas Darussalam Gontor
				</h2>
			</div>
			<div
				id="scroll-down"
				className="absolute scale-75 md:scale-100 inset-x-0 lg:bottom-14 bottom-8 z-20 flex justify-center"
			>
				<ScrollDown />
			</div>{" "}
		</section>
	);
}
