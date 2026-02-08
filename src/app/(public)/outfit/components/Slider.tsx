"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import Img from "next/image";
import { useEffect, useRef, useState } from "react";
import { outfits } from "./outfits";

if (typeof window !== "undefined") {
	gsap.registerPlugin(CustomEase, useGSAP);
	CustomEase.create(
		"hop",
		"M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1",
	);
}

const CLIP_PATHS = {
	closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
	open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};

// --- Helper Component ---

const SplitText = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => {
	return (
		<h1 className={`flex overflow-hidden ${className}`}>
			{text.split("").map((char, i) => (
				<span
					key={`${char}-${
						// biome-ignore lint/suspicious/noArrayIndexKey: what the point?
						i
					}`}
					className="inline-block origin-bottom will-change-transform"
				>
					{char === " " ? "\u00A0\u00A0" : char}
				</span>
			))}
		</h1>
	);
};

export default function Slider() {
	const containerRef = useRef<HTMLDivElement>(null);
	const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
	const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
	const previewRef = useRef<HTMLDivElement>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const isAnimating = useRef(false);

	// Helper to handle cyclic indices
	const getIndex = (index: number) => {
		return (index + outfits.length) % outfits.length;
	};

	// --- Animation Logic ---

	useEffect(() => {
		const imgOutfit = outfits.map((outfit) => outfit.img);
		const imgOutfitBg = outfits.map((outfit) => outfit.bg);

		imgOutfit.forEach((src) => {
			const img = new Image();
			img.src = src;
		});

		imgOutfitBg.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	}, []);

	const { contextSafe } = useGSAP(
		() => {
			// Initial Setup for positions (equivalent to useEffect with empty dependency)
			slidesRef.current.forEach((slide, i) => {
				if (!slide) return;

				const isPrev = i === getIndex(activeIndex - 1);
				const isActive = i === activeIndex;
				const isNext = i === getIndex(activeIndex + 1);

				let config = {
					xPercent: -50,
					yPercent: -50,
					scale: 0,
					opacity: 0,
					clipPath: CLIP_PATHS.closed,
					zIndex: 0,
					left: "50%",
					rotation: 0,
				};

				if (isActive) {
					config = {
						...config,
						scale: 1,
						opacity: 1,
						clipPath: CLIP_PATHS.open,
						zIndex: 10,
						left: "50%",
						rotation: 0,
					};
				} else if (isPrev) {
					config = {
						...config,
						scale: 1,
						opacity: 1,
						clipPath: CLIP_PATHS.closed,
						zIndex: 5,
						left: "15%",
						rotation: -90,
					};
				} else if (isNext) {
					config = {
						...config,
						scale: 1,
						opacity: 1,
						clipPath: CLIP_PATHS.closed,
						zIndex: 5,
						left: "85%",
						rotation: 90,
					};
				}

				gsap.set(slide, config);
				const img = slide.querySelector("img");
				if (img)
					gsap.set(img, {
						rotation: -config.rotation,
						scale: 1.5,
						yPercent: isActive ? 15 : 0,
					});
			});

			// Initialize Title
			if (titlesRef.current[activeIndex]) {
				const spans = titlesRef.current[activeIndex]?.querySelectorAll("span");
				if (spans) {
					gsap.set(titlesRef.current[activeIndex], { visibility: "visible" });
					gsap.fromTo(
						spans,
						{ y: 60 },
						{ y: 0, duration: 1, stagger: 0.02, ease: "hop" },
					);
				}
			}
			// Hide other titles
			titlesRef.current.forEach((t, i) => {
				if (i !== activeIndex && t) gsap.set(t, { visibility: "hidden" });
			});
		},
		{ scope: containerRef },
	); // Run once on mount

	const transitionSlides = contextSafe(
		(direction: "next" | "prev", targetIndex?: number) => {
			if (isAnimating.current) return;
			isAnimating.current = true;

			const currentIdx = activeIndex;
			const nextIdx =
				targetIndex !== undefined
					? targetIndex
					: getIndex(direction === "next" ? currentIdx + 1 : currentIdx - 1);

			// Check if this is a multi-step jump (more than 1 step away)
			const isMultiStep =
				targetIndex !== undefined &&
				Math.abs(targetIndex - currentIdx) > 1 &&
				targetIndex !== getIndex(currentIdx + 1) &&
				targetIndex !== getIndex(currentIdx - 1);

			const slidePositions = {
				prev: { left: "15%", rotation: -90 },
				active: { left: "50%", rotation: 0 },
				next: { left: "85%", rotation: 90 },
			};

			if (isMultiStep) {
				// Multi-step jump: fade out all current visible slides, then set up new ones
				const currentVisibleIndices = [
					getIndex(currentIdx - 1),
					currentIdx,
					getIndex(currentIdx + 1),
				];
				const newVisibleIndices = [
					getIndex(nextIdx - 1),
					nextIdx,
					getIndex(nextIdx + 1),
				];

				// Fade out all currently visible slides
				currentVisibleIndices.forEach((idx) => {
					const slide = slidesRef.current[idx];
					if (slide) {
						gsap.to(slide, {
							opacity: 0,
							scale: 0,
							duration: 1,
							ease: "power2.inOut",
						});
					}
				});

				// After fade out, set up and fade in new slides
				setTimeout(() => {
					// Hide all slides first
					slidesRef.current.forEach((slide) => {
						if (!slide) return;
						gsap.set(slide, {
							opacity: 0,
							scale: 0,
							zIndex: 0,
						});
					});

					// Set up new visible slides
					newVisibleIndices.forEach((idx, posIdx) => {
						const slide = slidesRef.current[idx];
						if (!slide) return;

						const posKey =
							posIdx === 0 ? "prev" : posIdx === 1 ? "active" : "next";
						const pos = slidePositions[posKey];
						const isActive = posIdx === 1;

						gsap.set(slide, {
							...pos,
							xPercent: -50,
							yPercent: -50,
							scale: 0,
							opacity: 0,
							clipPath: isActive ? CLIP_PATHS.open : CLIP_PATHS.closed,
							zIndex: isActive ? 10 : 5,
						});

						gsap.to(slide, {
							scale: 1,
							opacity: 1,
							duration: 1,
							ease: "power2.out",
						});

						const img = slide.querySelector("img");
						if (img) {
							gsap.set(img, {
								rotation: -pos.rotation,
								scale: 1.5,
								yPercent: isActive ? 15 : 0,
							});
						}
					});

					// Animate title
					titlesRef.current.forEach((t) => {
						if (t) gsap.set(t, { visibility: "hidden" });
					});
					const nextTitle = titlesRef.current[nextIdx];
					if (nextTitle) {
						const spans = nextTitle.querySelectorAll("span");
						gsap.set(nextTitle, { visibility: "visible" });
						gsap.fromTo(
							spans,
							{ y: 60 },
							{ y: 0, duration: 1, stagger: 0.02, ease: "hop" },
						);
					}

					// Update preview
					if (previewRef.current) {
						const newImg = document.createElement("img");
						newImg.src = outfits[nextIdx].img;
						newImg.className =
							"absolute top-0 left-0 w-full h-full object-cover opacity-0 animate-pan";
						previewRef.current.appendChild(newImg);

						gsap.to(newImg, {
							opacity: 1,
							duration: 0.5,
							ease: "power2.inOut",
							onComplete: () => {
								const images = previewRef.current?.querySelectorAll("img");
								if (images && images.length > 1) {
									images[0].remove();
								}
							},
						});
					}

					setActiveIndex(nextIdx);
					isAnimating.current = false;
				}, 1000);

				return;
			}

			// Single-step transition (original logic)
			const prevIdx = getIndex(currentIdx - 1);
			const nextNeighborIdx = getIndex(currentIdx + 1);

			// The slide that will completely disappear
			const outgoingSlide =
				slidesRef.current[direction === "next" ? prevIdx : nextNeighborIdx];
			// Current active slide
			const activeSlide = slidesRef.current[currentIdx];
			// The slide that will become active
			const incomingSlide = slidesRef.current[nextIdx];
			// The NEW neighbor that needs to appear
			const newNeighborIdx = getIndex(
				direction === "next" ? nextIdx + 1 : nextIdx - 1,
			);
			const newNeighborSlide = slidesRef.current[newNeighborIdx];

			const outgoingPos = direction === "next" ? "prev" : "next";
			const newNeighborPos = direction === "next" ? "next" : "prev";

			// 1. Animate incoming slide (current next/prev becoming active)
			if (incomingSlide) {
				gsap.to(incomingSlide, { zIndex: 10 });
				gsap.to(incomingSlide, {
					...slidePositions.active,
					scale: 1,
					opacity: 1,
					duration: 2,
					ease: "hop",
					clipPath: CLIP_PATHS.open,
				});

				const img = incomingSlide.querySelector("img");
				if (img) {
					gsap.to(img, { rotation: 0, yPercent: 15, duration: 2, ease: "hop" });
				}
			}

			// 2. Animate current Active -> Outgoing
			if (activeSlide) {
				gsap.to(activeSlide, { zIndex: 5 });
				gsap.to(activeSlide, {
					...slidePositions[outgoingPos],
					clipPath: CLIP_PATHS.closed,
					duration: 2,
					ease: "hop",
				});
				const img = activeSlide.querySelector("img");
				if (img) {
					gsap.to(img, {
						rotation: -slidePositions[outgoingPos].rotation,
						yPercent: 0,
						duration: 2,
						ease: "hop",
					});
				}
			}

			// 3. Handle the "Far" slide (disappearing)
			if (outgoingSlide) {
				gsap.to(outgoingSlide, {
					scale: 0,
					opacity: 0,
					zIndex: 0,
					duration: 2,
					ease: "hop",
				});
			}

			// 4. Animate the NEW neighbor slide (appearing)
			if (newNeighborSlide && newNeighborSlide !== activeSlide) {
				gsap.set(newNeighborSlide, {
					...slidePositions[newNeighborPos],
					xPercent: -50,
					yPercent: -50,
					scale: 0,
					opacity: 0,
					clipPath: CLIP_PATHS.closed,
					zIndex: 5,
				});

				gsap.to(newNeighborSlide, {
					...slidePositions[newNeighborPos],
					scale: 1,
					opacity: 1,
					duration: 2,
					ease: "hop",
				});

				const img = newNeighborSlide.querySelector("img");
				if (img) {
					gsap.set(img, {
						rotation: -slidePositions[newNeighborPos].rotation,
						scale: 1.5,
						yPercent: 0,
					});
				}
			}

			// 5. Animate Titles
			const currentTitle = titlesRef.current[currentIdx];
			const nextTitle = titlesRef.current[nextIdx];
			const yOffset = direction === "next" ? 100 : -100;

			if (currentTitle) {
				const spans = currentTitle.querySelectorAll("span");
				gsap.to(spans, {
					y: -yOffset,
					duration: 1.25,
					stagger: 0.02,
					ease: "hop",
					delay: 0.25,
				});
			}

			if (nextTitle) {
				const spans = nextTitle.querySelectorAll("span");
				gsap.set(nextTitle, { visibility: "visible" });
				gsap.set(spans, { y: yOffset });
				gsap.to(spans, {
					y: 0,
					duration: 1.25,
					stagger: 0.02,
					ease: "hop",
					delay: 0.25,
				});
			}

			// 6. Animate Preview Image
			if (previewRef.current) {
				const newImg = document.createElement("img");
				newImg.src = outfits[nextIdx].bg;
				newImg.className =
					"absolute top-0 left-0 w-full h-full object-cover opacity-0 animate-pan";
				previewRef.current.appendChild(newImg);

				gsap.to(newImg, {
					opacity: 1,
					duration: 1,
					ease: "power2.inOut",
					delay: 0.5,
					onComplete: () => {
						const images = previewRef.current?.querySelectorAll("img");
						if (images && images.length > 1) {
							images[0].remove();
						}
					},
				});
			}

			// Clean up state after animation
			setTimeout(() => {
				setActiveIndex(nextIdx);
				isAnimating.current = false;
			}, 2000);
		},
	);

	return (
		<div
			ref={containerRef}
			className="relative w-screen h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"
		>
			{/* Main Slider Area */}
			{/** biome-ignore lint/a11y/noStaticElementInteractions: Why not */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: Why not */}
			<div
				className="slider relative w-full h-full"
				onClick={(e) => {
					const width = window.innerWidth;
					const x = e.clientX;
					if (x < width * 0.3) transitionSlides("prev");
					else if (x > width * 0.7) transitionSlides("next");
				}}
			>
				{/* Slides */}
				{outfits.map((outfit, index) => {
					const isPrev = index === getIndex(activeIndex - 1);
					const isActive = index === activeIndex;
					const isNext = index === getIndex(activeIndex + 1);
					const isVisible = isPrev || isActive || isNext;

					return (
						// biome-ignore lint/a11y/noStaticElementInteractions: why not
						// biome-ignore lint/a11y/useKeyWithClickEvents: why not
						<div
							key={outfit.img}
							ref={(el) => {
								slidesRef.current[index] = el;
							}}
							className={`absolute top-1/2 left-1/2 w-[30%] h-[70%] bg-foreground will-change-transform ${
								isVisible ? "cursor-pointer" : "pointer-events-none"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								if (isNext) transitionSlides("next");
								if (isPrev) transitionSlides("prev");
							}}
						>
							<div className="bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5))] bottom-0 absolute h-[50%] w-full z-1"></div>
							<div className="relative w-full h-full overflow-hidden ">
								<Img
									src={outfit.img}
									alt={outfit.name}
									fill
									className="object-cover object-top will-change-transform"
								/>
							</div>
						</div>
					);
				})}

				{/* Titles */}
				<div className="absolute bottom-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-15 text-center z-20 pointer-events-none">
					{outfits.map((outfit, index) => (
						<div
							key={outfit.img}
							ref={(el) => {
								titlesRef.current[index] = el;
							}}
							className="absolute z-10 w-full h-full flex justify-center items-center"
						>
							<SplitText
								text={outfit.name}
								className="text-[50px] font-mirage font-medium text-background drop-shadow-lg"
							/>
						</div>
					))}
				</div>

				{/* Counter */}
				<div className="absolute left-1/2 -translate-x-1/2 bottom-10 text-center z-20 pointer-events-none">
					<p className="flex gap-4 justify-center text-[13px] font-medium text-background uppercase">
						<span>{activeIndex + 1}</span>
						<span className="text-foreground">/</span>
						<span className="text-foreground">{outfits.length}</span>
					</p>
				</div>

				{/* List Items */}
				<div className="absolute left-10 bottom-10 z-20 hidden md:block">
					{outfits.map((outfit, index) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: why not
						<p
							key={outfit.img}
							onClick={() => {
								if (index !== activeIndex && !isAnimating.current) {
									const direction = index > activeIndex ? "next" : "prev";
									transitionSlides(direction, index);
								}
							}}
							className={`text-[13px] font-medium uppercase cursor-pointer transition-colors duration-500 mb-1 ${
								index === activeIndex
									? "text-primary"
									: "text-foreground hover:text-primary"
							}`}
						>
							{outfit.name}
						</p>
					))}
				</div>

				{/* Preview Background */}
				<div
					ref={previewRef}
					className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[75%] h-full z-0 opacity-50 overflow-hidden pointer-events-none"
				>
					<Img
						width={1000}
						height={1000}
						src={outfits[activeIndex].bg}
						alt="preview-bg"
						className="absolute top-0 left-0 w-full h-full object-cover animate-pan"
					/>
				</div>
			</div>
		</div>
	);
}
