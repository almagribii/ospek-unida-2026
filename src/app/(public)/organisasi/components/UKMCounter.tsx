"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollDown } from "@/app/(home)/components/ScrollDown";
import { MahasiswaSvg } from "@/components/MahasiswaSvg";
import { MahasiswiSvg } from "@/components/MahasiswiSvg";
import Shuffle from "@/components/Shuffle";
import type { dataUkm } from "./ukm-data";

interface UKMCounterProps {
	activeIndex: number;
	members: dataUkm[];
	activeGender: "mahasiswa" | "mahasiswi";
	onGenderChange: (gender: "mahasiswa" | "mahasiswi") => void;
}

export function UKMCounter({
	activeIndex,
	members,
	activeGender,
	onGenderChange,
}: UKMCounterProps) {
	const [showScrollDown, setShowScrollDown] = useState(true);
	const [animationTrigger, setAnimationTrigger] = useState(0);
	const prevTitleRef = useRef<string | undefined>(undefined);

	useEffect(() => {
		const currentTitle = members[activeIndex]?.title;
		if (currentTitle !== prevTitleRef.current) {
			prevTitleRef.current = currentTitle;
			setAnimationTrigger((prev) => prev + 1);
		}
	}, [activeIndex, members]);

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

	const textLength = members[activeIndex]?.title?.length || 0;
	const isLongText = textLength > 10;

	return (
		<div>
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
				<div className="count text-center flex flex-col items-center gap-4">
					<div className="count-container text-center"></div>
					<div
						id="scroll-down"
						className={`scale-60 md:scale-70 z-20 flex justify-center transition-opacity duration-300 ${
							showScrollDown ? "opacity-100" : "opacity-0 pointer-events-none"
						}`}
					>
						<ScrollDown />
					</div>
					<div className="flex justify-center mb-4 lg:mb-2 relative z-20">
						<div className="w-fit rounded-4xl bg-foreground p-2">
							<div className="flex flex-row gap-2 items-center justify-center">
								<button
									type="button"
									onClick={() => onGenderChange("mahasiswa")}
									className={`p-2 rounded-full ${
										activeGender === "mahasiswa"
											? "bg-primary text-background hover:text-background/75 hover:bg-primary/75"
											: "bg-background text-foreground hover:bg-primary hover:text-background"
									} transition-colors cursor-pointer`}
								>
									<MahasiswaSvg className="h-8 w-8" />
								</button>
								<Shuffle
									key={animationTrigger}
									text={members[activeIndex]?.title || "UKM"}
									shuffleDirection="right"
									duration={0.35}
									animationMode="evenodd"
									shuffleTimes={1}
									ease="power3.out"
									stagger={0.01}
									threshold={0}
									triggerOnce={false}
									triggerOnHover={false}
									respectReducedMotion={false}
									loop={false}
									loopDelay={0}
									className={`font-mirage ${isLongText ? "text-xl sm:text-2xl md:text-4xl lg:text-5xl" : "text-3xl md:text-4xl lg:text-5xl"} px-4 text-white font-bold`}
								/>
								<button
									type="button"
									onClick={() => onGenderChange("mahasiswi")}
									className={`p-2 rounded-full ${
										activeGender === "mahasiswi"
											? "bg-primary text-background hover:text-background/75 hover:bg-primary/75"
											: "bg-background text-foreground hover:bg-primary hover:text-background"
									} transition-colors cursor-pointer`}
								>
									<MahasiswiSvg className="h-8 w-8" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
