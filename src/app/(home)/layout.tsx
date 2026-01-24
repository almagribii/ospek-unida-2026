"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// biome-ignore lint/suspicious/noExplicitAny: for gsap
	const lenisRef = useRef<any>(null);

	useEffect(() => {
		let rafId = 0;
		let cleanup: (() => void) | null = null;

		function init() {
			const lenis = lenisRef.current?.lenis;
			if (!lenis) {
				rafId = requestAnimationFrame(init);
				return;
			}

			function onLenisScroll() {
				ScrollTrigger.update();
			}

			function update(time: number) {
				lenis.raf(time * 1000);
			}

			lenis.on("scroll", onLenisScroll);
			gsap.ticker.add(update);
			gsap.ticker.lagSmoothing(0);
			ScrollTrigger.refresh();

			cleanup = () => {
				lenis.off("scroll", onLenisScroll);
				gsap.ticker.remove(update);
			};
		}

		init();
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			cleanup?.();
		};
	}, []);
	return (
		<>
			<ReactLenis root ref={lenisRef} autoRaf={false} />
			<div>{children}</div>
		</>
	);
}
