"use client";

import { useEffect, useState } from "react";
import { ScrollDown } from "@/app/(home)/components/ScrollDown";
import Shuffle from "@/components/Shuffle";
import type { dataUkm } from "./ukm-data";

interface UKMCounterProps {
	activeIndex: number;
	members: dataUkm[];
}

export function UKMCounter({ activeIndex, members }: UKMCounterProps) {
	const [showScrollDown, setShowScrollDown] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setShowScrollDown(false);
			} else {
				setShowScrollDown(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className="team-counter"
			style={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "40px 0",
			}}
		>
			<div className="count text-center flex flex-col items-center gap-8">
				<div className="count-container text-center"></div>
				<div
					id="scroll-down"
					className={`scale-75 md:scale-100 z-20 flex justify-center transition-opacity duration-300 ${
						showScrollDown ? "opacity-100" : "opacity-0 pointer-events-none"
					}`}
				>
					<ScrollDown />
				</div>
				<Shuffle
					key={activeIndex}
					text={members[activeIndex]?.title || "UKM"}
					shuffleDirection="right"
					duration={0.35}
					animationMode="evenodd"
					shuffleTimes={1}
					ease="power3.out"
					stagger={0.03}
					threshold={0}
					triggerOnce={false}
					triggerOnHover={false}
					respectReducedMotion={false}
					loop={false}
					loopDelay={0}
					className="font-mirage text-4xl md:text-7xl lg:text-8xl font-bold"
				/>
			</div>
		</div>
	);
}
