"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AkhyarLandingSmooth from "./HeroSection";

const About = () => {
	const router = useRouter();
	const [showSmoke, setShowSmoke] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const documentHeight = document.documentElement.scrollHeight;
			const windowHeight = window.innerHeight;

			// Trigger smoke effect ketika scroll mencapai near bottom
			if (scrollPosition + windowHeight >= documentHeight - 100) {
				setShowSmoke(true);

				// Navigate ke filosofi page setelah smoke effect ditampilkan
				setTimeout(() => {
					router.push("/about/filosofi");
				}, 1500); // Durasi sesuai dengan animasi smoke
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [router]);

	return (
		<div className="relative min-h-[200vh] overflow-x-hidden">
			{/* Spacer untuk memungkinkan scroll */}
			<div className="h-screen flex items-center justify-center bg-white">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Scroll untuk melanjutkan</h1>
					<p className="text-gray-600">↓ Scroll ke bawah ↓</p>
				</div>
			</div>

			{/* Hero Section */}
			<div className="sticky top-0 h-screen">
				<AkhyarLandingSmooth />
			</div>

			{/* Additional content spacer */}
			<div className="h-96" />

			{/* Smoke Transition Effect */}
			{showSmoke && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
					<Image
						src="/gif/smoke.gif"
						alt="Smoke transition"
						width={500}
						height={500}
						className="w-full h-full object-cover"
					/>
				</div>
			)}
		</div>
	);
};

export default About;
