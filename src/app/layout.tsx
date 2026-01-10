"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// biome-ignore lint/suspicious/noExplicitAny: for gsap
	const lenisRef = useRef<any>(null);

	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}

		gsap.ticker.add(update);
		gsap.ticker.lagSmoothing(0);

		return () => gsap.ticker.remove(update);
	}, []);
	return (
		<html lang="en">
			<ReactLenis root />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
