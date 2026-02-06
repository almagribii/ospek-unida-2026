"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type JSX, useLayoutEffect, useRef, useState } from "react";
import { UKMCards } from "./UKMCards";
import { UKMCounter } from "./UKMCounter";
import { UKMTabs } from "./UKMTabs";
import { dataUkmPutra, dataUkmPutri } from "./ukm-data";

gsap.registerPlugin(ScrollTrigger);

export function UKMSection(): JSX.Element {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeGender, setActiveGender] = useState<"mahasiswa" | "mahasiswi">(
		"mahasiswa",
	);
	const genderRef = useRef(activeGender);
	const handleResizeRef = useRef<(() => void) | null>(null);
	const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useLayoutEffect(() => {
		genderRef.current = activeGender;
	}, [activeGender]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: activeGender is necessary to reinitialize animations when displayed cards change
	useLayoutEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		// Cleanup previous context first
		if (ctxRef.current) {
			ctxRef.current.revert();
			ctxRef.current = null;
		}
		if (handleResizeRef.current) {
			window.removeEventListener("resize", handleResizeRef.current);
			handleResizeRef.current = null;
		}
		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		}

		// Kill all existing ScrollTriggers for this section
		ScrollTrigger.getAll().forEach((trigger) => {
			if (trigger.vars.trigger === section) {
				trigger.kill();
			}
		});

		timeoutIdRef.current = setTimeout(() => {
			try {
				ctxRef.current = gsap.context(() => {
					const cards = section.querySelectorAll<HTMLDivElement>(".card");
					const countContainer =
						document.querySelector<HTMLDivElement>(".count-container");

					if (!cards.length || !countContainer) {
						return;
					}

					gsap.set(cards, {
						position: "absolute",
						left: 0,
						top: 0,
						transformOrigin: "center center",
					});

					const totalCards = cards.length;
					const stickyHeight = window.innerHeight * (1 + totalCards * 0.8);
					const arcAngle = Math.PI * 0.4;
					const startAngle = Math.PI / 2 - arcAngle / 2 + 0.63;
					const getRadius = () =>
						window.innerWidth < 900
							? window.innerWidth * 7.5
							: window.innerWidth * 2.5;

					const positionCards = (progress = 0) => {
						const radius = getRadius();
						const cardSpacing = 0.15;
						const initialOffset = -cardSpacing * (totalCards - 1);
						const totalTravel = 1 - initialOffset;
						const arcProgress = initialOffset + progress * totalTravel;

						const centerX = window.innerWidth / 2;
						const centerY = window.innerHeight / 2;

						cards.forEach((card, i) => {
							const cardOffset = (totalCards - 1 - i) * cardSpacing;
							const cardProgress = cardOffset + arcProgress;
							const angle = startAngle + arcAngle * cardProgress;

							const x = Math.cos(angle) * radius;
							const y = Math.sin(angle) * radius;
							const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

							gsap.set(card, {
								left: centerX,
								top: centerY + radius,
								xPercent: -50,
								yPercent: -50,
								x: x,
								y: -y,
								rotation: -rotation,
							});
						});
					};

					const updateTeamCounter = () => {
						const cards = section.querySelectorAll<HTMLDivElement>(".card");
						const centerX = window.innerWidth / 2;
						const centerY = window.innerHeight / 2;

						let closestIndex = 0;
						let closestDistance = Infinity;

						cards.forEach((card, i) => {
							const rect = card.getBoundingClientRect();
							const cardCenterX = rect.left + rect.width / 2;
							const cardCenterY = rect.top + rect.height / 2;

							const distance = Math.sqrt(
								(cardCenterX - centerX) ** 2 + (cardCenterY - centerY) ** 2,
							);

							if (distance < closestDistance) {
								closestDistance = distance;
								closestIndex = i;
							}
						});

						setActiveIndex(closestIndex);
					};

					const updateOnScroll = (self: ScrollTrigger) => {
						positionCards(self.progress);
						updateTeamCounter();
					};

					positionCards(0);
					updateTeamCounter();

					ScrollTrigger.create({
						trigger: section,
						start: "top top",
						end: `+=${stickyHeight}px`,
						pin: true,
						pinSpacing: true,
						onUpdate: updateOnScroll,
						invalidateOnRefresh: true,
					});

					handleResizeRef.current = () => {
						positionCards(0);
						ScrollTrigger.refresh();
					};

					window.addEventListener("resize", handleResizeRef.current);
				}, section);
			} catch (error) {
				console.error("Error initializing UKM animations:", error);
			}
		}, 50);

		return () => {
			// Clear timeout first
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}

			// Remove resize listener
			if (handleResizeRef.current) {
				window.removeEventListener("resize", handleResizeRef.current);
				handleResizeRef.current = null;
			}

			// Kill all ScrollTriggers BEFORE reverting context
			// This ensures pins are properly cleaned up
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});

			// Revert GSAP context (restores DOM to original state)
			if (ctxRef.current) {
				ctxRef.current.revert();
				ctxRef.current = null;
			}
		};
	}, [activeGender]);

	return (
		<>
			<section
				className="team bg-[url('/background/white_texture.webp')]"
				ref={sectionRef}
			>
				<UKMTabs activeGender={activeGender} onGenderChange={setActiveGender} />
				<UKMCards activeGender={activeGender} />
			</section>
			<UKMCounter
				activeIndex={activeIndex}
				members={activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri}
			/>
		</>
	);
}
