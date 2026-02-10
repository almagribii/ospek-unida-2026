"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import { panitias } from "./panitia";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Content() {
	const bagians = Object.keys(panitias);
	const containerRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const splitText = SplitText.create("#title", {
				type: "words",
			});

			gsap.from(splitText.words, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
				y: 100,
				stagger: 0.1,
				ease: "expo.out",
				duration: 1,
			});
		},
		{ scope: containerRef },
	);

	return (
		<section ref={containerRef} className="relative w-full h-full">
			{/* Background top */}
			<div className="h-screen w-screen absolute -z-10 top-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"></div>

			{/* Text Top */}
			<div className="flex flex-col justify-center items-center px-4 py-2 overflow-hidden gap-2">
				<h1
					id="title"
					className="text-4xl font-mirage font-semibold text-center mt-30"
				>
					Struktur Panitia OSPEK 2026
				</h1>
				<p id="title" className="text-xl">
					Kampus Pusat
				</p>
			</div>
			<div className="w-full flex flex-col justify-center items-center gap-12 pb-20 mt-10">
				{bagians.map((bagian) => {
					const anggota = panitias[bagian];

					return (
						<div key={bagian} className="container max-w-5xl mx-auto px-4">
							<h2 className="text-3xl font-mirage font-medium capitalize mb-6 text-center lg:text-start border-b border-foreground/10 pb-2">
								{bagian.replace(/_/g, " ")}
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
								{anggota.map((orang) => {
									return (
										<div
											key={orang.img}
											className="flex flex-col gap-2 group overflow-hidden"
										>
											<div className="aspect-4/5 bg-foreground relative cursor-pointer overflow-hidden">
												<Image
													src={`/panitia/${orang.img}.png`}
													fill
													alt={orang.name}
													className="object-cover duration-500 group-hover:scale-110 group-hover:opacity-75 transition-all"
													sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
												/>
												<div className="absolute bottom-0 w-full text-center bg-primary">
													<p className="text-background text-lg leading-tight ">
														{orang.name}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
