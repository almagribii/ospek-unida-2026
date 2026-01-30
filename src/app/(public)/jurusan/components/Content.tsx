"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";

// Register ScrollTrigger outside the component to avoid re-registration
gsap.registerPlugin(ScrollTrigger);

interface CardData {
	id: string;
	title: string;
	info: string;
	description: string;
	image: string;
	accentColor: string;
}

const cardsData: CardData[] = [
	{
		id: "card-1",
		title: "Reverie",
		info: "A surreal dive into neon hues and playful decay",
		description:
			"A psychedelic skull study exploring the tension between playfulness and decay. Bold candy tones, liquid forms, and crisp vectors bring a surreal, pop-art mood meant for covers and prints.",
		image: "/background/blue_texture.webp",
		accentColor: "#b1c0ef",
	},
	{
		id: "card-2",
		title: "Vaporwave",
		info: "A retro-futurist scene where nostalgia meets glitch",
		description:
			"An 80s-UI dreamscape: stacked windows, checkerboard floors, and a sunset gradient. Built to feel like a loading screen to another world—nostalgic, glossy, and a bit uncanny.",
		image: "/background/white_texture.webp",
		accentColor: "#f2acac",
	},
	{
		id: "card-3",
		title: "Kaleido",
		info: "A kaleidoscope of folk motifs reimagined in digital form",
		description:
			"Ornamental symmetry inspired by folk motifs and stained-glass glow. Designed as a seamless, tileable pattern for textiles, wallpapers, and rich UI backgrounds.",
		image: "/background/blue_texture.webp",
		accentColor: "#fedd93",
	},
	{
		id: "card-4",
		title: "Menagerie",
		info: "A portrait framed by oddball creatures and doodles",
		description:
			"A playful portrait surrounded by oddball companions—mascots, monsters, and midnight snacks. Loose linework meets pastel whimsy, perfect for merch, stickers, and editorial spots.",
		image: "/background/white_texture.webp",
		accentColor: "#81b7bf",
	},
];

export default function Content() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const cards = gsap.utils.toArray<HTMLElement>(".card");

			cards.forEach((card, index) => {
				const cardInner = card.querySelector(".card-inner");

				// Only animate if it's not the last card
				if (index < cards.length - 1) {
					ScrollTrigger.create({
						trigger: cards[index + 1],
						start: "top 85%",
						end: "top -75%",
						scrub: true,
						pin: card,
						pinSpacing: false,
						// We use animation here to control the cardInner transforms
						animation: gsap.fromTo(
							cardInner,
							{
								y: "0%",
								z: 0,
								rotationX: 0,
							},
							{
								y: "-50%",
								z: -250,
								rotationX: 45,
								ease: "none", // important for scrub
							},
						),
					});

					// Separate animation for the opacity overlay
					ScrollTrigger.create({
						trigger: cards[index + 1],
						start: "top 75%",
						end: "top -25%",
						scrub: true,
						animation: gsap.to(cardInner, {
							"--after-opacity": 1,
							ease: "none",
						}),
					});
				}
			});
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="font-host-grotesk overflow-x-hidden">
			{/* Injecting fonts via style tag for standalone portability. */}
			<style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap");
      `}</style>

			{/* Hero Section */}
			<section className="hero relative flex h-screen w-screen items-center justify-center bg-[#f9f4eb] p-8 text-center text-[#141414]">
				<h1 className="font-barlow-condensed text-[5rem] font-black uppercase leading-none md:text-[3rem] lg:text-[5rem]">
					Art That Lives Online
				</h1>
			</section>

			{/* Sticky Cards Section */}
			<section className="sticky-cards relative w-full bg-[#0f0f0f]">
				{cardsData.map((card) => (
					<div
						key={card.id}
						id={card.id}
						className="card sticky top-0 h-[125vh] w-full perspective-1000"
						style={{ perspective: "1000px" }}
					>
						<div
							className="card-inner relative flex h-full w-full origin-[50%_100%] flex-col will-change-transform"
							style={
								{
									backgroundColor: card.accentColor,
									"--after-opacity": 0,
								} as React.CSSProperties
							}
						>
							{/* Overlay for darkening effect */}
							<div
								className="pointer-events-none absolute left-0 top-0 z-[2] h-full w-full bg-black"
								style={{
									opacity: "var(--after-opacity)",
									transition: "opacity 0.1s linear",
								}}
							/>

							{/* Card Content */}
							<div className="card-info w-[75%] px-8 py-[4em] text-center md:w-[75%] lg:w-[25%] lg:px-[4em] lg:text-left">
								<p className="text-sm font-medium uppercase">{card.info}</p>
							</div>

							<div className="card-title text-center">
								<h1 className="font-barlow-condensed py-8 text-[3rem] font-black uppercase leading-none lg:text-[10rem]">
									{card.title}
								</h1>
							</div>

							<div className="card-description mx-auto mb-[2em] w-[calc(100%-4rem)] lg:w-[60%]">
								<p className="text-xl font-medium uppercase lg:text-2xl">
									{card.description}
								</p>
							</div>

							<div className="card-img mt-16 h-full w-full overflow-hidden">
								<img
									src={card.image}
									alt={card.title}
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				))}
			</section>

			{/* Outro Section */}
			<section className="outro relative flex h-screen w-screen items-center justify-center bg-[#f9f4eb] p-8 text-center text-[#141414]">
				<h1 className="font-barlow-condensed text-[5rem] font-black uppercase leading-none md:text-[3rem] lg:text-[5rem]">
					Next Canvas Awaits
				</h1>
			</section>
		</div>
	);
}
