"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import LogoSvg from "@/components/LogoSvg";

interface PreloaderProps {
	onComplete?: () => void;
	shouldFinish?: boolean;
}

// Color stages adapted to your palette
const colorStages = [
	// Stage 1: Default (Light Grey / Dark Blue)
	{ bg: "#f3f3f3", text: "#0e2345" },
	// Stage 2: Inverted (Dark Blue / Light Grey)
	{ bg: "#67bbf7", text: "#d9b068" },
	// Stage 3: Primary Pop (Blue / White)
	{ bg: "#4270ed", text: "#ffe9c3" },
	// Stage 4: Secondary Warmth (Orange / Dark Blue)
	{ bg: "#0e2345", text: "#f3f3f3" },
];

export default function Preloader({
	onComplete,
	shouldFinish,
}: PreloaderProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const logoFillRef = useRef<HTMLDivElement>(null);
	const percentageRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	// --------------------------------------------------------
	// 1. HELPER: Split Text Component
	// (Replaces SplitType to avoid React Hydration errors)
	// --------------------------------------------------------
	const SplitText = ({ text }: { text: string }) => (
		<>
			{text.split("").map((char, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: nizom aneh
					key={index}
					className="char inline-block" // "char" class for GSAP targeting
				>
					{char === " " ? "\u00A0" : char}
				</span>
			))}
		</>
	);

	// --------------------------------------------------------
	// 2. ANIMATION LOGIC
	// --------------------------------------------------------
	useGSAP(
		() => {
			const q = gsap.utils.selector(containerRef);

			const tl = gsap.timeline({
				paused: true,
				onComplete: () => {
					// Trigger the exit sequence when bar hits 100%
					exitAnimation();
				},
			});

			timelineRef.current = tl;

			// Initial logo fill state (hidden)
			gsap.set(logoFillRef.current, {
				clipPath: "inset(100% 0% 0% 0%)",
			});

			// Initial Text Reveal
			gsap.set(q(".loading-text-container .char"), { y: 100, opacity: 0 });
			gsap.to(q(".loading-text-container .char"), {
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
				ease: "power2.out",
			});

			// Main Progress Bar Animation
			tl.to(logoFillRef.current, {
				clipPath: "inset(0% 0% 0% 0%)",
				duration: 5, // Base duration (will speed up when assets load)
				ease: "power1.inOut",
				onUpdate: function () {
					const progress = Math.round(this.progress() * 100);

					// Update Number
					if (percentageRef.current) {
						percentageRef.current.textContent = `${progress}`;
					}

					// Color Switching Logic
					const stage = Math.floor(progress / 25);
					if (stage < colorStages.length && containerRef.current) {
						const colors = colorStages[stage];

						// Animate Background
						gsap.to(containerRef.current, {
							backgroundColor: colors.bg,
							duration: 0.2,
							overwrite: "auto",
						});

						// Animate Text Elements (Logo, Percentage, Loading Text)
						gsap.to([q(".preloader-logo"), percentageRef.current, q(".char")], {
							color: colors.text,
							duration: 0.2,
							overwrite: "auto",
						});
					}
				},
			});

			tl.play();
		},
		{ scope: containerRef },
	);

	// Allow parent to force early finish (e.g. assets loaded)
	useEffect(() => {
		if (!shouldFinish) return;
		// Speed up the remaining progress, but still let the animation complete naturally.
		timelineRef.current?.timeScale(5);
	}, [shouldFinish]);

	// --------------------------------------------------------
	// 3. ASSET LOADING SIMULATION
	// --------------------------------------------------------
	useEffect(() => {
		const handleLoad = () => {
			// If the timeline exists, accelerate it to completion
			// This ensures the user sees the animation finish smoothly,
			// but doesn't wait the full 5 seconds if their internet is fast.
			if (timelineRef.current) {
				timelineRef.current.timeScale(2.5);
			}
		};

		if (document.readyState === "complete") {
			handleLoad();
		} else {
			window.addEventListener("load", handleLoad);
			return () => window.removeEventListener("load", handleLoad);
		}
	}, []);

	// --------------------------------------------------------
	// 4. EXIT SEQUENCE
	// --------------------------------------------------------
	const exitAnimation = () => {
		if (!containerRef.current) return;

		const tl = gsap.timeline();

		tl.to(".loading-text-initial", {
			y: "-100%",
			duration: 0.5,
			ease: "power2.inOut",
		})
			.to(
				".loading-text-complete",
				{
					y: "0%", // Slide "Complete" in from bottom
					duration: 0.5,
					ease: "power2.inOut",
				},
				"<",
			)
			.to(
				".complete-char",
				{
					opacity: 1,
					y: 0,
					duration: 0.3,
					stagger: 0.03,
					ease: "power2.out",
				},
				"<0.2",
			)
			.to(containerRef.current, {
				y: "-100vh",
				duration: 1,
				ease: "power2.inOut",
				delay: 0.8, // Slight pause to read "Complete"
				onComplete: () => {
					if (onComplete) onComplete();
				},
			});
	};

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
		>
			{/* Logo Fill Progress */}
			<div className="relative z-10 mb-6 w-28 md:w-36 preloader-logo">
				<div className="opacity-20 h-full">
					<LogoSvg />
				</div>
				<div
					ref={logoFillRef}
					className="absolute inset-0 will-change-[clip-path]"
					style={{ clipPath: "inset(100% 0% 0% 0%)" }}
				>
					<LogoSvg />
				</div>
			</div>

			{/* Text Container */}
			<div className="relative h-[3em] w-50 overflow-hidden text-center font-product-sans font-light uppercase tracking-tight">
				{/* 'Loading' Text */}
				<div className="loading-text-initial loading-text-container absolute w-full translate-y-0 text-base">
					<SplitText text="Loading" />
				</div>

				{/* 'Complete' Text */}
				<div className="loading-text-complete absolute w-full translate-y-full text-base">
					{/* We duplicate logic manually for 'Complete' to target specific chars differently if needed */}
					{"Complete".split("").map((char, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: nizom aneh
							key={i}
							className="char complete-char inline-block translate-y-full opacity-0"
						>
							{char}
						</span>
					))}
				</div>
			</div>

			{/* Big Percentage Background */}
			<div
				ref={percentageRef}
				className="pointer-events-none fixed bottom-8 right-8 font-perfectly-nineties text-[12rem] md:text-[25rem] font-bold leading-[0.8] text-foreground opacity-75"
			>
				0
			</div>
		</div>
	);
}
