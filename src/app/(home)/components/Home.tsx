"use client";

import Navbar from "@/components/Navbar";
import { HeroSection } from "./HeroSection";
import { OutroSection } from "./OutroSection";
import { useHomeHero } from "./useHomeHero";

export default function Home() {
	const { parentRef, canvasRef, isNavHidden, isAtTop } = useHomeHero();
	return (
		<>
			<Navbar isHidden={isNavHidden} isAtTop={isAtTop} />

			<div ref={parentRef}>
				<HeroSection canvasRef={canvasRef} />
				<OutroSection />
			</div>
		</>
	);
}
