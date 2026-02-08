"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CircleXIcon, FastForwardIcon, MaximizeIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MahasiswaSvg } from "@/components/MahasiswaSvg";
import { MahasiswiSvg } from "@/components/MahasiswiSvg";
import { itemsCewe, itemsCowo } from "./items";

interface SlideItem {
	element: HTMLLIElement;

	relativeIndex: number;
}

const BUFFER_SIZE = 5;
const SPACING = 0.375;
const SLIDE_WIDTH = SPACING * 1000;

export default function Slider() {
	const containerRef = useRef<HTMLElement>(null);
	const productsRef = useRef<HTMLUListElement>(null);
	const productPreviewRef = useRef<HTMLDivElement>(null);
	const productBannerRef = useRef<HTMLDivElement>(null);
	const controllerInnerRef = useRef<HTMLButtonElement>(null);
	const controllerOuterRef = useRef<HTMLDivElement>(null);
	const closeIconRef = useRef<HTMLDivElement>(null);
	const openIconRef = useRef<HTMLDivElement>(null);
	const prevBtnRef = useRef<HTMLButtonElement>(null);
	const nextBtnRef = useRef<HTMLButtonElement>(null);
	const previewNameRef = useRef<HTMLParagraphElement>(null);
	const previewImgRef = useRef<HTMLImageElement>(null);
	const previewTagRef = useRef<HTMLParagraphElement>(null);
	const bannerImgRef = useRef<HTMLImageElement>(null);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [isCowo, setIsCowo] = useState(true);
	const [isPreviewAnimating, setIsPreviewAnimating] = useState(false);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const slideItemsRef = useRef<SlideItem[]>([]);
	const currentProductIndexRef = useRef(0);

	const { contextSafe } = useGSAP({ scope: containerRef });

	const getActualIndex = useCallback(
		(index: number): number => {
			const itemsLength = isCowo ? itemsCowo.length : itemsCewe.length;
			return ((index % itemsLength) + itemsLength) % itemsLength;
		},
		[isCowo],
	);

	const updatePreviewContent = useCallback(() => {
		const actualIndex = getActualIndex(currentProductIndexRef.current);
		const currentProduct = isCowo
			? itemsCowo[actualIndex]
			: itemsCewe[actualIndex];

		if (previewNameRef.current) {
			previewNameRef.current.textContent = currentProduct.name;
		}
		if (previewImgRef.current) {
			previewImgRef.current.src = currentProduct.image;
			previewImgRef.current.alt = currentProduct.name;
		}
		if (previewTagRef.current) {
			previewTagRef.current.textContent = currentProduct.tag;
		}
		if (bannerImgRef.current) {
			bannerImgRef.current.src = currentProduct.image;
			bannerImgRef.current.alt = currentProduct.name;
		}
	}, [getActualIndex, isCowo]);

	const updateButtonStates = useCallback(() => {
		const disabled = isPreviewAnimating || isPreviewOpen;

		if (prevBtnRef.current) {
			prevBtnRef.current.classList.toggle("disabled", disabled);
		}
		if (nextBtnRef.current) {
			nextBtnRef.current.classList.toggle("disabled", disabled);
		}
	}, [isPreviewAnimating, isPreviewOpen]);

	const addSlideItem = useCallback(
		(relativeIndex: number) => {
			if (!productsRef.current) return;

			const productIndex = getActualIndex(
				currentProductIndexRef.current + relativeIndex,
			);
			const product = isCowo
				? itemsCowo[productIndex]
				: itemsCewe[productIndex];

			const li = document.createElement("li");
			li.className =
				"absolute w-75 h-75 flex items-center justify-center will-change-transform";
			li.innerHTML = `<img src="${product.image}" alt="${product.name}" class="w-62.5 h-62.5 lg:w-90 lg:h-90 object-contain drop-shadow-xl" />`;
			li.dataset.relativeIndex = String(relativeIndex);

			contextSafe(() => {
				gsap.set(li, {
					x: relativeIndex * SLIDE_WIDTH,
					scale: relativeIndex === 0 ? 1.25 : 0.75,
					zIndex: relativeIndex === 0 ? 100 : 1,
				});
			})();

			productsRef.current.appendChild(li);
			slideItemsRef.current.push({ element: li, relativeIndex });
		},
		[contextSafe, getActualIndex, isCowo],
	);

	const removeSlideItem = useCallback((relativeIndex: number) => {
		const itemIndex = slideItemsRef.current.findIndex(
			(item) => item.relativeIndex === relativeIndex,
		);
		if (itemIndex !== -1) {
			const item = slideItemsRef.current[itemIndex];
			item.element.remove();
			slideItemsRef.current.splice(itemIndex, 1);
		}
	}, []);

	const updateSliderPosition = useCallback(() => {
		slideItemsRef.current.forEach((item) => {
			const isActive = item.relativeIndex === 0;
			contextSafe(() => {
				gsap.to(item.element, {
					x: item.relativeIndex * SLIDE_WIDTH,
					scale: isActive ? 1.25 : 0.75,
					zIndex: isActive ? 100 : 1,
					duration: 0.75,
					ease: "power3.out",
				});
			})();
		});
	}, [contextSafe]);

	const getActiveSlide = useCallback((): SlideItem | undefined => {
		return slideItemsRef.current.find((item) => item.relativeIndex === 0);
	}, []);

	const animateSideItems = useCallback(
		(hide: boolean = false) => {
			const activeSlide = getActiveSlide();

			slideItemsRef.current.forEach((item) => {
				const absIndex = Math.abs(item.relativeIndex);
				if (absIndex === 1 || absIndex === 2) {
					contextSafe(() => {
						gsap.to(item.element, {
							x: hide
								? item.relativeIndex * SLIDE_WIDTH * 1.5
								: item.relativeIndex * SLIDE_WIDTH,
							opacity: hide ? 0 : 1,
							duration: 0.75,
							ease: "power3.inOut",
						});
					})();
				}
			});

			if (activeSlide) {
				contextSafe(() => {
					gsap.to(activeSlide.element, {
						scale: hide ? 0.75 : 1.25,
						opacity: hide ? 0 : 1,
						duration: 0.75,
						ease: "power3.inOut",
					});
				})();
			}
		},
		[contextSafe, getActiveSlide],
	);

	const animateControllerTransition = useCallback(
		(opening: boolean = false) => {
			contextSafe(() => {
				gsap.to([".controller-label p", ".nav-btn"], {
					opacity: opening ? 0 : 1,
					duration: 0.2,
					ease: "power3.out",
					delay: opening ? 0 : 0.4,
				});

				if (controllerOuterRef.current) {
					gsap.to(controllerOuterRef.current, {
						clipPath: opening
							? "circle(0% at 50% 50%)"
							: "circle(50% at 50% 50%)",
						duration: 0.75,
						ease: "power3.inOut",
					});
				}

				if (controllerInnerRef.current) {
					gsap.to(controllerInnerRef.current, {
						clipPath: opening
							? "circle(50% at 50% 50%)"
							: "circle(40% at 50% 50%)",
						duration: 0.75,
						ease: "power3.inOut",
					});
				}

				if (openIconRef.current) {
					gsap.to(openIconRef.current, {
						y: opening ? -100 : 0,
						autoAlpha: opening ? 0 : 1,
						duration: 0.75,
						ease: "power3.inOut",
					});
				}

				if (closeIconRef.current) {
					gsap.to(closeIconRef.current, {
						y: opening ? 0 : 100,
						autoAlpha: opening ? 1 : 0,
						duration: 0.75,
						ease: "power3.inOut",
					});
				}
			})();
		},
		[contextSafe],
	);

	const togglePreview = useCallback(() => {
		if (isPreviewAnimating) return;

		setIsPreviewAnimating(true);

		if (!isPreviewOpen) {
			updatePreviewContent();
		}

		contextSafe(() => {
			if (productPreviewRef.current) {
				gsap.to(productPreviewRef.current, {
					y: isPreviewOpen ? "100%" : "-50%",
					autoAlpha: isPreviewOpen ? 0 : 1,
					duration: 0.75,
					ease: "power3.inOut",
				});
			}

			if (productBannerRef.current) {
				gsap.to(productBannerRef.current, {
					opacity: isPreviewOpen ? 0 : 1,
					duration: 0.4,
					delay: isPreviewOpen ? 0 : 0.25,
					ease: "power3.inOut",
				});
			}
		})();

		animateSideItems(!isPreviewOpen);
		animateControllerTransition(!isPreviewOpen);

		setTimeout(() => {
			setIsPreviewAnimating(false);
			setIsPreviewOpen((prev) => !prev);
		}, 600);
	}, [
		isPreviewAnimating,
		isPreviewOpen,
		updatePreviewContent,
		animateSideItems,
		animateControllerTransition,
		contextSafe,
	]);

	const moveNext = useCallback(() => {
		if (isPreviewAnimating || isPreviewOpen) return;

		currentProductIndexRef.current++;
		removeSlideItem(-BUFFER_SIZE);

		slideItemsRef.current.forEach((item) => {
			item.relativeIndex--;
			item.element.dataset.relativeIndex = String(item.relativeIndex);
		});

		addSlideItem(BUFFER_SIZE);
		updateSliderPosition();
		updatePreviewContent();
		setCurrentIndex(currentProductIndexRef.current);
	}, [
		isPreviewAnimating,
		isPreviewOpen,
		removeSlideItem,
		addSlideItem,
		updateSliderPosition,
		updatePreviewContent,
	]);

	const movePrev = useCallback(() => {
		if (isPreviewAnimating || isPreviewOpen) return;

		currentProductIndexRef.current--;
		removeSlideItem(BUFFER_SIZE);

		slideItemsRef.current.forEach((item) => {
			item.relativeIndex++;
			item.element.dataset.relativeIndex = String(item.relativeIndex);
		});

		addSlideItem(-BUFFER_SIZE);
		updateSliderPosition();
		updatePreviewContent();
		setCurrentIndex(currentProductIndexRef.current);
	}, [
		isPreviewAnimating,
		isPreviewOpen,
		removeSlideItem,
		addSlideItem,
		updateSliderPosition,
		updatePreviewContent,
	]);

	// Initialize slider
	useEffect(() => {
		if (!productsRef.current) return;

		// Clear pre-existing items to prevent duplication (Strict Mode / re-navigation safe)
		productsRef.current.innerHTML = "";
		slideItemsRef.current = [];

		for (let i = -BUFFER_SIZE; i <= BUFFER_SIZE; i++) {
			addSlideItem(i);
		}
		updateSliderPosition();
		updatePreviewContent();

		// Set initial states for GSAP animations to prevent first-render glitches
		contextSafe(() => {
			if (controllerInnerRef.current) {
				gsap.set(controllerInnerRef.current, {
					clipPath: "circle(40% at 50% 50%)",
				});
			}
			if (controllerOuterRef.current) {
				gsap.set(controllerOuterRef.current, {
					clipPath: "circle(50% at 50% 50%)",
				});
			}
			if (openIconRef.current) {
				gsap.set(openIconRef.current, {
					y: 0,
					autoAlpha: 1,
				});
			}
			if (closeIconRef.current) {
				gsap.set(closeIconRef.current, {
					y: 100,
					autoAlpha: 0,
				});
			}
		})();

		return () => {
			slideItemsRef.current = [];
			if (productsRef.current) {
				productsRef.current.innerHTML = "";
			}
		};
	}, [addSlideItem, updateSliderPosition, updatePreviewContent, contextSafe]);

	// Update button states when animation/preview state changes
	useEffect(() => {
		updateButtonStates();
	}, [updateButtonStates]);

	const currentProduct = isCowo
		? itemsCowo[getActualIndex(currentIndex)]
		: itemsCewe[getActualIndex(currentIndex)];

	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (isPreviewOpen || isPreviewAnimating || scrollTimeoutRef.current)
				return;

			scrollTimeoutRef.current = setTimeout(() => {
				scrollTimeoutRef.current = null;
			}, 800);

			if (e.deltaY > 0) {
				movePrev();
			} else {
				moveNext();
			}
		};

		window.addEventListener("wheel", handleWheel);
		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
				scrollTimeoutRef.current = null;
			}
		};
	}, [moveNext, movePrev, isPreviewOpen, isPreviewAnimating]);

	return (
		<section
			ref={containerRef}
			className="relative w-full h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"
		>
			<div className="flex lg:flex-row flex-col justify-center items-center w-full lg:gap-4 gap-2 p-4 absolute top-20">
				<p className="font-mirage font-semibold text-foreground lg:text-4xl text-2xl text-center">
					Daftar Perlengkapan
				</p>
				<p className="font-mirage font-semibold text-foreground lg:text-4xl text-2xl text-center">
					{isCowo ? "Mahasiswa" : "Mahasiswi"}
				</p>
			</div>
			<div className="gallery absolute w-full h-svh overflow-hidden">
				<ul
					ref={productsRef}
					className="products absolute w-75 h-75 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2"
				/>

				<div className="controller absolute bottom-8 left-1/2 -translate-x-1/2 w-44 h-44 select-none cursor-pointer z-10">
					<button
						ref={controllerInnerRef}
						type="button"
						onClick={togglePreview}
						className="controller-inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-foreground rounded-full flex items-center justify-center cursor-pointer z-1 [clip-path:circle(40%_at_50%_50%)] will-change-[clip-path] border-none overflow-hidden"
					>
						<div
							ref={openIconRef}
							className="absolute w-full h-full flex items-center justify-center text-background"
						>
							<MaximizeIcon className="w-5 h-5" />
						</div>
						<div
							ref={closeIconRef}
							className="absolute w-full h-full flex items-center justify-center gap-2 translate-y-25 opacity-0 text-background"
						>
							<CircleXIcon className="w-7 h-7" />
						</div>
					</button>

					<div
						ref={controllerOuterRef}
						className="controller-outer absolute top-0 left-0 w-full h-full bg-primary rounded-full -z-1 [clip-path:circle(50%_at_50%_50%)] will-change-[clip-path] text-background"
					>
						<button
							ref={prevBtnRef}
							type="button"
							onClick={() => {
								if (isCowo) return;
								setIsCowo(true);
							}}
							className="nav-btn prev absolute top-8 transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-lg text-background cursor-pointer will-change-[opacity] border-none"
						>
							<div
								className={`p-1 ${isCowo ? "bg-foreground text-primary-muted" : "bg-transparent text-background"}  rounded-full hover:bg-foreground transition-colors`}
							>
								<MahasiswaSvg className="w-8 h-8" />
							</div>{" "}
						</button>

						<button
							ref={prevBtnRef}
							type="button"
							onClick={() => {
								if (!isCowo) return;
								setIsCowo(false);
							}}
							className="nav-btn prev absolute -bottom-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 text-lg text-background cursor-pointer will-change-[opacity] border-none"
						>
							<div
								className={`p-1 ${!isCowo ? "bg-foreground text-primary-muted" : "bg-transparent text-background"}  rounded-full hover:bg-foreground transition-colors`}
							>
								<MahasiswiSvg className="w-8 h-8" />
							</div>
						</button>

						<button
							ref={prevBtnRef}
							type="button"
							onClick={movePrev}
							className="nav-btn prev absolute top-1/2 -translate-y-1/2 left-4 text-lg text-background cursor-pointer will-change-[opacity] border-none"
						>
							<FastForwardIcon className="transform -scale-x-100" />
						</button>
						<button
							ref={nextBtnRef}
							type="button"
							onClick={moveNext}
							className="nav-btn next absolute top-1/2 -translate-y-1/2 right-4 text-lg text-background cursor-pointer will-change-[opacity] border-none"
						>
							<FastForwardIcon />
						</button>
					</div>
				</div>
			</div>

			<div
				ref={productBannerRef}
				className="product-banner absolute top-0 left-0 w-full h-full z-1 opacity-0 will-change-[opacity]"
			>
				<Image
					ref={bannerImgRef as React.RefObject<HTMLImageElement | null>}
					src={currentProduct.image}
					alt={currentProduct.name}
					height={1000}
					width={1000}
					className="w-full h-full object-cover scale-105 blur-lg"
				/>
			</div>

			<div
				ref={productPreviewRef}
				className="product-preview absolute top-[50%] left-1/2 -translate-x-1/2 translate-y-full w-[30%] max-md:w-[calc(100%-2rem)] px-4 py-8 rounded-lg bg-primary/30 backdrop-blur-[20px] flex flex-col gap-8 z-2"
			>
				<div className="product-preview-info flex items-center gap-2">
					<div className="product-preview-name">
						<p
							ref={previewNameRef}
							className="text-[0.95rem] font-medium text-foreground"
						>
							{currentProduct.name}
						</p>
					</div>
					<div className="product-preview-tag px-2 py-1 rounded bg-foreground text-background">
						<p ref={previewTagRef} className="text-xs font-medium uppercase ">
							{currentProduct.tag}
						</p>
					</div>
				</div>

				<div className="product-preview-img w-full aspect-square rounded overflow-hidden">
					<Image
						ref={previewImgRef as React.RefObject<HTMLImageElement | null>}
						src={currentProduct.image}
						alt={currentProduct.name}
						height={500}
						width={500}
						className="w-full h-full object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
