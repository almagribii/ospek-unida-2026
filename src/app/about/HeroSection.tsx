"use client";

import gsap from "gsap";
import Image from "next/image";
import type React from "react";
import { useEffect, useRef } from "react";

const HeroSection: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const logoRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLImageElement>(null); 
	const subTextRef = useRef<HTMLDivElement>(null);
	const accentLineRefs = useRef<HTMLDivElement[]>([]);
	const bigFeatherLeftRef = useRef<HTMLImageElement>(null);
	const bigFeatherRightRef = useRef<HTMLImageElement>(null);
	const smallFeatherRefs = useRef<HTMLImageElement[]>([]);

	const featherSprites = [
		"/elements/Bulu Transparan Blur 1.png",
		"/elements/Bulu Transparan Blur 2.png",
		"/elements/Bulu Transparan Blur 3.png",
		"/elements/Bulu Transparan Blur 4.png",
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			gsap.set(
				[
					logoRef.current,
					textRef.current,
					subTextRef.current,
					...accentLineRefs.current,
					bigFeatherLeftRef.current,
					bigFeatherRightRef.current,
					...smallFeatherRefs.current,
				],
				{ opacity: 0 },
			);

			tl.fromTo(
				bigFeatherLeftRef.current,
				{ x: -100, y: -100, opacity: 0, scale: 0.8 },
				{ x: 0, y: 0, opacity: 1, scale: 1, duration: 1.25 },
				0.15,
			);
			tl.fromTo(
				bigFeatherRightRef.current,
				{ x: 100, y: -100, opacity: 0, scale: 0.8 },
				{ x: 0, y: 0, opacity: 1, scale: 1, duration: 1.25 },
				"<",
			); 

			tl.fromTo(
				logoRef.current,
				{ y: 50, scale: 0.7, opacity: 0 },
				{ y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
				"-=0.8",
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

			smallFeatherRefs.current.slice(0, 6).forEach((feather, index) => {
				tl.fromTo(
					feather,
					{ opacity: 0, scale: 0.6 },
					{
						opacity: 1,
						scale: 1,
						duration: 0.8,
						ease: "back.out(1.5)",
					},
					index === 0 ? "-=0.3" : "<0.1",
				);
			});

			smallFeatherRefs.current.slice(0, 6).forEach((feather, index) => {
				gsap.to(feather, {
					y: "+=" + (8 + Math.random() * 6),
					x: "+=" + (index % 2 === 0 ? 1 : -1) * (4 + Math.random() * 3),
					rotation: "+=" + (2 + Math.random() * 2),
					duration: 3 + Math.random() * 1.5,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 0.2 * index,
				});
			});

			smallFeatherRefs.current.slice(6).forEach((feather, index) => {
				gsap.from(feather, {
					x: (index % 2 === 0 ? -50 : 50) + (Math.random() * 50 - 25), 
					y: Math.random() * 100 + 50, 
					rotation: Math.random() * 90 - 45, 
					opacity: 0,
					scale: Math.random() * 0.5 + 0.5, 
					duration: 2 + Math.random() * 1, 
					delay: 2 + Math.random() * 1, 
					ease: "power1.out",
				});

				gsap.to(feather, {
					y: "+=" + (20 + Math.random() * 10), // Random floating distance
					x: "+=" + (10 + Math.random() * 5) * (index % 2 === 0 ? 1 : -1), // Slight horizontal drift
					rotation: "+=" + (10 + Math.random() * 5),
					duration: 4 + Math.random() * 2, 
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 2.5 + Math.random() * 0.5, 
				});
			});

			if (smallFeatherRefs.current.length > 6) {
				smallFeatherRefs.current.slice(6).forEach((feather) => {
					gsap.set(feather, { opacity: 1 });
				});
			}
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
			style={{
				backgroundImage: `url('/background/white_texture.webp')`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundColor: "#ffffff",
			}}
		>
			<Image
				src="/background/Gedung Terpadu Background.png"
				alt=""
				width={100}
				height={100}
				className="hidden"
				aria-hidden="true"
			/>
			<Image
				src="/background/White Texture Background.png"
				alt=""
				width={100}
				height={100}
				className="hidden"
				aria-hidden="true"
			/>
			{featherSprites.map((src) => (
				<Image
					key={src}
					src={src}
					alt=""
					width={100}
					height={100}
					className="hidden"
					aria-hidden="true"
				/>
			))}

			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-cover bg-bottom bg-no-repeat"
				style={{
					backgroundImage: "url('/background/Gedung Terpadu Background.png')",
					maskImage:
						"linear-gradient(to top, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 100%)",
					WebkitMaskImage:
						"linear-gradient(to top, rgba(0,0,0,1) 52%, rgba(0,0,0,0) 100%)",
				}}
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-white/80 via-white/35 to-transparent blur-[1px] z-10" />

			
			{/* Big Feathers */}
			<Image
				ref={bigFeatherLeftRef}
				src="/logo/Bulu Transparan.png"
				alt="decorative feather"
				width={100}
				height={100}
				className="absolute top-0 left-0 w-40 h-auto z-20 object-contain drop-shadow-lg opacity-0"
			/>
			<Image
				ref={bigFeatherRightRef}
				src="/logo/Bulu Transparan.png"
				alt="decorative feather"
				width={100}
				height={100}
				className="absolute top-0 right-0 w-40 h-auto z-20 object-contain drop-shadow-lg opacity-0"
			/>

			{/* Main Content */}
			<div className="z-30 flex flex-col items-center p-4">
				{/* Logo */}
				<Image
					ref={logoRef}
					src="/logo/logo.png"
					alt="Akhyar Logo"
					width={100}
					height={100}
					className="w-40 lg:w-60 h-auto mb-8 drop-shadow-xl opacity-0"
				/>
				Tentang Akhyar
		

				{/* Triple Line Accent */}
				<div className="flex space-x-2 my-4 w-64 h-2">
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-red-600 rounded-full shadow-md opacity-0"
					></div>
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-green-700 rounded-full shadow-md opacity-0"
					></div>
					<div
						ref={addAccentLineRef}
						className="flex-1 bg-gray-600 rounded-full shadow-md opacity-0"
					></div>
				</div>

				<div ref={subTextRef} className="text-center mt-6 opacity-0">
					<p className="text-xl md:text-2xl font-bold text-gray-800 tracking-widest uppercase">
						OSPEK UNIDA GONTOR 2026
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
