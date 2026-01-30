"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useRef } from "react";
import SignButton from "@/components/SignButton";
import { cardsData } from "./faculties";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const cards = gsap.utils.toArray<HTMLElement>(".card");
			const faculties = gsap.utils.toArray<HTMLElement>(".faculties");

			faculties.forEach((faculty) => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".faculties-wrapper",
						start: "top 30%",
						toggleActions: "play none none none",
					},
				});

				tl.fromTo(
					faculty,
					{
						delay: 0.2,
						scale: 0,
						borderRadius: "100%",
					},
					{
						scale: 0.5,
						duration: 0.75,
						borderRadius: "50%",
						ease: "power2.out",
					},
				).to(faculty, {
					scale: 1,
					duration: 0.4,
					borderRadius: "0%",
					ease: "expo.out",
				});
			});

			cards.forEach((card, index) => {
				const cardInner = card.querySelector(".card-inner");
				const cardImage = card.querySelector(".card-image");

				gsap.fromTo(
					cardImage,
					{
						yPercent: -15,
					},
					{
						yPercent: 25,
						ease: "none",
						scrollTrigger: {
							trigger: card.querySelector(".card-img-wrapper"),
							start: "top bottom",
							end: "bottom top",
							scrub: 1.5,
						},
					},
				);

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
								ease: "none",
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
		<div ref={containerRef} className="overflow-x-hidden">
			{/* Hero Section */}
			<section className="relative card faculties-wrapper w-screen bg-background px-8 pt-12 pb-20 text-center">
				<div className="flex flex-col items-center justify-center card-inner">
					<div className="flex flex-col justify-center items-center mb-8">
						<Image
							src="/logo/logo-unida.png"
							alt="logo-unida"
							width={200}
							height={200}
						></Image>
						<h1 className="font-mirage text-2xl font-bold uppercase leading-none md:text-[3rem] lg:text-4xl">
							Daftar Fakultas UNIDA Gontor
						</h1>
					</div>
					<div className="grid grid-rows-2 lg:grid-flow-col grid-flow-row gap-4">
						{cardsData.map((card) => {
							return (
								<div
									className="relative z-10 h-75 w-75 faculties"
									key={card.name}
								>
									<Image
										src={card.image}
										alt={card.name}
										width={300}
										height={300}
										className="absolute z-0 object-cover w-full h-full"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Sticky Cards Section */}
			<section className=" relative w-full bg-black/15">
				{cardsData.map((card) => (
					<div
						key={card.name}
						id={card.name}
						className="card sticky top-0 h-[125vh] w-full perspective-1000"
						style={{ perspective: "1000px" }}
					>
						<div
							className="card-inner relative flex h-full w-full origin-[50%_100%] flex-col will-change-transform bg-background shadow-2xl drop-shadow-2xl"
							style={
								{
									"--after-opacity": 0,
								} as React.CSSProperties
							}
						>
							{/* Overlay for darkening effect */}
							<div
								className="pointer-events-none absolute left-0 top-0 z-2 h-full w-full bg-black"
								style={{
									opacity: "var(--after-opacity)",
									transition: "opacity 0.1s linear",
								}}
							/>

							{/* Card Content */}
							<div className="flex flex-row justify-between">
								<div className="card-info w-[75%] px-8 py-[4em] hidden lg:block text-center md:w-[75%] lg:w-[25%] lg:px-[4em] lg:text-left">
									<p className="text-sm font-medium uppercase">
										{card.name} Faculty
									</p>
								</div>
								<Link
									href="https://unida.gontor.ac.id"
									className="card-info hidden lg:block text-center px-4 py-4 cursor-pointer hover:scale-125 transition-transform ease-out duration-150"
								>
									<Image
										src="/logo/logo-unida.png"
										alt="logo-unida"
										width={100}
										height={100}
									></Image>
								</Link>
							</div>

							<div className="card-title text-center">
								<h1 className="font-mirage py-8 text-[2.5rem] font-bold uppercase leading-none lg:text-[10rem]">
									{card.name}
								</h1>
							</div>

							<div className="card-description mx-auto mb-[2em] w-[calc(100%-4rem)] lg:w-[60%]">
								<div
									className={`grid ${card.jurusan.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} grid-cols-1 gap-2 mb-[2em]`}
								>
									{card.jurusan.map((prodi) => {
										return (
											<p className="text-center" key={`${prodi}`}>
												• {prodi}
											</p>
										);
									})}
								</div>
								<SignButton link={card.url}>
									<MoveRightIcon />
									Pelajari
								</SignButton>
							</div>

							<div className="relative card-img-wrapper z-1 lg:max-h-full h-full w-full overflow-hidden">
								<Image
									src={card.image}
									alt={card.name}
									height={600}
									width={1500}
									className="absolute w-full h-[125%] -top-[15%] object-cover card-image"
								/>
							</div>
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
