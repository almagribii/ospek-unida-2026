"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowUpIcon } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

export default function BackToTop({ length }: { length: number }) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useGSAP(
		() => {
			const button = buttonRef.current;
			if (!button) return;

			// Set initial state: Hidden and pushed down
			gsap.set(button, { yPercent: 200, autoAlpha: 0 });

			const handleScroll = () => {
				if (window.scrollY >= length) {
					// Slide Up (Show)
					gsap.to(button, {
						yPercent: 0,
						autoAlpha: 1,
						duration: 0.5,
						ease: "power3.out",
						overwrite: "auto",
					});
				} else {
					// Slide Down (Hide)
					gsap.to(button, {
						yPercent: 200,
						autoAlpha: 0,
						duration: 0.5,
						ease: "power3.in",
						overwrite: "auto",
					});
				}
			};

			window.addEventListener("scroll", handleScroll);
			handleScroll(); // Check initial position

			button.addEventListener("click", () => {
				gsap.to(window, {
					duration: 1.5,
					scrollTo: 0,
					ease: "power3.out",
				});
			});

			return () => window.removeEventListener("scroll", handleScroll);
		},
		{ scope: buttonRef, dependencies: [length] },
	);

	return (
		<button
			ref={buttonRef}
			type="button"
			style={{ visibility: "hidden" }}
			// FIXED: Added z-[999], fixed position syntax, and adjusted size to h-14 (56px)
			className="fixed z-100 bottom-[5%] lg:right-[2%] lg:left-auto lg:translate-x-0 lg:translate-y-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer h-16 w-16 p-4 bg-primary drop-shadow-lg hover:bg-primary-muted transition-colors text-background rounded-full flex items-center justify-center ease-linear"
		>
			<ArrowUpIcon className="w-6 h-6" />
		</button>
	);
}
