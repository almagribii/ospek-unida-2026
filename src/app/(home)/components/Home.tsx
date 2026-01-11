"use client";

import { useGSAP } from "@gsap/react";
import { IconMenu2 } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollDown } from "./ScrollDown";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 90;
const TOP_THRESHOLD = 1350;
const currentFrame = (index: number) =>
	`/bg-frame/hd/${(index + 1).toString()}.jpg`;

export default function Home() {
	const parentRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imagesRef = useRef<HTMLImageElement[]>([]);
	const videoFramesRef = useRef({ frame: 0 });
	const isLoadedRef = useRef(false);
	const heroImgTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const isInHeroRef = useRef(true);
	const isUserScrollingRef = useRef(false);
	const scrollStopTimeoutRef = useRef<number | null>(null);
	const navShownRef = useRef<boolean | null>(null);
	const [isAtTop, setIsAtTop] = useState(true);
	const isAtTopRef = useRef<boolean | null>(null);

	const updateNavVisibility = useCallback(() => {
		const shouldShowNav = !isInHeroRef.current || !isUserScrollingRef.current;
		if (navShownRef.current === shouldShowNav) return;
		navShownRef.current = shouldShowNav;
		gsap.to(".nav", {
			autoAlpha: shouldShowNav ? 1 : 0,
			duration: 0.18,
			ease: "power1.out",
			overwrite: true,
		});
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
			ScrollTrigger.getById("hero-sequence")?.kill();
			gsap.killTweensOf(".nav");

			gsap.set(".scroll-down-animate", {
				autoAlpha: 1,
				scale: 1,
				transformOrigin: "50% 50%",
			});

			gsap.set(".nav", { autoAlpha: 1 });

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
						ease: "back.out",
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
					updateNavVisibility();
				},
				onEnterBack: () => {
					isInHeroRef.current = true;
					updateNavVisibility();
				},
				onLeave: () => {
					isInHeroRef.current = false;
					updateNavVisibility();
				},
				onLeaveBack: () => {
					isInHeroRef.current = false;
					updateNavVisibility();
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
			updateNavVisibility();
		},
		{ scope: parentRef, dependencies: [render] },
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
				updateNavVisibility();
				return;
			}

			isUserScrollingRef.current = true;
			updateNavVisibility();

			if (scrollStopTimeoutRef.current !== null) {
				window.clearTimeout(scrollStopTimeoutRef.current);
			}
			scrollStopTimeoutRef.current = window.setTimeout(() => {
				isUserScrollingRef.current = false;
				updateNavVisibility();
			}, 320);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		syncIsAtTop();
		updateNavVisibility();

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (scrollStopTimeoutRef.current !== null) {
				window.clearTimeout(scrollStopTimeoutRef.current);
				scrollStopTimeoutRef.current = null;
			}
		};
	}, [updateNavVisibility]);

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
			<nav className="nav fixed top-0 left-0 z-50 flex flex-row justify-between items-stretch w-full py-4 px-6 bg-transparent">
				<Link href="/">
					<div
						className={`group relative inline-flex w-[8em] h-[2.6em] items-center justify-center overflow-hidden cursor-pointer border rounded-md text-[17px] font-medium select-none before:content-[''] before:absolute before:top-full before:left-full before:h-40 before:w-50 before:rounded-full before:transition-[top,left] before:duration-700 before:-z-10 hover:before:-top-8 hover:before:-left-8 active:before:bg-foreground active:before:duration-0 drop-shadow-xl shadow-xl ${
							isAtTop
								? "lg:text-background text-foreground border-foreground lg:border-background before:bg-background hover:text-foreground"
								: "text-foreground border-foreground before:bg-foreground hover:text-background"
						}`}
					>
						<p className="font-mirage font-bold text-xl tracking-[0.2em] transition-[letter-spacing] duration-500 ease-out group-hover:tracking-normal">
							AKHYAR
						</p>
					</div>
				</Link>
				<div
					className={`flex gap-4 justify-center items-center ${
						isAtTop ? "lg:text-background text-foreground" : "text-foreground"
					}`}
				>
					<div className="cursor-pointer">
						<p className="hidden lg:block uppercase font-thin font-product-sans tracking-[0.3em] transition-[letter-spacing] duration-500 ease-out hover:tracking-widest text-shadow-md">
							MENU
						</p>
					</div>
					<div className="cursor-pointer">
						<IconMenu2 />
					</div>
				</div>
			</nav>
			<section className="hero relative w-full h-dvh overflow-hidden">
				<canvas
					ref={canvasRef}
					className="w-full h-full object-cover absolute inset-0"
				/>
				<div className="absolute inset-0 grid place-items-center perspective-[1000px] transform-3d">
					<div className="header absolute transform-3d p-4">
						<Img
							className="object-contain h-auto"
							src="/logo/akhyar_col.webp"
							alt="akhyar-logo"
							height={500}
							width={500}
						/>
					</div>
					<div className="absolute inset-x-0 bottom-14 z-20 flex justify-center scroll-down-animate">
						<ScrollDown />
					</div>
					<div className="hero-img absolute top-32 will-change-[transform,opacity] rounded-lg">
						<div className="w-125 h-18.75 lg:h-31.25 scale-50 lg:scale-100 flex justify-center">
							<Img
								className="object-contain"
								src="/assets/TOTALITY.webp"
								alt="bg-akhyar"
								height={150}
								width={500}
							/>
						</div>
						<div className="w-125 h-18.75 lg:h-31.25 scale-50 lg:scale-100 flex justify-center">
							<Img
								className="object-contain"
								src="/assets/MORALITY.webp"
								alt="bg-akhyar"
								height={165}
								width={500}
							/>
						</div>
						<div className="w-125 h-18.75 lg:h-31.25 scale-50 lg:scale-100 flex justify-center">
							<Img
								className="object-contain"
								src="/assets/AGILITY.webp"
								alt="bg-akhyar"
								height={150}
								width={375}
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="outro relative w-full h-dvh overflow-hidden flex justify-center items-center text-center p-4 bg-background text-foreground">
				<h1>Selamat datang di akhyarr!!</h1>
			</section>
		</div>
	);
}
