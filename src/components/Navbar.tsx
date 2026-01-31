"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuButton from "@/components/MenuButton"; // Keep your existing component
import { useNavbar } from "@/context/NavbarContext";
import AkhyarTextSvg from "./AkhyarTextSvg";
import LogoSvg from "./LogoSvg";

gsap.registerPlugin(SplitText);

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
	{ label: "Informasi", href: "/informasi" },
	{ label: "Pembayaran", href: "/pembayaran" },
	{ label: "Kontak", href: "/kontak" },
	{ label: "Tentang", href: "/about" },
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
		{
			media: "OSPEK Instagram",
			user: "@ospek.unidagontor",
			link: "https://www.instagram.com/ospek.unidagontor/",
		},
		{
			media: "UNIDA Gontor Youtube",
			user: "@unidagontortv",
			link: "https://www.youtube.com/@unidagontortv",
		},
		{
			media: "UNIDA Gontor Instagram",
			user: "@unida.gontor",
			link: "https://www.instagram.com/unida.gontor/",
		},
		{
			media: "UNIDA Gontor Website",
			user: "unida.gontor.ac.id",
			link: "https://unida.gontor.ac.id",
		},
		{
			media: "Admisi UNIDA Gontor",
			user: "admisi.unida.gontor.ac.id",
			link: "https://admisi.unida.gontor.ac.id/",
		},
	],
};

export default function Navbar({
	brandText = "AKHYAR",
	brandHref = "/",
}: NavbarProps) {
	// --------------------------------------------------------
	// State & Refs
	// --------------------------------------------------------
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { isHidden: ctxHidden, isAtTop: ctxAtTop } = useNavbar();
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const isHidden = isHomePage ? ctxHidden : false;
	const isAtTop = isHomePage ? ctxAtTop : false;

	const lastPathnameRef = useRef<string | null>(null);
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

	const animateClose = useCallback(() => {
		// Prevent double-firing if already closed or animating
		if (!isMenuOpen && !isAnimating.current) return;

		isAnimating.current = true;
		const tl = gsap.timeline({
			onComplete: () => {
				isAnimating.current = false;
				setIsMenuOpen(false); // Update React state after animation finishes
			},
		});

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
			// Reset positions for next open (Important!)
			.set(overlayRef.current, {
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			})
			.set(".menu-link-item-holder", { y: "150%" })
			.set(highlighterRef.current, { y: "150%" })
			.set(menuContentRef.current, { y: "50%", opacity: 0 })
			.set(menuImageRef.current, { y: "0%", scale: 0.5, opacity: 0 });
	}, [isMenuOpen]); // Dependency on state to know if we should actually run

	// const closeMenuImmediate = useCallback(() => {
	// 	isAnimating.current = false;
	// 	setIsMenuOpen(false);
	// 	document.body.style.overflow = "auto";
	// 	gsap.set(overlayRef.current, {
	// 		clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
	// 	});
	// 	gsap.set(".menu-link-item-holder", { y: "150%" });
	// 	gsap.set(highlighterRef.current, { y: "150%" });
	// 	gsap.set(menuContentRef.current, { y: "50%", opacity: 0 });
	// 	gsap.set(menuImageRef.current, { y: "0%", scale: 0.5, opacity: 0 });
	// }, []);

	// --------------------------------------------------------
	// GSAP Animation Logic
	// --------------------------------------------------------
	useGSAP(
		() => {
			const q = gsap.utils.selector(containerRef);

			// Initial Setup
			gsap.set(menuContentRef.current, { y: "50%", opacity: 0 });
			gsap.set(menuImageRef.current, { scale: 0.5, opacity: 0 });
			gsap.set(".menu-link-item-holder", { y: "150%" });
			gsap.set(highlighterRef.current, { y: "150%" });
			gsap.set(overlayRef.current, {
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			});

			// Initialize highlighter position to the first link
			const firstLink = q(".menu-link-container:first-child")[0];
			if (firstLink && linksWrapperRef.current) {
				const linkRect = firstLink.getBoundingClientRect();
				const wrapperRect = linksWrapperRef.current.getBoundingClientRect();
				// Set initial values
				targetHighlighterWidth.current = linkRect.width;
				targetHighlighterX.current = linkRect.left - wrapperRect.left;
				currentHighlighterWidth.current = linkRect.width;
				currentHighlighterX.current = linkRect.left - wrapperRect.left;
			}

			const splitMenu = SplitText.create(q(".nav-fade"), {
				type: "words, chars",
			});

			gsap.from(splitMenu.chars, {
				duration: 1,
				y: 100,
				stagger: 0.05,
				ease: "power2.out",
			});

			gsap.from(q(".nav-menu-extra"), {
				duration: 1,
				y: 100,
				stagger: 0.05,
				ease: "power2.out",
				autoAlpha: 0,
			});

			return () => {
				splitMenu.revert();
			};
		},
		{ scope: containerRef },
	);

	// --------------------------------------------------------
	// Toggle Animation
	// --------------------------------------------------------
	const toggleMenu = () => {
		if (isAnimating.current) return;
		const willOpen = !isMenuOpen;
		setIsMenuOpen(willOpen);
		isAnimating.current = true;

		const tl = gsap.timeline({
			onComplete: () => {
				isAnimating.current = false;
			},
		});

		if (willOpen) {
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
	// Close menu on route change
	// --------------------------------------------------------
	useEffect(() => {
		if (lastPathnameRef.current === null) {
			lastPathnameRef.current = pathname;
			return;
		}

		if (lastPathnameRef.current !== pathname) {
			lastPathnameRef.current = pathname;
			// CHANGE: Call animateClose() instead of closeMenuImmediate()
			// This runs the exit animation WHILE the new page loads/shows underneath.
			if (isMenuOpen) {
				animateClose();
			}
		}
	}, [pathname, isMenuOpen, animateClose]);

	// --------------------------------------------------------
	// Prevent Scrolling When Menu is Open
	// --------------------------------------------------------
	useEffect(() => {
		const preventWheel = (e: WheelEvent) => {
			e.preventDefault();
		};

		const preventKeyScroll = (e: KeyboardEvent) => {
			const scrollKeys = [
				"Space",
				"PageUp",
				"PageDown",
				"Home",
				"End",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
			];

			if (scrollKeys.includes(e.code)) {
				e.preventDefault();
			}
		};

		if (isMenuOpen) {
			const delay = () => {
				setTimeout(() => {
					document.body.style.overflow = "hidden";
				}, 1000);
			};
			delay();
			window.addEventListener("wheel", preventWheel, { passive: false });
			window.addEventListener("keydown", preventKeyScroll);
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
			window.removeEventListener("wheel", preventWheel);
			window.removeEventListener("keydown", preventKeyScroll);
		};
	}, [isMenuOpen]);

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
				<Link className="nav-menu-extra" href={brandHref}>
					<div
						className={`group relative inline-flex h-[2.6em] w-[8em] cursor-pointer select-none items-center justify-center overflow-hidden rounded-md border text-[17px] font-medium transition-all before:absolute before:top-full before:left-full before:-z-10 before:h-40 before:w-50 before:rounded-full before:transition-[top,left] before:duration-700 before:content-[''] hover:before:-top-8 hover:before:-left-8 active:before:bg-foreground active:before:duration-0 ${
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
					<button
						type="button"
						onClick={toggleMenu}
						className="cursor-pointer overflow-hidden"
					>
						<p
							className={`nav-fade hidden font-product-sans font-thin uppercase tracking-[0.3em] transition-all duration-500 ease-out hover:tracking-widest text-shadow-md lg:block ${isAtTop ? "lg:text-background" : ""} ${isMenuOpen ? "text-background delay-500" : "text-foreground"}`}
						>
							{isMenuOpen ? "CLOSE" : "MENU"}
						</p>
					</button>
					<div className="nav-menu-extra overflow-hidden">
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
				className={`fixed top-0 left-0 w-screen h-screen bg-foreground text-[#ffdda1] z-40 overflow-hidden ${
					isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
				}`}
				style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} // Initial state
				onMouseMove={handleMouseMove}
			>
				{/* Top Content (Addresses etc) */}
				<div
					ref={menuContentRef}
					className="absolute top-[25%] lg:top-[45%] -translate-y-1/2 w-full px-8 hidden lg:flex justify-between items-center font-product-sans text-sm font-semibold uppercase"
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
						{CONTACT_INFO.col2.map((line) => (
							<div key={line.user}>
								<p>{line.media}</p>
								<Link
									className="text-primary hover:text-primary-muted transition-colors ease-out"
									href={line.link}
								>
									{line.user}
								</Link>
							</div>
						))}
					</div>
				</div>

				{/* Center Image */}
				<div
					ref={menuImageRef}
					className="absolute lg:top-[45%] top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center items-center lg:gap-4 pointer-events-none text-primary"
				>
					<div className="scale-[35%] lg:scale-100 h-31.25 lg:h-auto">
						<LogoSvg />
					</div>
					<div className="scale-[35%] lg:scale-75">
						<AkhyarTextSvg />
					</div>
				</div>

				{/* Links Wrapper */}
				<div
					ref={linksWrapperRef}
					className="absolute lg:bottom-0 w-full lg:w-max px-8 pb-8 flex lg:justify-between h-dvh lg:h-auto justify-end gap-8 flex-col lg:flex-row lg:gap-16 will-change-transform"
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
									// onClick={() => {
									// 	if (isMenuOpen) closeMenuImmediate();
									// }}
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
