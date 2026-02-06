"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type JSX, useEffect, useRef, useState } from "react";
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

	useEffect(() => {
		genderRef.current = activeGender;
	}, [activeGender]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: activeGender is necessary to reinitialize animations when displayed cards change
	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		let handleResize: (() => void) | undefined;
		let ctx: ReturnType<typeof gsap.context> | undefined;

		const timeoutId = setTimeout(() => {
			try {
				ctx = gsap.context(() => {
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

					handleResize = () => {
						positionCards(0);
						ScrollTrigger.refresh();
					};

					window.addEventListener("resize", handleResize);
				}, section);
			} catch (error) {
				console.error("Error initializing UKM animations:", error);
			}

			return () => {
				clearTimeout(timeoutId);
				if (handleResize) {
					window.removeEventListener("resize", handleResize);
				}
				if (ctx) {
					ctx.revert();
				}
			};
		}, 50);

		return () => {
			clearTimeout(timeoutId);
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});
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
