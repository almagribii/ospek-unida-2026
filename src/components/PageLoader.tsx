"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function PageLoader({
	onComplete,
}: {
	onComplete?: () => void;
}) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Wait for fonts and initial render
		const timer = setTimeout(() => {
			if (loaderRef.current) {
				gsap.to(loaderRef.current, {
					yPercent: -100,
					duration: 0.8,
					ease: "power3.inOut",
					onComplete: () => {
						setIsVisible(false);
						if (onComplete) onComplete();
					},
				});
			}
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return (
		<div
			ref={loaderRef}
			className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center"
		>
			<div className="flex flex-col items-center gap-4">
				<div className="w-8 h-8 border-2 border-background border-t-transparent rounded-full animate-spin" />
				<p className="text-background text-sm font-medium uppercase tracking-widest">
					Loading
				</p>
			</div>
		</div>
	);
}
