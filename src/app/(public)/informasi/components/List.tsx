"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { informations } from "./data";

gsap.registerPlugin(ScrollToPlugin);

export default function List() {
	const containerRef = useRef<HTMLDivElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const informationsListRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const POSITIONS = {
		BOTTOM: 0,
		MIDDLE: -80,
		TOP: -160,
	};

	const scrollToSection = (id: string) => {
		gsap.to(window, {
			duration: 1.5,
			scrollTo: `${id}`,
			ease: "expo.out",
		});
	};

	useGSAP(
		() => {
			// Mouse movement state
			const mouseState = {
				lastX: 0,
				lastY: 0,
				activeInformation: null as HTMLElement | null,
			};

			// Helper to animate image removal
			const removeImages = (
				images: NodeListOf<HTMLImageElement> | HTMLImageElement[],
			) => {
				images.forEach((img) => {
					gsap.to(img, {
						scale: 0,
						duration: 0.4,
						ease: "power2.out",
						onComplete: () => img.remove(),
					});
				});
			};

			// Global Mouse Move Handler
			const handleGlobalMouseMove = (e: MouseEvent) => {
				mouseState.lastX = e.clientX;
				mouseState.lastY = e.clientY;

				if (!informationsListRef.current || !previewRef.current) return;

				const informationsListRect =
					informationsListRef.current.getBoundingClientRect();
				const isInside =
					mouseState.lastX >= informationsListRect.left &&
					mouseState.lastX <= informationsListRect.right &&
					mouseState.lastY >= informationsListRect.top &&
					mouseState.lastY <= informationsListRect.bottom;

				// Logic: If outside the list area, clear previews
				if (!isInside) {
					const images = previewRef.current.querySelectorAll("img");
					if (images.length > 0) removeImages(images);
				}
			};

			// Interaction handlers for specific list items
			const handleMouseEnter = (
				imageSrc: string,
				wrapper: HTMLElement,
				item: HTMLElement,
			) => {
				mouseState.activeInformation = item;

				// Animate Wrapper
				gsap.to(wrapper, {
					y: POSITIONS.MIDDLE,
					duration: 0.4,
					ease: "power2.out",
				});

				// Append Preview Image
				if (previewRef.current) {
					const img = document.createElement("img");
					// Use image from information data
					img.src = imageSrc;
					img.className =
						"absolute top-0 left-0 w-full h-full object-cover transform scale-0 z-10";

					previewRef.current.appendChild(img);

					gsap.to(img, {
						scale: 1,
						duration: 0.4,
						ease: "power2.out",
					});
				}
			};

			const handleMouseLeave = (
				e: MouseEvent,
				wrapper: HTMLElement,
				item: HTMLElement,
			) => {
				mouseState.activeInformation = null;
				const rect = item.getBoundingClientRect();
				const leavingFromTop = e.clientY < rect.top + rect.height / 2;

				gsap.to(wrapper, {
					y: leavingFromTop ? POSITIONS.TOP : POSITIONS.BOTTOM,
					duration: 0.4,
					ease: "power2.out",
				});
			};

			// Attach listeners to DOM elements directly
			// This replicates the vanilla 'forEach' loop behavior efficiently
			const items = containerRef.current?.querySelectorAll(".information-item");
			items?.forEach((item, index) => {
				const wrapper = item.querySelector(
					".information-wrapper",
				) as HTMLElement;
				const imageSrc = informations[index]?.image || "";

				item.addEventListener("mouseenter", () =>
					handleMouseEnter(imageSrc, wrapper, item as HTMLElement),
				);
				item.addEventListener("mouseleave", (e) =>
					handleMouseLeave(e as MouseEvent, wrapper, item as HTMLElement),
				);
			});

			window.addEventListener("mousemove", handleGlobalMouseMove);

			return () => {
				// Cleanup
				window.removeEventListener("mousemove", handleGlobalMouseMove);

				items?.forEach(() => {});
			};
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="bg-background min-h-screen w-full overflow-x-hidden selection:bg-primary selection:text-background"
		>
			{/* Informations Section */}
			<section className="min-h-screen h-max w-screen relative">
				<p className="font-mirage lg:text-4xl text-2xl font-bold px-5 py-2 mb-4">
					Daftar Informasi
				</p>

				<div
					ref={informationsListRef}
					className="informations-list border-t border-foreground w-full"
				>
					{informations.map((information, i) => (
						// biome-ignore lint/a11y/noStaticElementInteractions: enable click
						// biome-ignore lint/a11y/useKeyWithClickEvents: enable click
						<div
							key={`${information.name}-${i}`}
							className="information-item h-20 w-full border-b border-foreground cursor-pointer overflow-hidden clip-path-information"
							style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
							onClick={() => {
								information.image.startsWith("#")
									? scrollToSection(information.image)
									: router.push(information.link);
							}}
						>
							<div
								className="information-wrapper relative h-60 w-full will-change-transform"
								style={{ transform: `translateY(${POSITIONS.TOP}px)` }}
							>
								{/* Top Panel (Matches Bottom Panel) */}
								<div className="information-panel flex justify-between items-center h-20 px-4 bg-background">
									<h1 className=" text-lg md:text-xl uppercase tracking-widest">
										{information.name}
									</h1>
									<h1 className=" text-lg md:text-xl font-medium uppercase tracking-widest lg:px-4 px-0">
										{information.description}
									</h1>
								</div>

								{/* Middle Panel (Active State) */}
								<div className="information-panel flex justify-between items-center h-20 px-4 bg-foreground text-foreground">
									<h1 className=" text-lg md:text-xl text-primary-muted">
										{information.nameHover}
									</h1>
									<h1 className=" text-lg md:text-xl uppercase tracking-widest text-primary-muted lg:px-4 px-0">
										{information.descriptionHover}
									</h1>
								</div>

								{/* Bottom Panel (Default View) */}
								<div className="information-panel flex justify-between items-center h-20 px-4 bg-background">
									<h1 className=" text-lg md:text-xl uppercase tracking-widest">
										{information.name}
									</h1>
									<h1 className=" text-lg md:text-xl uppercase tracking-widest lg:px-4 px-0">
										{information.description}
									</h1>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Preview Container */}
			<div
				ref={previewRef}
				className="fixed bottom-4 right-4 md:w-[30%] md:h-[30%] w-[65%] h-[20%] z-20 pointer-events-none"
			>
				{/* Images are injected here by GSAP */}
			</div>
		</div>
	);
}
