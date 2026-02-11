"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { type JSX, useLayoutEffect, useRef, useState } from "react";
import { UKMCards } from "./UKMCards";
import { UKMCounter } from "./UKMCounter";
import { type dataUkm, dataUkmPutra, dataUkmPutri } from "./ukm-data";

gsap.registerPlugin(ScrollTrigger);

export function UKMSection(): JSX.Element {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeGender, setActiveGender] = useState<"mahasiswa" | "mahasiswi">(
		"mahasiswa",
	);
	const [selectedUKM, setSelectedUKM] = useState<dataUkm | null>(null);
	const genderRef = useRef(activeGender);
	const handleResizeRef = useRef<(() => void) | null>(null);
	const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useLayoutEffect(() => {
		genderRef.current = activeGender;
		setActiveIndex(0);
	}, [activeGender]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: activeGender is necessary to reinitialize animations when displayed cards change
	useLayoutEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

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
						visibility: "visible",
						willChange: "transform, opacity",
					});

					const totalCards = cards.length;
					const isMobile = window.innerWidth < 900;
					const stickyHeight = isMobile
						? window.innerHeight * (0.2 + totalCards * 0.25)
						: window.innerHeight * (0.25 + totalCards * 0.35);
					const arcAngle = Math.PI * 0.4;
					const startAngle = Math.PI / 2 - arcAngle / 2 + 0.63;
					const getRadius = () =>
						isMobile ? window.innerWidth * 4.5 : window.innerWidth * 2.5;

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
								top: centerY - 50 + radius,
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

					gsap.to(cards, {
						opacity: 1,
						duration: 0.3,
						overwrite: "auto",
					});

					ScrollTrigger.create({
						trigger: section,
						start: "top top",
						end: `+=${stickyHeight}px`,
						pin: true,
						pinSpacing: true,
						onUpdate: updateOnScroll,
						invalidateOnRefresh: true,
						fastScrollEnd: true,
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
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}

			if (handleResizeRef.current) {
				window.removeEventListener("resize", handleResizeRef.current);
				handleResizeRef.current = null;
			}

			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});

			if (ctxRef.current) {
				ctxRef.current.revert();
				ctxRef.current = null;
			}
		};
	}, [activeGender]);

	return (
		<>
			<section className="team" ref={sectionRef}>
				<UKMCards activeGender={activeGender} onSelectUKM={setSelectedUKM} />
			</section>
			<UKMCounter
				activeIndex={activeIndex}
				activeGender={activeGender}
				onGenderChange={setActiveGender}
				members={activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri}
			/>

			{selectedUKM && (
				<div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
					<button
						type="button"
						className="fixed inset-0 bg-black/40 backdrop-blur-sm"
						onClick={() => setSelectedUKM(null)}
						onKeyDown={(e) => e.key === "Escape" && setSelectedUKM(null)}
						aria-label="Tutup modal"
					/>

					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-hidden">
						<div
							className="relative pointer-events-auto bg-white rounded-3xl overflow-hidden w-full max-h-[90vh] flex flex-col md:flex-row md:max-w-5xl shadow-2xl"
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => e.stopPropagation()}
							role="document"
						>
							<button
								onClick={() => setSelectedUKM(null)}
								type="button"
								className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center transition-all duration-300"
								aria-label="Tutup modal"
							>
								<svg
									className="w-6 h-6 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>

							<div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gray-100 overflow-hidden shrink-0">
								<Image
									src={selectedUKM.image}
									alt={selectedUKM.title}
									fill
									priority
									quality={90}
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 40vw"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
							</div>

							<div className="overflow-y-auto flex-1 p-8 md:p-10 flex flex-col justify-center gap-6">
								<div>
									<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
										{selectedUKM.title}
									</h2>
									<div className="h-1 w-16 bg-linear-to-r from-blue-500 to-orange-500 rounded-full" />
								</div>

								<p className="text-gray-700 text-sm md:text-base leading-relaxed">
									{selectedUKM.description}
								</p>

								<div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
										<p className="text-sm text-gray-700">
											Terbuka untuk semua mahasiswa yang tertarik
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
										<p className="text-sm text-gray-700">
											Mengembangkan keterampilan dan pengalaman bersama
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
										<p className="text-sm text-gray-700">
											Komunitas yang aktif dan saling mendukung
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
