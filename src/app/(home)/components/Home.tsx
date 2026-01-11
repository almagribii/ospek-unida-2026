"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ScrollDown } from "./ScrollDown";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const currentFrame = (index: number) =>
	`/bg-frame/hd/${(index + 1).toString()}.jpg`;

export default function Home() {
	const parentRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const videoFramesRef = useRef({ frame: 0 });
	const isLoadedRef = useRef(false);
	const heroImgTimelineRef = useRef<gsap.core.Timeline | null>(null);

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
		ctx.scale(pixelRatio, pixelRatio);
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
			img.onerror = () => {
				onLoad();
			};
			img.src = currentFrame(i);
			images.push(img);
		}
	}, [setCanvasSize, render]);

	useGSAP(
		() => {
			gsap.set(".scroll-down-animate", {
				autoAlpha: 1,
				scale: 1,
				transformOrigin: "50% 50%",
			});

			// Create a single timeline once. We'll scrub its progress via the ScrollTrigger below.
			const heroImgItems = gsap.utils.toArray<HTMLElement>(".hero-img img");
			if (heroImgItems.length > 0) {
				gsap.set(".hero-img", { autoAlpha: 0 });
				gsap.set(heroImgItems, {
					autoAlpha: 0,
					scale: 0.75,
					y: 24,
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
						duration: 1,
						stagger: 1,
						ease: "power2.out",
					});
			}

			ScrollTrigger.create({
				trigger: ".hero",
				start: "top top",
				end: `+=${window.innerHeight * 7}px`,
				pin: true,
				pinSpacing: true,
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					const animationProgress = Math.min(progress / 0.9, 1);
					const targetFrame = Math.round(animationProgress * (FRAME_COUNT - 1));
					videoFramesRef.current.frame = targetFrame;
					render();

					if (progress <= 0.1) {
						const navProgress = progress / 0.1;
						const opacity = 1 - navProgress;
						gsap.set(".nav", { opacity });
					} else {
						gsap.set(".nav", { opacity: 0 });
					}

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
		},
		{ scope: parentRef, dependencies: [render] },
	);

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
	return (
		<div ref={parentRef}>
			<section className="hero relative w-full h-svh overflow-hidden">
				<canvas
					ref={canvasRef}
					className="w-full h-full object-cover absolute inset-0"
				/>
				<div className="absolute inset-0 grid place-items-center perspective-[1000px] transform-3d">
					<div className="header absolute transform-3d p-4">
						<Img
							className="object-contain h-auto"
							src="/logo/AKHYAR V+.webp"
							alt="akhyar-logo"
							height={500}
							width={500}
						/>
					</div>
					<div className="absolute inset-x-0 bottom-14 z-20 flex justify-center scroll-down-animate">
						<ScrollDown />
					</div>
					<div className="hero-img absolute will-change-[transform,opacity] rounded-lg space-y-4">
						<Img
							className="h-auto shadow-2xl rounded-lg"
							src="/background/White Texture Background.png"
							alt="bg-akhyar"
							height={300}
							width={700}
						/>
						<Img
							className="h-auto shadow-2xl rounded-lg"
							src="/background/White Texture Background.png"
							alt="bg-akhyar"
							height={150}
							width={700}
						/>
						<Img
							className="h-auto shadow-2xl rounded-lg"
							src="/background/White Texture Background.png"
							alt="bg-akhyar"
							height={300}
							width={700}
						/>
					</div>
				</div>
			</section>
			<section className="outro relative w-full h-svh overflow-hidden flex justify-center items-center text-center p-4 bg-background text-foreground">
				<h1>Selamat datang di akhyarr!!</h1>
			</section>
		</div>
	);
}
