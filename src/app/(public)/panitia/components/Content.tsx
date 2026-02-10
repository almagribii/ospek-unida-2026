"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef, useState } from "react";
import { panitias } from "./panitia";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface PanitiaProps {
	name: string;
	prodi: string;
	semester: number;
	img?: string;
}

function PanitiaCard({
	orang,
	bagian,
}: {
	orang: PanitiaProps;
	bagian: string;
}) {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: exception
		<div
			className="group perspective-[1000px] cursor-pointer h-full overflow-hidden"
			onClick={() => setIsFlipped(!isFlipped)}
			onKeyDown={(e) => e.key === "Enter" && setIsFlipped(!isFlipped)}
		>
			<div
				className={`relative w-full aspect-4/5 transition-all duration-700 transform-3d ${
					isFlipped ? "transform-[rotateY(180deg)]" : ""
				}`}
			>
				{/* Front */}
				<div className="absolute inset-0 backface-hidden">
					<div className="w-full h-full bg-foreground relative overflow-hidden">
						<Image
							src={`/panitia/${orang.img ? orang.img : "anonymous"}.png`}
							fill
							alt={orang.name}
							className="object-cover duration-500 group-hover:scale-110 group-hover:opacity-75 transition-all"
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
						/>
						<div className="absolute bottom-0 w-full text-center bg-primary">
							<p className="text-background text-lg leading-tight py-1">
								{orang.name}
							</p>
						</div>
					</div>
				</div>

				{/* Back */}
				<div className="absolute inset-0 h-full w-full bg-foreground backface-hidden transform-[rotateY(180deg)] border border-foreground/10 overflow-hidden flex flex-col items-center justify-center text-center p-4">
					<div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
						<h3
							className={`${bagian.length > 8 ? "lg:text-3xl text-xl" : "lg:text-4xl text-2xl"} font-mirage uppercase font-bold text-primary -rotate-45 opacity-75 select-none whitespace-nowrap`}
						>
							{bagian === "penerimaan_mahasiswa_baru"
								? "PMB"
								: bagian === "penanggung_jawab"
									? "PJ"
									: bagian.replace(/_/g, " ")}
						</h3>
					</div>

					<div className="z-10 flex flex-col">
						<h4 className="text-background text-xl font-bold uppercase leading-tight">
							{orang.name}
						</h4>
						<div className="w-10 h-0.5 bg-primary mx-auto my-2" />
						<p className="font-medium text-background">{orang.prodi}</p>
						<p className="text-sm text-secondary-muted">
							Semester {orang.semester}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function PanitiaSection({ bagian }: { bagian: string }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const anggota = panitias[bagian];

	useGSAP(
		() => {
			gsap.from(".panitia-card-inner", {
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					toggleActions: "play none none reverse",
				},
				yPercent: 500,
				duration: 1,
				stagger: 0.1,
				ease: "expo.out",
			});
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="container max-w-5xl mx-auto px-4">
			<h2 className="text-3xl font-mirage font-medium capitalize mb-6 text-center lg:text-start border-b border-foreground/10 pb-2">
				{bagian.replace(/_/g, " ")}
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
				{anggota.map((orang) => {
					return (
						<div key={orang.name} className="h-full overflow-hidden">
							<div className="panitia-card-inner h-full">
								<PanitiaCard orang={orang} bagian={bagian} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

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
		<section
			ref={containerRef}
			className="relative w-full h-full overflow-x-hidden"
		>
			{/* Background top */}
			<div className="h-screen w-full absolute -z-10 top-0 bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center"></div>

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
					return <PanitiaSection key={bagian} bagian={bagian} />;
				})}
			</div>
		</section>
	);
}
