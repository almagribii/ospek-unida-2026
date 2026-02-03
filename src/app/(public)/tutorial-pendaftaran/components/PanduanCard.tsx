"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { StepItem } from "./tutorialData";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface PanduanCardProps {
	steps: StepItem[];
	imageSrc: StaticImageData;
}

export const PanduanCard: React.FC<PanduanCardProps> = ({
	steps,
	imageSrc,
}) => {
	const cardRef = useRef(null);
	const imageRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(cardRef.current, {
				y: 50,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top 85%",
				},
			});
		});
		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={cardRef}
			className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-lg rounded-2xl mb-8 transition-all duration-300 hover:shadow-2xl border-l-4 border-primary"
		>
			{imageSrc && (
				<div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg mb-8">
					<div className="relative w-full bg-slate-50 flex justify-center items-center group">
						<Image
							ref={imageRef}
							src={imageSrc}
							alt="Tutorial"
							className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 p-4"
							placeholder="blur"
						/>
						<div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
				</div>
			)}

			<div className="space-y-6">
				{steps.map((stepItem) => {
					return (
						<div
							key={stepItem.step}
							className="w-full flex flex-col sm:flex-row gap-6"
						>
					
							<div className="flex-1">
								<h3 className="font-mirage text-sm sm:text-2xl font-semibold text-slate-900">
									{stepItem.step}.{" "}
									{stepItem.title}
								</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
