"use client";

import type { UrlObject } from "node:url";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { type ReactNode, useRef } from "react";
import styled from "styled-components";

export default function SignButton({
	children,
	link,
}: {
	children: ReactNode;
	link: string | UrlObject;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const tl = useRef<gsap.core.Timeline>(null);

	useGSAP(
		() => {
			const button = containerRef.current?.querySelector(".button");
			if (!button) return;

			// Initialize the Timeline (Paused)
			tl.current = gsap.timeline({ paused: true });

			// MATH EXPLANATION:
			// Button Width: 240px
			// Cap Widths: 56px * 2 = 112px
			// Gap: 16px
			// Long Line = 240 - 112 - 16 = 112px
			// Short Line = 8px

			// --- 1. Outline & Spacing Animation ---
			tl.current
				.to(
					button,
					{
						"--letter-spacing": "6px",
						duration: 0.3,
						ease: "power1.out",
					},
					0,
				)
				.to(
					button,
					{
						"--line-w-main": "8px", // Shrink main line to short
						"--line-w-rest": "112px", // Grow rest line to long
						duration: 0.5,
						ease: "power2.out", // Matches CSS 'ease' nicely
					},
					0,
				);

			// --- 2. Scribble Animations (Drow1 & Drow2) ---
			// Exact timing sequence from original CSS

			// Drow1 (Height)
			tl.current.to(
				button,
				{
					"--d1-h": "100px",
					duration: 0.06,
					ease: "power1.in",
				},
				0,
			);

			// Drow1::before (Width & Opacity)
			tl.current.to(
				button,
				{
					"--d1-b-w": "120px",
					"--d1-b-o": 1,
					duration: 0.08,
					ease: "none",
				},
				0.06,
			);

			// Drow1::after (Width)
			tl.current.to(
				button,
				{
					"--d1-a-w": "80px",
					duration: 0.03,
					ease: "none",
				},
				0.14,
			);

			// Drow2 (Height)
			tl.current.to(
				button,
				{
					"--d2-h": "120px",
					duration: 0.06,
					ease: "none",
				},
				0.2,
			);

			// Drow2::before (Width)
			tl.current.to(
				button,
				{
					"--d2-b-w": "80px",
					duration: 0.03,
					ease: "none",
				},
				0.26,
			);

			// Drow2::after (Width)
			tl.current.to(
				button,
				{
					"--d2-a-w": "124px",
					duration: 0.06,
					ease: "none",
				},
				0.32,
			);
		},
		{ scope: containerRef },
	);

	const handlePlay = () => tl.current?.play();
	const handleReverse = () => tl.current?.reverse();

	return (
		<StyledWrapper ref={containerRef}>
			<div className="container">
				<Link
					className="p-4"
					href={link}
					onMouseEnter={handlePlay}
					onMouseLeave={handleReverse}
					onFocus={handlePlay}
					onBlur={handleReverse}
				>
					<div className="button type--C">
						<div className="button__line" />
						<div className="button__line" />
						<span className="button__text flex flex-row gap-2">{children}</span>
						<div className="button__drow1" />
						<div className="button__drow2" />
					</div>
				</Link>
			</div>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
  /* Default Variables */
  .button {
    --letter-spacing: 2px;
    /* Fixed pixel values to ensure GSAP interpolates correctly */
    --line-w-main: 112px; /* 240 - 56*2 - 16 */
    --line-w-rest: 8px;
    
    /* Scribble Vars */
    --d1-h: 0px;
    --d1-b-w: 0px;
    --d1-b-o: 0;
    --d1-a-w: 0px;
    --d2-h: 0px;
    --d2-b-w: 0px;
    --d2-a-w: 0px;
  }

  .type--C {
    --line_color: #0e2345;
    --back_color: #4270ed;
  }
  
  .button {
    position: relative;
    z-index: 0;
    width: 240px;
    height: 56px;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    color: var(--line_color);
    letter-spacing: var(--letter-spacing);
    /* Removed transition for properties controlled by GSAP to prevent conflict */
    transition: color 0.3s ease; 
  }

  .button__text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  /* Lines Logic - Using CSS Variables controlled by GSAP */
  .button::before,
  .button::after,
  .button__text::before,
  .button__text::after {
    content: "";
    position: absolute;
    height: 3px;
    border-radius: 2px;
    background: var(--line_color);
  }

  .button::before {
    top: 0;
    left: 54px;
    width: var(--line-w-main); 
  }
  .button::after {
    top: 0;
    right: 54px;
    width: var(--line-w-rest); 
  }
  .button__text::before {
    bottom: 0;
    right: 54px;
    width: var(--line-w-main); 
  }
  .button__text::after {
    bottom: 0;
    left: 54px;
    width: var(--line-w-rest); 
  }

  /* End Caps */
  .button__line {
    position: absolute;
    top: 0;
    width: 56px;
    height: 100%;
    overflow: hidden;
  }
  .button__line::before {
    content: "";
    position: absolute;
    top: 0;
    width: 150%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 300px;
    border: solid 3px var(--line_color);
  }
  .button__line:nth-child(1),
  .button__line:nth-child(1)::before { left: 0; }
  .button__line:nth-child(2),
  .button__line:nth-child(2)::before { right: 0; }

  /* Scribble Containers */
  .button__drow1,
  .button__drow2 {
    position: absolute;
    z-index: -1;
    border-radius: 16px;
    transform-origin: 16px 16px;
    background: var(--back_color);
  }

  .button__drow1 {
    top: -16px;
    left: 40px;
    width: 32px;
    height: var(--d1-h);
    transform: rotate(30deg);
  }
  .button__drow1::before, .button__drow1::after {
    content: "";
    position: absolute;
    background: var(--back_color);
  }
  .button__drow1::before {
    bottom: 0;
    left: 0;
    width: var(--d1-b-w);
    height: 32px;
    border-radius: 16px;
    transform-origin: 16px 16px;
    transform: rotate(-60deg);
    opacity: var(--d1-b-o);
  }
  .button__drow1::after {
    top: -10px;
    left: 45px;
    width: var(--d1-a-w);
    height: 32px;
    border-radius: 16px;
    transform-origin: 16px 16px;
    transform: rotate(69deg);
  }

  .button__drow2 {
    top: 44px;
    left: 77px;
    width: 32px;
    height: var(--d2-h);
    transform: rotate(-127deg);
  }
  .button__drow2::before, .button__drow2::after {
    content: "";
    position: absolute;
    background: var(--back_color);
  }
  .button__drow2::before {
    bottom: 0;
    left: 0;
    width: var(--d2-b-w);
    height: 32px;
    border-radius: 16px;
    transform-origin: 16px 16px;
    transform: rotate(-146deg);
  }
  .button__drow2::after {
    bottom: 26px;
    left: -40px;
    width: var(--d2-a-w);
    height: 32px;
    border-radius: 16px;
    transform-origin: 16px 16px;
    transform: rotate(-262deg);
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .button:not(:last-child) {
    margin-bottom: 64px;
  }
`;
