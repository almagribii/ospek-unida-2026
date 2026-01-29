"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { timelineData } from "./timelineData";

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

			const images = document.querySelectorAll("#image-timeline");
			const imageTweens: gsap.core.Tween[] = [];

			images.forEach((image) => {
				const tween = gsap.from(image, {
					autoAlpha: 0,
					y: 100,
					ease: "power3.out",
					duration: 0.8,
					scrollTrigger: {
						trigger: image,
						start: "top 75%",
						end: "top 20%",
						toggleActions: "play none none reverse",
					},
				});
				imageTweens.push(tween);
			});

			const descriptions = document.querySelectorAll("#desc-timeline");
			const descriptionsTweens: gsap.core.Tween[] = [];

			descriptions.forEach((description) => {
				const tween = gsap.from(description, {
					autoAlpha: 0,
					y: 100,
					ease: "power3.out",
					duration: 0.8,
					scrollTrigger: {
						trigger: description,
						start: "top 100%",
						end: "top 20%",
						toggleActions: "play none none reverse",
					},
				});
				descriptionsTweens.push(tween);
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
					onRefreshInit: () => {
						const length = getPathLength();
						gsap.set(path, {
							strokeDasharray: length,
							strokeDashoffset: length,
						});
					},
				},
			});

			return () => {
				fadeTween.kill();
				drawTween.scrollTrigger?.kill();
				drawTween.kill();
				imageTweens.forEach((tween) => {
					tween.scrollTrigger?.kill();
					tween.kill();
				});
				descriptionsTweens.forEach((tween) => {
					tween.scrollTrigger?.kill();
					tween.kill();
				});
			};
		},
		{ scope: containerRef },
	);

	const handleImageLoad = () => {
		ScrollTrigger.refresh();
	};

	return (
		<div ref={containerRef}>
			<section
				ref={spotlightRef}
				className="spotlight relative isolate z-0 w-full overflow-visible mb-12 lg:mb-24 p-8 max-lg:gap-20"
				style={{ minHeight: "200vh" }}
			>
				<div
					ref={timelineContentRef}
					className="relative lg:block flex flex-col justify-center items-center gap-2 lg:gap-0 mx-auto"
					style={{ aspectRatio: "199 / 414" }}
				>
					{timelineData.length > 0 &&
						timelineData.map((item, index) => {
							return (
								<div
									key={`${item.title}-${index}`}
									className={`lg:absolute ${item.position}`}
								>
									<div className="w-100 flex flex-col justify-center items-center max-lg:w-full text-center">
										<Image
											src={`/timeline/${item.imageUrl}`}
											alt="lulus"
											id="image-timeline"
											className="h-full w-full object-cover drop-shadow-xl block z-1 relative"
											width={400}
											height={400}
											onLoadingComplete={handleImageLoad}
										/>
										<div
											id="desc-timeline"
											className="flex-col lg:max-w-sm max-w-full w-full gap-4 rounded-2xl bg-secondary-muted text-foreground p-4 z-10 relative"
										>
											<h2 className="text-2xl font-mirage font-semibold">
												{item.title}
											</h2>
											<p className="text-base font-light">{item.description}</p>
										</div>
									</div>
								</div>
							);
						})}
				</div>

				{/* SVG Path Background */}
				<div
					ref={svgDiv}
					className="pointer-events-none lg:block hidden absolute left-1/2 top-[15svh] -z-10 h-full w-[90%] -translate-x-1/2 max-lg:top-[15svh] max-lg:w-[275%]"
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
