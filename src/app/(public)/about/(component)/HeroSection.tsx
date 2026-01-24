"use client";

import gsap from "gsap";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef } from "react";
import { ScrollDown } from "@/app/(home)/components/ScrollDown";
import { Background } from "./Background";

const HeroSection: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const subTextRef = useRef<HTMLDivElement>(null);
	const accentLineRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			gsap.set(
				[
					logoRef.current,
					textRef.current,
					subTextRef.current,
					...accentLineRefs.current,
				],
				{ opacity: 0 },
			);

			tl.fromTo(
				logoRef.current,
				{ y: 50, scale: 0.7, opacity: 0 },
				{ y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
				0.3,
			);

			tl.fromTo(
				textRef.current,
				{ y: 30, opacity: 0, scale: 0.8 },
				{ y: 0, opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
				"-=0.5",
			);

			tl.fromTo(
				accentLineRefs.current,
				{ scaleX: 0, opacity: 0 },
				{
					scaleX: 1,
					opacity: 1,
					duration: 0.8,
					stagger: 0.2,
					ease: "power2.out",
					transformOrigin: "left center",
				},
				"-=0.7",
			);

			tl.fromTo(
				subTextRef.current,
				{ y: 20, opacity: 0, letterSpacing: "10px" },
				{
					y: 0,
					opacity: 1,
					letterSpacing: "2px",
					duration: 1.2,
					ease: "power2.out",
				},
				"-=0.6",
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	const addAccentLineRef = (el: HTMLDivElement | null) => {
		if (el && !accentLineRefs.current.includes(el)) {
			accentLineRefs.current.push(el);
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
		>
			<Background isActive={isActive} />

			<div className="z-30 flex flex-col items-center p-4 font-mirage">
				{/* Logo */}
				<Image
					ref={logoRef}
					src="/logo/logo.webp"
					alt="Akhyar Logo"
					width={200}
					height={200}
					className="w-40 lg:w-60 h-auto mb-8 drop-shadow-xl opacity-0"
				/>

				{/* Text */}
				<div ref={textRef} className="opacity-0">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
						Tentang Akhyar
					</h1>
				</div>

				{/* Triple Line Accent */}
				<div className="flex space-x-2 my-4 w-64 h-2">
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-red-600 rounded-full shadow-md opacity-0"
					/>
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-green-700 rounded-full shadow-md opacity-0"
					/>
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-gray-600 rounded-full shadow-md opacity-0"
					/>
				</div>

				<div ref={subTextRef} className="text-center mt-6 opacity-0">
					<p className="text-xl md:text-2xl font-bold text-gray-800 tracking-widest uppercase font-product-sans">
						OSPEK UNIDA GONTOR 2026
					</p>
				</div>
				<div className="scroll-down-animate absolute inset-x-0 bottom-14 z-20 flex justify-center pb-20 lg:pb-12">
					<ScrollDown />
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
