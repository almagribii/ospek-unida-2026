"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import MenuButton from "@/components/MenuButton"; // Keep your existing component
import AkhyarTextSvg from "./AkhyarTextSvg";
import LogoSvg from "./LogoSvg";

// --------------------------------------------------------
// Types
// --------------------------------------------------------
export type NavbarProps = {
	isHidden?: boolean;
	isAtTop?: boolean;
	brandText?: string;
	brandHref?: string;
};

// --------------------------------------------------------
// Data for the Menu
// --------------------------------------------------------
const MENU_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "Jurusan", href: "/jurusan" },
	{ label: "Timeline", href: "/timeline" },
	{ label: "Pembayaran", href: "pembayaran" },
	{ label: "FAQ", href: "/faq" },
	{ label: "Kontak", href: "/kontak" },
	{ label: "Informasi", href: "/informasi" },
];

const CONTACT_INFO = {
	col1: [
		"Universitas Darussalam Gontor",
		"Ponorogo",
		"Jl. Raya Siman, Dusun I, Demangan, Kec. Siman",
		"Kabupaten Ponorogo, Jawa Timur 63471",
		"Email:",
		"pmb@unida.gontor.ac.id",
		"Whatsapp:",
		"[ +62 821 3970 3726 ]",
	],
	col2: [
		"Instagram",
		"https://www.instagram.com/ospek.unidagontor/",
		"Youtube",
		"https://www.youtube.com/@unidagontortv",
		"UNIDA Gontor Instagram",
		"https://www.instagram.com/unida.gontor/",
		"UNIDA Gontor Website",
		"https://unida.gontor.ac.id",
	],
};

export default function Navbar({
	isHidden = false,
	isAtTop = false,
	brandText = "AKHYAR",
	brandHref = "/",
}: NavbarProps) {
	// --------------------------------------------------------
	// State & Refs
	// --------------------------------------------------------
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const linksWrapperRef = useRef<HTMLDivElement>(null);
	const highlighterRef = useRef<HTMLDivElement>(null);
	const menuContentRef = useRef<HTMLDivElement>(null);
	const menuImageRef = useRef<HTMLDivElement>(null);

	// Refs for tracking animation state to prevent spamming
	const isAnimating = useRef(false);

	// Mouse tracking for parallax
	const currentX = useRef(0);
	const targetX = useRef(0);
	const currentHighlighterX = useRef(0);
	const targetHighlighterX = useRef(0);
	const currentHighlighterWidth = useRef(0);
	const targetHighlighterWidth = useRef(0);

	// --------------------------------------------------------
	// GSAP Animation Logic
	// --------------------------------------------------------
	useGSAP(
		() => {
			// Initial Setup
			gsap.set(menuContentRef.current, { y: "50%", opacity: 0 });
			gsap.set(menuImageRef.current, { scale: 0.5, opacity: 0 });
			gsap.set(".menu-link-item-holder", { y: "150%" });
			gsap.set(highlighterRef.current, { y: "150%" });
			gsap.set(overlayRef.current, {
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			});

			// Initialize highlighter position to the first link
			const firstLink = document.querySelector(
				".menu-link-container:first-child",
			);
			if (firstLink && linksWrapperRef.current) {
				const linkRect = firstLink.getBoundingClientRect();
				const wrapperRect = linksWrapperRef.current.getBoundingClientRect();
				// Set initial values
				targetHighlighterWidth.current = linkRect.width;
				targetHighlighterX.current = linkRect.left - wrapperRect.left;
				currentHighlighterWidth.current = linkRect.width;
				currentHighlighterX.current = linkRect.left - wrapperRect.left;
			}
		},
		{ scope: containerRef },
	);

	// --------------------------------------------------------
	// Toggle Animation
	// --------------------------------------------------------
	const toggleMenu = () => {
		if (isAnimating.current) return;
		isAnimating.current = true;

		const tl = gsap.timeline({
			onUpdate: () => {
				setIsMenuOpen(!isMenuOpen);
			},
			onComplete: () => {
				isAnimating.current = false;
			},
		});

		if (!isMenuOpen) {
			// OPEN ANIMATION
			// Optional: Animate main site container if you have a ref to it (omitted for safety)

			tl.to(overlayRef.current, {
				clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				duration: 1.25,
				ease: "expo.out",
			})
				.to(
					menuContentRef.current,
					{
						y: "0%",
						opacity: 1,
						duration: 1.5,
						ease: "expo.out",
					},
					"-=1",
				)
				.to(
					menuImageRef.current,
					{
						scale: 1,
						opacity: 1,
						duration: 1.5,
						ease: "expo.out",
					},
					"-=1.5",
				)
				.to(
					".menu-link-item-holder",
					{
						y: "0%",
						duration: 1.25,
						stagger: 0.1,
						ease: "expo.out",
					},
					"-=1",
				)
				.to(
					highlighterRef.current,
					{
						y: "0%",
						duration: 1,
						ease: "expo.out",
					},
					"-=1",
				);
		} else {
			// CLOSE ANIMATION
			tl.to(".menu-link-item-holder", {
				y: "-200%",
				duration: 1.25,
				ease: "expo.out",
			})
				.to(
					menuContentRef.current,
					{
						y: "-100%",
						opacity: 0,
						duration: 1.25,
						ease: "expo.out",
					},
					"-=1",
				)
				.to(
					menuImageRef.current,
					{
						y: "-100%",
						opacity: 0,
						duration: 1.25,
						ease: "expo.out",
					},
					"-=1.25",
				)
				.to(
					overlayRef.current,
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
						duration: 1.25,
						ease: "expo.out",
					},
					"-=1",
				)
				// Reset positions for next open
				.set(overlayRef.current, {
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
				})
				.set(".menu-link-item-holder", { y: "150%" })
				.set(highlighterRef.current, { y: "150%" })
				.set(menuContentRef.current, { y: "50%", opacity: 0 })
				.set(menuImageRef.current, { y: "0%", scale: 0.5, opacity: 0 });
		}
	};

	// --------------------------------------------------------
	// Loop for Mouse Interaction (Parallax & Highlighter)
	// --------------------------------------------------------
	useEffect(() => {
		const lerpFactor = 0.05;
		let requestID: number;

		const animateLoop = () => {
			// Lerp calculations
			currentX.current += (targetX.current - currentX.current) * lerpFactor;
			currentHighlighterX.current +=
				(targetHighlighterX.current - currentHighlighterX.current) * lerpFactor;
			currentHighlighterWidth.current +=
				(targetHighlighterWidth.current - currentHighlighterWidth.current) *
				lerpFactor;

			// Apply to DOM
			if (linksWrapperRef.current) {
				gsap.set(linksWrapperRef.current, { x: currentX.current });
			}
			if (highlighterRef.current) {
				gsap.set(highlighterRef.current, {
					x: currentHighlighterX.current,
					width: currentHighlighterWidth.current,
				});
			}
			requestID = requestAnimationFrame(animateLoop);
		};

		animateLoop();
		return () => cancelAnimationFrame(requestID);
	}, []);

	// --------------------------------------------------------
	// Event Handlers
	// --------------------------------------------------------
	const handleMouseMove = (e: React.MouseEvent) => {
		if (window.innerWidth < 1000) return;

		const mouseX = e.clientX;
		const viewportWidth = window.innerWidth;
		const menuLinksWrapperWidth = linksWrapperRef.current?.offsetWidth || 0;

		// Logic from script.js to move the link wrapper based on mouse X
		const maxMoveLeft = 0;
		const maxMoveRight = viewportWidth - menuLinksWrapperWidth;
		const sensitivityRange = viewportWidth * 0.5;
		const startX = (viewportWidth - sensitivityRange) / 2;
		const endX = startX + sensitivityRange;

		let mousePercentage = 0;
		if (mouseX <= startX) mousePercentage = 0;
		else if (mouseX >= endX) mousePercentage = 1;
		else mousePercentage = (mouseX - startX) / sensitivityRange;

		targetX.current =
			maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
	};

	const handleLinkEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (window.innerWidth < 1000) return;
		const target = e.currentTarget;
		const linkRect = target.getBoundingClientRect();
		const wrapperRect = linksWrapperRef.current?.getBoundingClientRect();

		if (wrapperRect) {
			targetHighlighterX.current = linkRect.left - wrapperRect.left;
			targetHighlighterWidth.current = linkRect.width;
		}

		// Split text animation (Reveal)
		const visibleChars = target.querySelectorAll(".char-visible");
		const animatedChars = target.querySelectorAll(".char-animated");

		gsap.to(visibleChars, {
			y: "-100%",
			stagger: 0.03,
			duration: 0.5,
			ease: "expo.inOut",
		});
		gsap.to(animatedChars, {
			y: "0%",
			stagger: 0.03,
			duration: 0.5,
			ease: "expo.inOut",
		});
	};

	const handleLinkLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (window.innerWidth < 1000) return;
		const target = e.currentTarget;

		// Default highlighter back to first element (optional logic, based on original)
		// Here we just let it stay or implement specific logic if needed.

		// Split text animation (Reset)
		const visibleChars = target.querySelectorAll(".char-visible");
		const animatedChars = target.querySelectorAll(".char-animated");

		gsap.to(animatedChars, {
			y: "100%",
			stagger: 0.03,
			duration: 0.5,
			ease: "expo.inOut",
		});
		gsap.to(visibleChars, {
			y: "0%",
			stagger: 0.03,
			duration: 0.5,
			ease: "expo.inOut",
		});
	};

	return (
		<div ref={containerRef}>
			{/* --------------------------------------------------------
            FRONT LAYER (Original Navbar)
           -------------------------------------------------------- */}
			<nav
				className={`nav fixed top-0 left-0 z-50 flex w-full flex-row items-stretch justify-between bg-transparent px-6 py-4 transition-opacity duration-200 ease-out ${
					isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
				}`}
			>
				{/* Logo Section */}
				<Link href={brandHref}>
					<div
						className={`group relative inline-flex h-[2.6em] w-[8em] cursor-pointer select-none items-center justify-center overflow-hidden rounded-md border text-[17px] font-medium drop-shadow-xl shadow-xl transition-all before:absolute before:top-full before:left-full before:-z-10 before:h-40 before:w-50 before:rounded-full before:transition-[top,left] before:duration-700 before:content-[''] hover:before:-top-8 hover:before:-left-8 active:before:bg-foreground active:before:duration-0 ${
							isAtTop
								? "lg:text-background text-foreground border-foreground lg:border-background before:bg-background hover:text-foreground"
								: "text-foreground border-foreground before:bg-foreground hover:text-background"
						} ${
							isHidden
								? "bg-transparent backdrop-blur-none"
								: "bg-background/10 backdrop-blur-md"
						} ${isMenuOpen ? "opacity-0" : "opacity-100 delay-200 ease-out duration-500"}`}
					>
						<p className="nav-fade font-mirage font-bold text-xl tracking-[0.2em] transition-[letter-spacing] duration-500 ease-out group-hover:tracking-normal">
							{brandText}
						</p>
					</div>
				</Link>

				{/* Menu Button Section */}
				<div
					className={`flex items-center justify-center gap-4 ${
						isAtTop ? "lg:text-background text-foreground" : "text-foreground"
					} relative z-60`} // Increased z-index to stay above overlay
				>
					<button type="button" onClick={toggleMenu} className="cursor-pointer">
						<p
							className={`nav-fade hidden font-product-sans font-thin uppercase tracking-[0.3em] transition-all duration-500 ease-out hover:tracking-widest text-shadow-md lg:block ${isAtTop ? "lg:text-background" : ""} ${isMenuOpen ? "text-background delay-500" : "text-foreground"}`}
						>
							{isMenuOpen ? "CLOSE" : "MENU"}
						</p>
					</button>
					<div className="nav-fade">
						<MenuButton
							Color={`${isAtTop ? "lg:bg-background" : ""} ${isMenuOpen ? "bg-background" : "bg-foreground"}`}
							onClick={toggleMenu}
							menuStatus={isMenuOpen}
							// Assuming MenuButton handles its own internal "X" state visualization if passed a prop
						/>
					</div>
				</div>
			</nav>

			{/* --------------------------------------------------------
			MENU OVERLAY (The "Inside")
		   -------------------------------------------------------- */}
			{/** biome-ignore lint/a11y/noStaticElementInteractions: ntah lah */}
			<div
				ref={overlayRef}
				className="fixed top-0 left-0 w-screen h-screen bg-foreground text-[#ffdda1] z-40 overflow-hidden pointer-events-auto"
				style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} // Initial state
				onMouseMove={handleMouseMove}
			>
				{/* Top Content (Addresses etc) */}
				<div
					ref={menuContentRef}
					className="absolute top-[25%] lg:top-[45%] -translate-y-1/2 w-full px-8 flex justify-between items-center font-product-sans text-sm font-semibold uppercase"
				>
					<div className="text-left space-y-4">
						{CONTACT_INFO.col1.map((line, i) => (
							<p
								key={`col1-${
									// biome-ignore lint/suspicious/noArrayIndexKey: not important
									i
								}`}
								className={line.length === 0 ? "h-4" : ""}
							>
								{line === "Contact" || line === "Edition" ? <br /> : null}
								{line}
							</p>
						))}
					</div>
					<div className="text-right space-y-4">
						{CONTACT_INFO.col2.map((line, i) =>
							line.startsWith("https") ? (
								<Link
									href={line}
									key={`col2-${
										// biome-ignore lint/suspicious/noArrayIndexKey: nothing
										i
									}`}
									className={
										line.length === 0
											? "h-4 "
											: "hover:text-[#ffffff] transition-colors ease-out"
									}
								>
									{line}
									<br />
									<br />
								</Link>
							) : (
								<p
									key={`col2-${
										// biome-ignore lint/suspicious/noArrayIndexKey: nothing
										i
									}`}
									className={line.length === 0 ? "h-4" : ""}
								>
									{line === "Language" ? <br /> : null}
									{line}
								</p>
							),
						)}
					</div>
				</div>

				{/* Center Image */}
				<div
					ref={menuImageRef}
					className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-37.5 hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4 pointer-events-none text-primary"
				>
					<LogoSvg />
					<div className="scale-75">
						<AkhyarTextSvg />
					</div>
				</div>

				{/* Links Wrapper */}
				<div
					ref={linksWrapperRef}
					className="absolute left-0 bottom-0 w-full lg:w-max px-8 pb-8 flex justify-between gap-8 flex-col lg:flex-row lg:gap-16 will-change-transform"
				>
					{MENU_LINKS.map((link) => (
						<button
							key={link.label}
							className="menu-link-container relative overflow-hidden cursor-pointer bg-transparent border-none p-0"
							onMouseEnter={handleLinkEnter}
							onMouseLeave={handleLinkLeave}
							type="button"
						>
							<div className="menu-link-item-holder relative block">
								<Link
									href={link.href}
									className="relative block text-background px-4 font-mirage font-medium text-[2rem] lg:text-[8rem] leading-[0.9] tracking-tighter uppercase"
								>
									{/* Visible Text */}
									<span className="block">
										{link.label.split("").map((char, i) => (
											<span
												key={`${link.label}-visible-${i}`}
												className="char-visible inline-block relative"
											>
												{char}
											</span>
										))}
									</span>
									{/* Animated Text (Hidden initially) */}
									<span className="absolute lg:top-0 left-[15%] right-[15%] lg:right-0 lg:left-0 block text-primary-muted">
										{link.label.split("").map((char, i) => (
											<span
												key={`${link.label}-animated-${i}`}
												className="char-animated inline-block relative translate-y-full"
											>
												{char}
											</span>
										))}
									</span>
								</Link>
							</div>
						</button>
					))}

					{/* Highlighter */}
					<div
						ref={highlighterRef}
						className="absolute bottom-0 left-0 h-3 bg-primary-muted hidden lg:block"
						style={{ width: 0 }}
					></div>
				</div>
			</div>
		</div>
	);
}
