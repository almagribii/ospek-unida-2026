"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import Img from "next/image";
import { useEffect, useRef, useState } from "react";
import { MahasiswaSvg } from "@/components/MahasiswaSvg";
import { MahasiswiSvg } from "@/components/MahasiswiSvg";
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
	const [isCowo, setIsCowo] = useState(true);

	const activeImageYPercent = isCowo ? 15 : 5;

	// Helper to handle cyclic indices
	const getIndex = (index: number) => {
		return (
			(index + (isCowo ? outfits.cowo.length : outfits.cewe.length)) %
			(isCowo ? outfits.cowo.length : outfits.cewe.length)
		);
	};

	// --- Animation Logic ---

	useEffect(() => {
		const imgOutfit = outfits.cowo.map((outfit) => outfit.img);
		const imgOutfitBg = outfits.cowo.map((outfit) => outfit.bg);
		const imgOutfitCewe = outfits.cewe.map((outfit) => outfit.img);
		const imgOutfitBgCewe = outfits.cewe.map((outfit) => outfit.bg);

		imgOutfit.forEach((src) => {
			const img = new Image();
			img.src = src;
		});

		imgOutfitBg.forEach((src) => {
			const img = new Image();
			img.src = src;
		});

		imgOutfitCewe.forEach((src) => {
			const img = new Image();
			img.src = src;
		});

		imgOutfitBgCewe.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	}, []);

	const { contextSafe } = useGSAP(
		() => {
			// Reset animation state and kill any pending delayed calls
			isAnimating.current = false;

			const isMobile = window.innerWidth < 640;

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
				} else if (isPrev && !isMobile) {
					config = {
						...config,
						scale: 1,
						opacity: 1,
						clipPath: CLIP_PATHS.closed,
						zIndex: 5,
						left: "15%",
						rotation: -90,
					};
				} else if (isNext && !isMobile) {
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
						scale: isCowo ? 1.2 : 1,
						yPercent: isActive && isCowo ? 15 : isActive && !isCowo ? 5 : 0,
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

			// --- Opening Animation ---
			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

			// Animate active slide
			const activeSlide = slidesRef.current[activeIndex];
			if (activeSlide) {
				gsap.set(activeSlide, { autoAlpha: 0, y: 80 });
				tl.to(activeSlide, { autoAlpha: 1, y: 0, duration: 1 }, 0);
			}

			// Animate side slides (desktop only)
			if (!isMobile) {
				const prevSlide = slidesRef.current[getIndex(activeIndex - 1)];
				const nextSlide = slidesRef.current[getIndex(activeIndex + 1)];

				if (prevSlide) {
					gsap.set(prevSlide, { autoAlpha: 0, y: 60 });
					tl.to(prevSlide, { autoAlpha: 1, y: 0, duration: 1 }, 0.2);
				}
				if (nextSlide) {
					gsap.set(nextSlide, { autoAlpha: 0, y: 60 });
					tl.to(nextSlide, { autoAlpha: 1, y: 0, duration: 1 }, 0.2);
				}
			}

			// Animate navigation arrows (mobile)
			const navArrows = containerRef.current?.querySelectorAll(
				"[aria-label*='slide']",
			);
			if (navArrows && isMobile) {
				gsap.set(navArrows, { autoAlpha: 0, y: 20 });
				tl.to(
					navArrows,
					{ autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
					0.5,
				);
			}

			// Animate counter
			const counter = containerRef.current?.querySelector(
				".bottom-10.left-1\\/2",
			);
			if (counter) {
				gsap.set(counter, { autoAlpha: 0, y: 30 });
				tl.to(counter, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.6);
			}

			// Animate list items (desktop)
			const listItems = containerRef.current?.querySelectorAll(
				".left-10.bottom-10 p",
			);
			if (listItems && !isMobile) {
				gsap.set(listItems, { autoAlpha: 0, y: 20 });
				tl.to(
					listItems,
					{ autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 },
					0.7,
				);
			}

			// Animate preview background
			if (previewRef.current) {
				gsap.set(previewRef.current, { autoAlpha: 0 });
				tl.to(previewRef.current, { autoAlpha: 0.5, duration: 1 }, 0.3);
			}
		},
		{ scope: containerRef, dependencies: [isCowo] },
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

			// Check if we're on mobile (sm breakpoint is 640px)
			const isMobile = window.innerWidth < 640;

			const slidePositions = {
				prev: { left: "15%", rotation: -90 },
				active: { left: "50%", rotation: 0 },
				next: { left: "85%", rotation: 90 },
			};

			// Mobile: Use simple fade animation
			if (isMobile) {
				const currentSlide = slidesRef.current[currentIdx];
				const nextSlide = slidesRef.current[nextIdx];

				// Fade out current slide
				if (currentSlide) {
					gsap.to(currentSlide, {
						opacity: 0,
						duration: 0.5,
						ease: "power2.inOut",
					});
				}

				// Set up and fade in next slide
				if (nextSlide) {
					gsap.set(nextSlide, {
						left: "50%",
						xPercent: -50,
						yPercent: -50,
						scale: 1,
						opacity: 0,
						clipPath: CLIP_PATHS.open,
						zIndex: 10,
						rotation: 0,
					});

					const img = nextSlide.querySelector("img");
					if (img) {
						gsap.set(img, {
							rotation: 0,
							scale: isCowo ? 1.2 : 1,
							yPercent: activeImageYPercent,
						});
					}

					gsap.to(nextSlide, {
						opacity: 1,
						duration: 0.5,
						ease: "power2.inOut",
					});
				}

				// Animate title
				const currentTitle = titlesRef.current[currentIdx];
				const nextTitle = titlesRef.current[nextIdx];

				if (currentTitle) {
					gsap.to(currentTitle, { visibility: "hidden", duration: 0.3 });
				}

				if (nextTitle) {
					const spans = nextTitle.querySelectorAll("span");
					gsap.set(nextTitle, { visibility: "visible" });
					gsap.fromTo(
						spans,
						{ y: 40 },
						{ y: 0, duration: 0.5, stagger: 0.02, ease: "power2.out" },
					);
				}

				// Update preview
				if (previewRef.current) {
					const newImg = document.createElement("img");
					newImg.src = (isCowo ? outfits.cowo : outfits.cewe)[nextIdx].bg;
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

				gsap.delayedCall(0.5, () => {
					setActiveIndex(nextIdx);
					isAnimating.current = false;
				});

				return;
			}

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
				gsap.delayedCall(1, () => {
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
								scale: isCowo ? 1.2 : 1,
								yPercent: isActive && isCowo ? 15 : isActive && !isCowo ? 5 : 0,
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
						newImg.src = (isCowo ? outfits.cowo : outfits.cewe)[nextIdx].bg;
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
				});

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
					gsap.to(img, {
						rotation: 0,
						yPercent: activeImageYPercent,
						duration: 2,
						ease: "hop",
					});
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
						scale: isCowo ? 1.2 : 1,
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
				newImg.src = (isCowo ? outfits.cowo : outfits.cewe)[nextIdx].bg;
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
			gsap.delayedCall(2, () => {
				setActiveIndex(nextIdx);
				isAnimating.current = false;
			});
		},
	);

	return (
		<div key={isCowo ? "cowo" : "cewe"} className="contents">
			<div
				ref={containerRef}
				className="relative w-screen lg:h-screen h-dvh overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"
			>
				{/* Main Slider Area */}
				{/** biome-ignore lint/a11y/noStaticElementInteractions: Why not */}
				{/** biome-ignore lint/a11y/useKeyWithClickEvents: Why not */}
				<div
					className="slider relative w-full h-full"
					onClick={(e) => {
						if (isAnimating.current) return;
						const width = window.innerWidth;
						const x = e.clientX;
						if (x < width * 0.3) transitionSlides("prev");
						else if (x > width * 0.7) transitionSlides("next");
					}}
				>
					{/* Slides */}
					{(isCowo ? outfits.cowo : outfits.cewe).map((outfit, index) => {
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
								className={`absolute top-1/2 left-1/2 w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-[60%] sm:h-[65%] md:h-[70%] bg-foreground will-change-transform ${
									isVisible ? "cursor-pointer" : "pointer-events-none"
								} ${!isActive ? "hidden sm:block" : ""}`}
								onClick={(e) => {
									e.stopPropagation();
									if (isAnimating.current) return;
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
										className="object-cover scale-[80%] object-top will-change-transform"
									/>
								</div>
							</div>
						);
					})}

					{/* Titles */}
					<div className="absolute bottom-40 sm:bottom-40 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-1/2 h-15 text-center z-20 pointer-events-none">
						{(isCowo ? outfits.cowo : outfits.cewe).map((outfit, index) => (
							<div
								key={outfit.img}
								ref={(el) => {
									titlesRef.current[index] = el;
								}}
								className="absolute z-10 w-full h-full flex justify-center items-center"
							>
								<SplitText
									text={outfit.name}
									className="text-[28px] sm:text-[36px] md:text-[50px] font-mirage font-medium text-background drop-shadow-lg"
								/>
							</div>
						))}
					</div>

					{/* Navigation Arrows for Mobile */}
					<div className="absolute bottom-1/2 translate-y-1/2 left-4 z-30 sm:hidden">
						<button
							type="button"
							onClick={() => {
								if (isAnimating.current) return;
								transitionSlides("prev");
							}}
							className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground"
							aria-label="Previous slide"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>
					</div>
					<div className="absolute bottom-1/2 translate-y-1/2 right-4 z-30 sm:hidden">
						<button
							type="button"
							onClick={() => {
								if (isAnimating.current) return;
								transitionSlides("next");
							}}
							className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground"
							aria-label="Next slide"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</div>

					{/* Counter */}
					<div className="absolute left-1/2 -translate-x-1/2 bottom-10 text-center z-20 pointer-events-none">
						<p className="flex gap-4 justify-center text-[13px] font-medium text-foreground uppercase">
							<span>{activeIndex + 1}</span>
							<span className="text-foreground">/</span>
							<span className="text-foreground">
								{isCowo ? outfits.cowo.length : outfits.cewe.length}
							</span>
						</p>
					</div>

					{/* List Items */}
					<div className="absolute left-10 bottom-10 z-20 hidden md:block">
						{(isCowo ? outfits.cowo : outfits.cewe).map((outfit, index) => (
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

					{/* Switch Gender Button */}
					<div className="absolute w-fit rounded-4xl bg-foreground left-1/2 bottom-20 -translate-x-1/2 lg:left-auto lg:right-10 lg:bottom-10 lg:translate-x-0 z-30 text-center p-2">
						<div className="flex flex-row gap-2">
							<button
								type="button"
								onClick={() => {
									if (isCowo) return;
									setIsCowo(true);
									setActiveIndex(0);
								}}
								className={`p-2 rounded-full ${isCowo ? "bg-primary text-background hover:text-background/75 hover:bg-primary/75" : "bg-background text-foreground hover:bg-primary hover:text-background"} transition-colors cursor-pointer`}
							>
								<MahasiswaSvg className="h-8 w-8" />
							</button>
							<button
								type="button"
								onClick={() => {
									if (!isCowo) return;
									setActiveIndex(0);
									setIsCowo(false);
								}}
								className={`p-2 rounded-full ${!isCowo ? "bg-primary text-background hover:text-background/75 hover:bg-primary/75" : "bg-background text-foreground hover:bg-primary hover:text-background"} transition-colors cursor-pointer`}
							>
								<MahasiswiSvg className="h-8 w-8" />
							</button>
						</div>
					</div>

					{/* Preview Background */}
					<div
						ref={previewRef}
						className="absolute lg:block hidden top-[25%] left-1/2 -translate-x-1/2 w-[75%] h-full z-0 opacity-50 overflow-hidden pointer-events-none"
					>
						<Img
							width={1000}
							height={1000}
							src={(isCowo ? outfits.cowo : outfits.cewe)[activeIndex].bg}
							alt="preview-bg"
							className="absolute top-0 left-0 w-full h-full object-cover animate-pan"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
