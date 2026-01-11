"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 90;
const TOP_THRESHOLD = 1350;
const currentFrame = (index: number) =>
	`/bg-frame/hd/${(index + 1).toString()}.jpg`;

export function useHomeHero() {
	const parentRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const videoFramesRef = useRef({ frame: 0 });
	const isLoadedRef = useRef(false);
	const heroImgTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const isInHeroRef = useRef(true);
	const isUserScrollingRef = useRef(false);
	const scrollStopTimeoutRef = useRef<number | null>(null);
	const [isNavHidden, setIsNavHidden] = useState(false);
	const isNavHiddenRef = useRef<boolean | null>(null);
	const [isAtTop, setIsAtTop] = useState(true);
	const isAtTopRef = useRef<boolean | null>(null);

	const syncNavHidden = useCallback(() => {
		const nextIsHidden = isInHeroRef.current && isUserScrollingRef.current;
		if (isNavHiddenRef.current === nextIsHidden) return;
		isNavHiddenRef.current = nextIsHidden;
		setIsNavHidden(nextIsHidden);
	}, []);

	const render = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const canvasWidth = window.innerWidth;
		const canvasHeight = window.innerHeight;

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		const img = imagesRef.current[videoFramesRef.current.frame];
		if (img?.complete && img.naturalWidth > 0) {
			const imageAspect = img.naturalWidth / img.naturalHeight;
			const canvasAspect = canvasWidth / canvasHeight;

			let drawWidth: number;
			let drawHeight: number;
			let drawX: number;
			let drawY: number;

			if (imageAspect > canvasAspect) {
				drawHeight = canvasHeight;
				drawWidth = drawHeight * imageAspect;
				drawX = (canvasWidth - drawWidth) / 2;
				drawY = 0;
			} else {
				drawWidth = canvasWidth;
				drawHeight = drawWidth / imageAspect;
				drawX = 0;
				drawY = (canvasHeight - drawHeight) / 2;
			}

			ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
		}
	}, []);

	const setCanvasSize = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const pixelRatio = window.devicePixelRatio || 1;
		canvas.width = window.innerWidth * pixelRatio;
		canvas.height = window.innerHeight * pixelRatio;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		// Prevent scale compounding on repeated resize calls.
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	}, []);

	useEffect(() => {
		let imagesToLoad = FRAME_COUNT;
		const images: HTMLImageElement[] = [];

		const onLoad = () => {
			imagesToLoad--;

			if (imagesToLoad === 0 && !isLoadedRef.current) {
				isLoadedRef.current = true;
				imagesRef.current = images;
				setCanvasSize();
				render();
			}
		};

		for (let i = 0; i < FRAME_COUNT; i++) {
			const img = new Image();
			img.onload = onLoad;
			img.onerror = onLoad;
			img.src = currentFrame(i);
			images.push(img);
		}
	}, [setCanvasSize, render]);

	useGSAP(
		() => {
			ScrollTrigger.getById("hero-sequence")?.kill();
			syncNavHidden();

			gsap.set(".scroll-down-animate", {
				autoAlpha: 1,
				scale: 1,
				transformOrigin: "50% 50%",
			});

			const heroImgItems = gsap.utils.toArray<HTMLElement>(".hero-img img");
			if (heroImgItems.length > 0) {
				gsap.set(".hero-img", { autoAlpha: 0, transformStyle: "preserve-3d" });
				gsap.set(heroImgItems, {
					autoAlpha: 0,
					scale: 5,
					y: -140,
					transformOrigin: "50% 50%",
					force3D: true,
				});

				heroImgTimelineRef.current = gsap
					.timeline({ paused: true })
					.set(".hero-img", { autoAlpha: 1 })
					.to(heroImgItems, {
						autoAlpha: 1,
						scale: 1,
						y: 0,
						duration: 1.5,
						stagger: 1,
						ease: "power4.out",
					});
			}

			gsap.fromTo(
				".header",
				{
					autoAlpha: 0,
					scale: 2,
				},
				{
					autoAlpha: 1,
					scale: 1,
					duration: 1,
					ease: "power4.out",
				},
			);

			const heroTrigger = ScrollTrigger.create({
				id: "hero-sequence",
				trigger: ".hero",
				start: "top top",
				end: `+=${window.innerHeight * 7}px`,
				pin: true,
				pinSpacing: true,
				scrub: 1,
				onEnter: () => {
					isInHeroRef.current = true;
					syncNavHidden();
				},
				onEnterBack: () => {
					isInHeroRef.current = true;
					syncNavHidden();
				},
				onLeave: () => {
					isInHeroRef.current = false;
					syncNavHidden();
				},
				onLeaveBack: () => {
					isInHeroRef.current = false;
					syncNavHidden();
				},
				onUpdate: (self) => {
					const progress = self.progress;

					const animationProgress = Math.min(progress / 0.9, 1);
					const targetFrame = Math.round(animationProgress * (FRAME_COUNT - 1));
					videoFramesRef.current.frame = targetFrame;
					render();

					if (progress <= 0.25) {
						const zProgress = progress / 0.25;
						const translateZ = zProgress * -500;

						let opacity = 1;
						if (progress >= 0.2) {
							const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
							opacity = 1 - fadeProgress;
						}

						gsap.set(".header", {
							z: translateZ,
							opacity,
						});
					} else {
						gsap.set(".header", {
							opacity: 0,
						});
					}

					const heroImgTl = heroImgTimelineRef.current;
					if (heroImgTl) {
						const t = (progress - 0.6) / 0.3;
						const clamped = Math.min(1, Math.max(0, t));
						heroImgTl.progress(clamped);
					}

					gsap.to(".scroll-down-animate", {
						autoAlpha: progress >= 0.15 ? 0 : 1,
						scale: progress >= 0.15 ? 0.8 : 1,
						duration: 0.2,
						ease: "power1.out",
						overwrite: "auto",
					});
				},
			});

			isInHeroRef.current = heroTrigger.isActive;
			syncNavHidden();

			return () => {
				heroTrigger.kill();
				heroImgTimelineRef.current?.kill();
			};
		},
		{ scope: parentRef, dependencies: [render, syncNavHidden] },
	);

	useEffect(() => {
		const syncIsAtTop = () => {
			const nextIsAtTop = window.scrollY <= TOP_THRESHOLD;
			if (isAtTopRef.current === nextIsAtTop) return;
			isAtTopRef.current = nextIsAtTop;
			setIsAtTop(nextIsAtTop);
		};

		const onScroll = () => {
			syncIsAtTop();

			if (!isInHeroRef.current) {
				if (scrollStopTimeoutRef.current !== null) {
					window.clearTimeout(scrollStopTimeoutRef.current);
					scrollStopTimeoutRef.current = null;
				}
				isUserScrollingRef.current = false;
				syncNavHidden();
				return;
			}

			isUserScrollingRef.current = true;
			syncNavHidden();

			if (scrollStopTimeoutRef.current !== null) {
				window.clearTimeout(scrollStopTimeoutRef.current);
			}
			scrollStopTimeoutRef.current = window.setTimeout(() => {
				isUserScrollingRef.current = false;
				syncNavHidden();
			}, 320);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		syncIsAtTop();
		syncNavHidden();

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (scrollStopTimeoutRef.current !== null) {
				window.clearTimeout(scrollStopTimeoutRef.current);
				scrollStopTimeoutRef.current = null;
			}
		};
	}, [syncNavHidden]);

	useEffect(() => {
		const handleResize = () => {
			setCanvasSize();
			render();
			ScrollTrigger.refresh();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setCanvasSize, render]);

	return {
		parentRef,
		canvasRef,
		isNavHidden,
		isAtTop,
	};
}
