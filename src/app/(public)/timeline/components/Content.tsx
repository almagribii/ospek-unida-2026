"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {
	const containerRef = useRef<HTMLDivElement>(null);
	const spotlightRef = useRef<HTMLElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const svgDiv = useRef<HTMLDivElement>(null);
	const timelineContentRef = useRef<HTMLDivElement>(null);

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
					start: "-40px center",
					toggleActions: "play none none reverse",
				},
			});

			const drawTween = gsap.to(path, {
				strokeDashoffset: 0,
				ease: "none",
				scrollTrigger: {
					trigger: spotlight,
					start: "-40px center",
					end: "90% 80%",
					scrub: true,
					invalidateOnRefresh: true,
					markers: true,
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
		<div ref={containerRef}>
			{/* Spotlight Section */}
			<section
				ref={spotlightRef}
				className="spotlight relative isolate z-0 h-full w-full overflow-hidden p-8 max-lg:gap-20"
			>
				<div
					ref={timelineContentRef}
					className="relative mx-auto"
					style={{ aspectRatio: "199 / 414" }}
				>
					<div className="absolute right-0">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute left-0 top-[10%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute right-0 top-[23%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute left-0 top-[37%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute right-0 top-[48%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute left-0 top-[64%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute right-0 top-[74%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
					</div>

					<div className="absolute left-0 top-[85%]">
						<div className="w-100 flex flex-col justify-center items-center max-lg:w-full">
							<Image
								src="/timeline/lulus.png"
								alt="lulus"
								className="h-full w-full object-cover drop-shadow-xl block"
								width={400}
								height={400}
								onLoadingComplete={handleImageLoad}
							/>
							<div className="flex-col max-w-sm gap-4 rounded-2xl bg-secondary-muted text-foreground p-4">
								<h2 className="text-2xl font-mirage font-semibold">
									Yudisium Siswa Akhir KMI
								</h2>
								<p className="text-base font-light">
									1 Maret 2026/ 11 Ramadhan 1447
								</p>
							</div>
						</div>
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
							id="stoke-path"
							d="M188.69 10.4222C185.619 7.86566 10.0001 15.9014 10.0001 62.866C10.0001 109.831 188.69 59.735 188.69 121.572C188.69 183.408 10.0001 120.006 10.0001 183.408C10.0001 246.81 188.69 169.319 188.69 235.852C188.69 302.385 10.0001 246.028 10.0001 302.385C10.0001 358.743 188.69 295.341 188.69 343.871C188.69 392.401 10.0001 397.88 10.0001 397.88"
							stroke="#4270ED"
							strokeWidth="20"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</section>
		</div>
	);
}
