"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "next/image";
import { useCallback, useEffect, useRef } from "react";

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
							transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
							opacity,
						});
					} else {
						gsap.set(".header", {
							opacity: 0,
						});
					}

					if (progress < 0.6) {
						gsap.set(".hero-img", {
							transform: "translateZ(1000px)",
							opacity: 0,
						});
					} else if (progress >= 0.6 && progress <= 0.9) {
						const imgProgress = (progress - 0.6) / 0.3;
						const translateZ = 1000 - imgProgress * 1000;

						let opacity = 0;
						if (progress <= 0.8) {
							const opacityProgress = (progress - 0.6) / 0.2;
							opacity = opacityProgress;
						} else {
							opacity = 1;
						}

						gsap.set(".hero-img", {
							transform: `translateZ(${translateZ}px)`,
							opacity,
						});
					} else {
						gsap.set(".hero-img", {
							transform: "translateZ(0px)",
							opacity: 1,
						});
					}
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
				<canvas ref={canvasRef} className="w-full h-full object-cover" />
				<div className="hero-content absolute top-[25%] left-[50%] translate-x-[-50%] transform-3d prespective-[1000px] px-2 py-0">
					<div className="header absolute top-[50%] left-[50%] translate-[-50%] w-screen flex flex-col items-center gap-6 text-center text-foreground origin-center will-change-[transform,opacity]">
						<h1 className="w-[50%] mb-2 text-5xl font-medium leading-tight">
							Ospek 2026
						</h1>
						<p className="opacity-35 uppercase text-sm">Trusted by me</p>
						<div className="client-logos w-[30%] flex gap-2">
							<div className="client-logo flex-1">
								<Img
									src="/logo/AKHYAR V+.webp"
									alt="logo-akhyar"
									height={500}
									width={500}
									className="object-contain"
								/>
							</div>
							<div className="client-logo flex-1">
								<Img
									src="/logo/AKHYAR V+.webp"
									alt="logo-akhyar"
									height={500}
									width={500}
									className="object-contain"
								/>
							</div>
							<div className="client-logo flex-1">
								<Img
									src="/logo/AKHYAR V+.webp"
									alt="logo-akhyar"
									height={500}
									width={500}
									className="object-contain"
								/>
							</div>
							<div className="client-logo flex-1">
								<Img
									src="/logo/AKHYAR V+.webp"
									alt="logo-akhyar"
									height={500}
									width={500}
									className="object-cover w-full h-full"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="hero-img-container absolute top-[50%] left-[50%] translate-[-50%] w-[50%] transform-3d perspective-[1000px]">
					<div className="hero-img relative w-full h-full translate-z-250 opacity-0 will-change-[transform,opacity]">
						<Img
							src="/background/White Texture Background.png"
							alt="bg-akhyar"
							height={1080}
							width={1080}
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
