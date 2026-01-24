"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {
	const containerRef = useRef<HTMLElement>(null);
	const spotlightRef = useRef<HTMLElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const svgDiv = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const path = pathRef.current;
			const spotlight = spotlightRef.current;
			const svg = svgDiv.current;
			if (!path || !spotlight || !svg) return;

			const getPathLength = () => path.getTotalLength();
			gsap.set(svg, { autoAlpha: 0 });
			gsap.set(path, {
				strokeDasharray: getPathLength(),
				strokeDashoffset: getPathLength(),
			});

			const fadeTween = gsap.to(svg, {
				autoAlpha: 1,
				duration: 0.22,
				ease: "power1.out",
				scrollTrigger: {
					trigger: spotlight,
					start: "top top",
					toggleActions: "play none none reverse",
				},
			});

			const drawTween = gsap.to(path, {
				strokeDashoffset: 0,
				ease: "none",
				scrollTrigger: {
					trigger: spotlight,
					start: "top top",
					end: "bottom bottom",
					scrub: true,
					invalidateOnRefresh: true,
					onRefreshInit: () => {
						const length = getPathLength();
						gsap.set(path, {
							strokeDasharray: length,
							strokeDashoffset: length,
						});
						gsap.set(svg, { autoAlpha: 0 });
					},
				},
			});

			// Next/Image can shift layout after hydration; keep triggers in sync.
			requestAnimationFrame(() => ScrollTrigger.refresh());

			return () => {
				fadeTween.scrollTrigger?.kill();
				fadeTween.kill();
				drawTween.scrollTrigger?.kill();
				drawTween.kill();
			};
		},
		{ scope: containerRef },
	);

	const handleImageLoad = () => {
		ScrollTrigger.refresh();
	};

	return (
		<main ref={containerRef} className="font-sans bg-[#fafaf0] text-[#0f0f0f]">
			{/* Hero Section */}
			<section className="hero relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#deded5] p-8">
				<h1 className="w-[60%] text-center text-[4rem] font-medium leading-[1.1] tracking-[-0.1rem] max-lg:w-full max-lg:text-[2rem] max-lg:tracking-normal">
					Designed to keep information clear and connected
				</h1>
			</section>

			{/* Spotlight Section */}
			<section
				ref={spotlightRef}
				className="spotlight relative isolate z-0 flex h-full w-full flex-col gap-40 overflow-hidden p-8 max-lg:gap-20"
			>
				{/* Row 1: Single Image (50% width on desktop) */}
				<div className="flex justify-center gap-8 max-lg:flex-col">
					<div className="w-125 max-lg:w-full">
						<Image
							src="/timeline/lulus.png"
							alt=""
							className="h-full w-full object-cover block"
							width={500}
							height={500}
							onLoadingComplete={handleImageLoad}
						/>
					</div>
				</div>

				{/* Row 2: Text Left, Image Right */}
				<div className="flex justify-center gap-8 max-lg:flex-col">
					<div className="flex flex-1 flex-col justify-center">
						<div className="mx-auto flex w-3/4 flex-col gap-4 rounded-2xl bg-[#deded5] p-12 max-lg:w-full">
							<h2 className="text-[2.5rem] font-medium leading-[1.1] tracking-[-0.075rem] max-lg:text-[1.5rem] max-lg:tracking-normal">
								A cleaner way to handle incoming updates
							</h2>
							<p className="text-[1.125rem] font-medium max-lg:text-[1rem]">
								Instead of showing every message or notification instantly, the
								app groups related items and presents them in an organized
								panel. It keeps your workspace calm, even when activity spikes.
							</p>
						</div>
					</div>
					<div className="flex flex-1 flex-col justify-center">
						<div className="h-full w-full">
							<Image
								src="/timeline/balik.png"
								alt=""
								className="h-full w-full object-cover block"
								width={300}
								height={300}
								onLoadingComplete={handleImageLoad}
							/>
						</div>
					</div>
				</div>

				{/* Row 3: Image Left, Text Right */}
				<div className="flex justify-center gap-8 max-lg:flex-col">
					<div className="flex flex-1 flex-col justify-center">
						<div className="h-full w-full">
							<Image
								src="/timeline/tes.png"
								alt=""
								className="h-full w-full object-cover block"
								width={300}
								height={300}
								onLoadingComplete={handleImageLoad}
							/>
						</div>
					</div>
					<div className="flex flex-1 flex-col justify-center">
						<div className="mx-auto flex w-3/4 flex-col gap-4 rounded-2xl bg-[#deded5] p-12 max-lg:w-full">
							<h2 className="text-[2.5rem] font-medium leading-[1.1] tracking-[-0.075rem] max-lg:text-[1.5rem] max-lg:tracking-normal">
								Built for increasing information demands
							</h2>
							<p className="text-[1.125rem] font-medium max-lg:text-[1rem]">
								Whether it is files, notes, or incoming messages, the app sorts
								and prioritizes items automatically. It prevents clutter and
								helps maintain clarity during busy periods.
							</p>
						</div>
					</div>
				</div>

				{/* Row 4: Single Image (50% width on desktop) */}
				<div className="flex justify-center gap-8 max-lg:flex-col">
					<div className="w-1/2 max-lg:w-full">
						<Image
							src="/timeline/tes.png"
							alt=""
							className="h-full w-full object-cover block"
							width={300}
							height={300}
							onLoadingComplete={handleImageLoad}
						/>
					</div>
				</div>

				{/* SVG Path Background */}
				<div
					ref={svgDiv}
					className="pointer-events-none absolute left-1/2 top-[15svh] -z-10 h-full w-[90%] -translate-x-1/2 max-lg:top-[15svh] max-lg:w-[275%]"
				>
					<svg
						className="h-auto w-full"
						width="199"
						height="414"
						viewBox="0 0 199 414"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMin meet"
					>
						<title>Line</title>
						<path
							ref={pathRef}
							id="stroke-path"
							d="M171.238 11.2948C151.238 3.29482 43.1162 32.9589 34.2376 84.2948C24.7969 138.881 183.469 79.2654 171.238 133.295C159.873 183.494 42.9538 153.569 34.2376 204.295C25.0638 257.684 169.248 250.16 171.238 304.295C173.441 364.244 -40.6625 449.84 21.2376 347.795C60.0162 283.866 187.17 392.563 188.693 403.795"
							fill="none"
							stroke="#4270ED"
							strokeWidth="20"
							strokeLinecap="round"
						/>
						{/* <path
							ref={pathRef}
							id="stroke-path"
							d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
							fill="none"
							stroke="#FF5F0A"
							strokeWidth="200"
							strokeLinecap="round"
						/> */}
					</svg>
				</div>
			</section>

			{/* Outro Section */}
			<section className="outro relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#deded5] p-8">
				<h1 className="w-[60%] text-center text-[4rem] font-medium leading-[1.1] tracking-[-0.1rem] max-lg:w-full max-lg:text-[2rem] max-lg:tracking-normal">
					Clearer organization ready for whatever comes next
				</h1>
			</section>
		</main>
	);
}
