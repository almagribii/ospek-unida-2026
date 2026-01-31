"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavbar } from "@/context/NavbarContext";
import { HeroSection } from "./HeroSection";
import { OutroSection } from "./OutroSection";
import Preloader from "./Preloader";
import { useHomeHero } from "./useHomeHero";

export default function Home() {
	const [hidePreloader, setHidePreloader] = useState(false);
	const [assetsReady, setAssetsReady] = useState(false);
	const [timedOut, setTimedOut] = useState(false);
	const [preloaderComplete, setPreloaderComplete] = useState(false);
	const { parentRef, canvasRef, isNavHidden, isAtTop } =
		useHomeHero(preloaderComplete);

	const { setNavbarState } = useNavbar();

	useEffect(() => {
		// This will now only trigger if isNavHidden or isAtTop actually change values
		// because setNavbarState is now stable!
		setNavbarState({ isHidden: isNavHidden, isAtTop: isAtTop });

		// Cleanup: Reset only when truly unmounting or changing logic
		return () => {
			// We can wrap this in a check or leave as is.
			// Since Next.js unmounts Home for the new page, this runs once at the end.
			setNavbarState({ isHidden: false, isAtTop: false });
		};
	}, [isNavHidden, isAtTop, setNavbarState]);

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
					onComplete={() => {
						setPreloaderComplete(true);
						setHidePreloader(true);
					}}
				/>
			)}

			<div ref={parentRef}>
				<HeroSection canvasRef={canvasRef} />
				<OutroSection />
			</div>
		</>
	);
}
