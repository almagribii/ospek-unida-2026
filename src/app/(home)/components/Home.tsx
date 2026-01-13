"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { HeroSection } from "./HeroSection";
import { OutroSection } from "./OutroSection";
import Preloader from "./Preloader";
import { useHomeHero } from "./useHomeHero";

export default function Home() {
	const { parentRef, canvasRef, isNavHidden, isAtTop } = useHomeHero();
	const [hidePreloader, setHidePreloader] = useState(false);
	const [assetsReady, setAssetsReady] = useState(false);
	const [timedOut, setTimedOut] = useState(false);

	const heroAssetUrls = useMemo(() => {
		const frameCount = 90;
		const frames = Array.from(
			{ length: frameCount },
			(_, i) => `/bg-frame/hd/${i + 1}.jpg`,
		);

		return [
			// Above-the-fold hero images
			"/logo/akhyar_col.webp",
			"/assets/TOTALITY.webp",
			"/assets/MORALITY.webp",
			"/assets/AGILITY.webp",
			// Canvas sequence frames
			...frames,
		];
	}, []);

	useEffect(() => {
		let cancelled = false;
		const timeoutId = window.setTimeout(() => {
			if (!cancelled) setTimedOut(true);
		}, 5000);

		const loadImage = (src: string) =>
			new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => resolve();
				img.onerror = () => resolve();
				img.src = src;
			});

		(async () => {
			for (const src of heroAssetUrls) {
				if (cancelled) return;
				await loadImage(src); // sequential
			}
			if (!cancelled) setAssetsReady(true);
		})();

		return () => {
			cancelled = true;
			window.clearTimeout(timeoutId);
		};
	}, [heroAssetUrls]);

	const shouldFinishPreloader = assetsReady || timedOut;

	return (
		<>
			{!hidePreloader && (
				<Preloader
					shouldFinish={shouldFinishPreloader}
					onComplete={() => setHidePreloader(true)}
				/>
			)}

			<Navbar isHidden={isNavHidden} isAtTop={isAtTop} />

			<div ref={parentRef}>
				<HeroSection canvasRef={canvasRef} />
				<OutroSection />
			</div>
		</>
	);
}
