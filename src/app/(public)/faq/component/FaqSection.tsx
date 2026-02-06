"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Accordian";
import { faqs } from "./FaqData";

gsap.registerPlugin(ScrollTrigger);

function FaqSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		// Check if desktop
		setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 1024);
	}, []);

	useGSAP(
		() => {
			// Animate title and description
			if (titleRef.current) {
				gsap.from(titleRef.current, {
					opacity: 0,
					y: -20,
					duration: 0.6,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				});
			}

			if (descRef.current) {
				gsap.from(descRef.current, {
					opacity: 0,
					duration: 0.6,
					delay: 0.2,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				});
			}

			// Animate accordion items
			itemsRef.current.forEach((item, index) => {
				if (item) {
					gsap.from(item, {
						opacity: 0,
						y: 30,
						duration: 0.4,
						delay: index * 0.1,
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 80%",
						},
					});
				}
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section
			className="relative overflow-hidden pt-20 pb-6 bg-[url('/background/white_texture.webp')]"
			id="faq"
			ref={sectionRef}
		>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute top-20 right-10 w-48 h-48 rounded-full blur-3xl animate-[orb-pulse_10s_ease-in-out_infinite]"
					style={{ backgroundColor: "rgba(66, 112, 237, 0.1)" }}
				/>
				<div
					className="absolute bottom-20 left-10 w-56 h-56 rounded-full blur-3xl animate-[orb-pulse_12s_ease-in-out_infinite_3s]"
					style={{ backgroundColor: "rgba(242, 138, 58, 0.1)" }}
				/>
				<div
					className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full blur-2xl animate-[orb-pulse_14s_ease-in-out_infinite_2s]"
					style={{ backgroundColor: "rgba(66, 112, 237, 0.05)" }}
				/>
			</div>

			<div className="container mx-auto px-4 py-4 relative z-10">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2
							ref={titleRef}
							className="text-4xl md:text-5xl font-bold mb-4"
							style={{ fontFamily: '"Mirage", serif' }}
						>
							Seputar{" "}
							<span
								style={{
									background: "linear-gradient(90deg, #4270ed, #f28a3a)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							>
								Ospek
							</span>
						</h2>
						<p
							ref={descRef}
							style={{ color: "#6b7280", fontFamily: '"Mirage", serif' }}
						>
							Temukan jawaban untuk pertanyaan umum tentang ospek
						</p>
					</div>

					<Accordion type="single" collapsible className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={faq.question}
								ref={(el) => {
									if (el) itemsRef.current[index] = el;
								}}
								className="relative"
							>
								<AccordionItem
									value={`item-${index}`}
									className="relative border rounded-xl backdrop-blur-sm transition-all duration-500 overflow-hidden group px-4 py-2 text-xl"
									style={{
										borderColor: "#d1d5db",
										backgroundColor: "rgba(255, 255, 255, 0.5)",
										fontFamily: '"Mirage", serif',
									}}
									onMouseEnter={(e) => {
										if (!isDesktop) return;
										e.currentTarget.style.borderColor =
											"rgba(66, 112, 237, 0.5)";
										e.currentTarget.style.boxShadow =
											"0 20px 25px -5px rgba(66, 112, 237, 0.2)";
										e.currentTarget.style.transform = "scale(1.02)";
									}}
									onMouseLeave={(e) => {
										if (!isDesktop) return;
										e.currentTarget.style.borderColor = "#d1d5db";
										e.currentTarget.style.boxShadow = "none";
										e.currentTarget.style.transform = "scale(1)";
									}}
								>
									{/* Animated linear background on hover */}
									<div
										className="absolute inset-0 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
										style={{
											background:
												"linear-gradient(90deg, rgba(66, 112, 237, 0), rgba(66, 112, 237, 0.05), rgba(66, 112, 237, 0))",
										}}
									/>

									{/* Shimmer effect */}
									<div
										className="absolute inset-0 -translate-x-full transition-transform duration-1000 md:group-hover:translate-x-full"
										style={{
											background:
												"linear-gradient(90deg, transparent, rgba(66, 112, 237, 0.1), transparent)",
										}}
									/>

									<AccordionTrigger
										className="relative text-left text-xl font-semibold py-6 transition-all duration-300 cursor-pointer md:hover:text-blue-600"
										style={{ color: "inherit" }}
									>
										<span className="flex items-center gap-3 transition-transform duration-300 md:group-hover:translate-x-2">
											<span
												className="w-2 h-2 rounded-full transition-all duration-300"
												style={
													{
														backgroundColor: "rgba(66, 112, 237, 0.5)",
														"--group-hover-bg": "rgb(66, 112, 237)",
													} as React.CSSProperties
												}
											/>
											{faq.question}
										</span>
									</AccordionTrigger>

									<AccordionContent
										className="relative leading-relaxed pb-6"
										style={{ color: "#6b7280" }}
									>
										<div
											className="pl-5 border-l-2 transition-colors duration-300 md:group-hover:border-opacity-100"
											style={{ borderColor: "rgba(66, 112, 237, 0.2)" }}
										>
											{faq.answer}
										</div>
									</AccordionContent>
								</AccordionItem>
							</div>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}

export default FaqSection;
