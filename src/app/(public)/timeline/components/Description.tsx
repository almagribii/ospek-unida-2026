"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineItem,
} from "@/components/TimelineV2";
import { timelineData as data } from "./timelineData";

export default function Description() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const timelineRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const tween = gsap.timeline({
				scrollTrigger: {
					trigger: timelineRef.current,
					start: "top 75%",
					toggleActions: "play none none reverse",
				},
			});

			tween
				.from(timelineRef.current, {
					x: -200,
					ease: "power3.out",
					duration: 0.8,
				})
				.from("span", {
					x: 100,
					ease: "power3.out",
				});
		},
		{ scope: timelineRef },
	);

	useGSAP(
		() => {
			gsap.from("#timeline-highlights", {
				y: 400,
				autoAlpha: 100,
				ease: "power3.out",
				scrollTrigger: {
					trigger: timelineRef.current,
					start: "top 75%",
					toggleActions: "play none none reverse",
				},
			});
		},
		{ scope: sectionRef },
	);
	return (
		<section
			ref={sectionRef}
			className="bg-[linear-gradient(rgba(243,243,243,1),rgba(0,0,0,0.2)),url('/background/white_texture.webp')] bg-cover bg-center p-8 md:p-12 flex flex-col gap-12 overflow-hidden"
		>
			<div className="bg-foreground relative p-6 md:p-10 rounded-xl overflow-hidden">
				<div
					ref={timelineRef}
					className="absolute hidden lg:flex flex-col items-center justify-center left-5 h-full max-h-72 w-full max-w-20 bg-secondary text-foreground text-2xl font-mirage font-semibold"
				>
					<div className="flex flex-col items-center h-full justify-center">
						<span className="overflow-hidden">T</span>
						<span className="overflow-hidden">I</span>
						<span className="overflow-hidden">M</span>
						<span className="overflow-hidden">E</span>
						<span className="overflow-hidden">L</span>
						<span className="overflow-hidden">I</span>
						<span className="overflow-hidden">N</span>
						<span className="overflow-hidden">E</span>
					</div>
				</div>
				<div id="timeline-highlights">
					<Timeline>
						{data.map((item, index) => {
							return (
								<TimelineItem key={`${item.title}-${index}`}>
									<TimelineDot>{index + 1}</TimelineDot>
									<TimelineContent className="flex flex-col">
										<span className="text-secondary-muted">{item.date}</span>
										<span className="text-background">{item.title}</span>
									</TimelineContent>
								</TimelineItem>
							);
						})}
					</Timeline>
				</div>
			</div>
		</section>
	);
}
