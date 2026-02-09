"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { PointerIcon } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// MAKE SURE THIS PATH IS CORRECT FOR YOUR PROJECT
import { type GalleryItemData, ITEMS } from "./images";

gsap.registerPlugin(CustomEase);

// -----------------------------------------------------------------------------
// TYPES & CONFIG
// -----------------------------------------------------------------------------

type VisibleItem = {
	id: string;
	col: number;
	row: number;
	x: number;
	y: number;
	data: GalleryItemData;
};

const getConfig = () => {
	const mobile = typeof window !== "undefined" && window.innerWidth < 768;
	return {
		itemWidth: mobile ? 180 : 250,
		itemHeight: mobile ? 240 : 340,
		itemGap: mobile ? 20 : 30,
		columns: 4,
		pad: mobile ? 1 : 2,
		ease: mobile ? 0.12 : 0.075,
		dragScale: mobile ? 0.6 : 1,
		momentum: mobile ? 80 : 200,
		updateThreshold: mobile ? 150 : 50,
		updateInterval: mobile ? 250 : 100,
		mobile,
	};
};

let CONFIG = getConfig();

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function Gallery() {
	const wrapperRef = useRef<HTMLDivElement>(null); // NEW: Wrapper for fade-in
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	const [mounted, setMounted] = useState(false);
	const [visibleItems, setVisibleItems] = useState<VisibleItem[]>([]);
	const [expandedItem, setExpandedItem] = useState<{
		data: GalleryItemData;
		initialRect: DOMRect;
		originalId: string;
	} | null>(null);
	const [titleText, setTitleText] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [loadProgress, setLoadProgress] = useState(0);

	// Physics State
	const state = useRef({
		isDragging: false,
		startX: 0,
		startY: 0,
		targetX: 0,
		targetY: 0,
		currentX: 0,
		currentY: 0,
		dragVelocityX: 0,
		dragVelocityY: 0,
		lastDragTime: 0,
		mouseHasMoved: false,
		visibleItemIds: new Set<string>(),
		lastUpdateTime: 0,
		lastX: 0,
		lastY: 0,
	});

	const rafId = useRef<number | null>(null);

	// ---------------------------------------------------------------------------
	// CORE LOGIC
	// ---------------------------------------------------------------------------

	const updateGrid = useCallback(() => {
		if (!canvasRef.current) return;

		const s = state.current;
		const { itemWidth, itemHeight, itemGap, columns, pad } = CONFIG;
		const spacingX = itemWidth + itemGap;
		const spacingY = itemHeight + itemGap;

		// Visible area in canvas coordinates
		const viewLeft = -s.currentX;
		const viewRight = -s.currentX + window.innerWidth;
		const viewTop = -s.currentY;
		const viewBottom = -s.currentY + window.innerHeight;

		// Grid indices with fixed item padding
		const startCol = Math.floor(viewLeft / spacingX) - pad;
		const endCol = Math.ceil(viewRight / spacingX) + pad;
		const startRow = Math.floor(viewTop / spacingY) - pad;
		const endRow = Math.ceil(viewBottom / spacingY) + pad;

		const newItems: VisibleItem[] = [];
		const newIds = new Set<string>();
		let hasChanges = false;

		for (let row = startRow; row <= endRow; row++) {
			for (let col = startCol; col <= endCol; col++) {
				const id = `${col},${row}`;
				newIds.add(id);
				const itemIndex =
					(((row * columns + col) % ITEMS.length) + ITEMS.length) %
					ITEMS.length;

				if (!s.visibleItemIds.has(id)) hasChanges = true;

				newItems.push({
					id,
					col,
					row,
					x: col * spacingX,
					y: row * spacingY,
					data: ITEMS[itemIndex],
				});
			}
		}

		if (s.visibleItemIds.size !== newIds.size) hasChanges = true;

		if (hasChanges) {
			s.visibleItemIds = newIds;
			setVisibleItems(newItems);
		}
	}, []);

	const animate = useCallback(() => {
		const s = state.current;

		s.currentX += (s.targetX - s.currentX) * CONFIG.ease;
		s.currentY += (s.targetY - s.currentY) * CONFIG.ease;

		if (canvasRef.current) {
			canvasRef.current.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0)`;
		}

		const dist = Math.sqrt(
			(s.currentX - s.lastX) ** 2 + (s.currentY - s.lastY) ** 2,
		);
		const now = Date.now();

		if (
			dist > CONFIG.updateThreshold ||
			now - s.lastUpdateTime > CONFIG.updateInterval
		) {
			updateGrid();
			s.lastX = s.currentX;
			s.lastY = s.currentY;
			s.lastUpdateTime = now;
		}

		rafId.current = requestAnimationFrame(animate);
	}, [updateGrid]);

	// ---------------------------------------------------------------------------
	// HANDLERS
	// ---------------------------------------------------------------------------

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (expandedItem) return;

			const s = state.current;
			s.isDragging = true;
			s.mouseHasMoved = false;

			s.startX = e.clientX;
			s.startY = e.clientY;
			s.lastDragTime = Date.now();
			s.dragVelocityX = 0;
			s.dragVelocityY = 0;

			if (containerRef.current) containerRef.current.style.cursor = "grabbing";
		},
		[expandedItem],
	);

	const handlePointerMove = useCallback(
		(e: PointerEvent) => {
			const s = state.current;
			if (!s.isDragging || expandedItem) return;

			const dx = e.clientX - s.startX;
			const dy = e.clientY - s.startY;

			if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
				s.mouseHasMoved = true;
			}

			const now = Date.now();
			const dt = Math.max(10, now - s.lastDragTime);
			s.lastDragTime = now;
			s.dragVelocityX = dx / dt;
			s.dragVelocityY = dy / dt;

			s.targetX += dx * CONFIG.dragScale;
			s.targetY += dy * CONFIG.dragScale;

			s.startX = e.clientX;
			s.startY = e.clientY;
		},
		[expandedItem],
	);

	const handlePointerUp = useCallback(() => {
		const s = state.current;
		if (!s.isDragging) return;
		s.isDragging = false;

		if (containerRef.current) containerRef.current.style.cursor = "grab";

		if (!expandedItem) {
			const M = CONFIG.momentum;
			if (Math.abs(s.dragVelocityX) > 0.1 || Math.abs(s.dragVelocityY) > 0.1) {
				s.targetX += s.dragVelocityX * M;
				s.targetY += s.dragVelocityY * M;
			}
		}
	}, [expandedItem]);

	const handleResize = useCallback(() => {
		CONFIG = getConfig();
		updateGrid();
	}, [updateGrid]);

	// --- OPEN ---
	const onItemClick = useCallback(
		(item: VisibleItem, e: React.MouseEvent) => {
			if (state.current.mouseHasMoved || expandedItem) return;

			const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

			setTitleText(item.data.name);
			setExpandedItem({
				data: item.data,
				initialRect: rect,
				originalId: item.id,
			});
		},
		[expandedItem],
	);

	// --- CLOSE START ---
	const onCloseExpanded = useCallback(() => {
		const el = titleRef.current?.querySelector("p");
		if (el) {
			gsap.to(el, {
				y: "100%",
				duration: 0.4,
				ease: "power2.in",
			});
		}
	}, []);

	// --- CLOSE FINISH ---
	const onFinishClosing = useCallback(() => {
		setExpandedItem(null);
		setTitleText("");
	}, []);

	// ---------------------------------------------------------------------------
	// EFFECTS
	// ---------------------------------------------------------------------------

	// IMAGE PRELOADING
	useEffect(() => {
		let loaded = 0;
		const total = ITEMS.length;
		const threshold = Math.ceil(total * 0.8);
		let resolved = false;

		for (const item of ITEMS) {
			const img = new Image();
			img.src = item.img;
			const onDone = () => {
				loaded++;
				setLoadProgress(Math.round((loaded / total) * 100));
				if (loaded >= threshold && !resolved) {
					resolved = true;
					setIsLoading(false);
				}
			};
			img.onload = onDone;
			img.onerror = onDone;
		}
	}, []);

	useEffect(() => {
		if (isLoading) return;

		setMounted(true);
		CustomEase.create("hop", "0.9, 0, 0.1, 1");

		if (wrapperRef.current) {
			wrapperRef.current.style.opacity = "1";
		}

		updateGrid();
		animate();

		window.addEventListener("resize", handleResize);
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			if (rafId.current) cancelAnimationFrame(rafId.current);
		};
	}, [
		isLoading,
		updateGrid,
		animate,
		handleResize,
		handlePointerMove,
		handlePointerUp,
	]);

	// TITLE ANIMATION
	useEffect(() => {
		const el = titleRef.current?.querySelector("p");
		if (!el) return;

		if (!titleText) {
			el.innerText = "";
			gsap.set(el, { y: "100%" });
			return;
		}

		el.innerText = titleText;
		gsap.set(el, { y: "100%" });
		gsap.to(el, {
			y: "0%",
			duration: 0.6,
			delay: 0.8,
			ease: "power3.out",
		});
	}, [titleText]);

	// ---------------------------------------------------------------------------
	// RENDER
	// ---------------------------------------------------------------------------

	return (
		<>
			{/* LOADING SCREEN */}
			{isLoading && (
				<div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
					<p className="font-mirage text-2xl text-foreground tracking-tighter mb-4">
						Galeri
					</p>
					<div className="w-48 h-0.5 bg-foreground/20 rounded-full overflow-hidden">
						<div
							className="h-full bg-foreground transition-all duration-300 ease-out"
							style={{ width: `${loadProgress}%` }}
						/>
					</div>
					<p className="mt-2 text-sm text-foreground/60 font-mono">
						{loadProgress}%
					</p>
				</div>
			)}

			{/* PARENT ELEMENT WRAPPER FOR INITIAL FADE-IN */}
			<div ref={wrapperRef} className="opacity-0">
				<div
					ref={containerRef}
					onPointerDown={handlePointerDown}
					className="relative w-screen h-screen overflow-hidden cursor-grab touch-none bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center select-none"
				>
					<div
						ref={canvasRef}
						className="absolute top-0 left-0 will-change-transform"
					>
						{visibleItems.map((item) => (
							// biome-ignore lint/a11y/noStaticElementInteractions: Handled
							// biome-ignore lint/a11y/useKeyWithClickEvents: Handled
							<div
								key={item.id}
								className={`gallery-item-visible absolute bg-foreground overflow-hidden cursor-pointer ${
									expandedItem?.originalId === item.id ? "invisible" : "visible"
								}`}
								style={{
									left: `${item.x}px`,
									top: `${item.y}px`,
									width: `${CONFIG.itemWidth}px`,
									height: `${CONFIG.itemHeight}px`,
								}}
								onClick={(e) => onItemClick(item, e)}
							>
								{/** biome-ignore lint/performance/noImgElement: static */}
								<img
									src={item.data.img}
									alt={item.data.name}
									className="w-full h-full object-cover pointer-events-none"
									draggable={false}
								/>
							</div>
						))}
					</div>
				</div>

				<div
					ref={titleRef}
					className="fixed left-1/2 -translate-x-1/2 bottom-25 text-center pointer-events-none z-80 overflow-hidden"
				>
					<p className="relative px-6 py-2 translate-y-full bg-background text-foreground rounded-4xl font-mirage lg:text-4xl text-2xl font-medium tracking-tighter drop-shadow-2xl">
						{/* Text inserted via effect */}
					</p>
				</div>

				<div className="fixed bottom-5 right-5 px-2 py-1 lg:px-6 lg:py-2 bg-foreground text-background tracking-widest pointer-events-none rounded-4xl flex flex-row justify-center items-center gap-2">
					<PointerIcon className="w-4 h-4 lg:w-6 lg:h-6" />
					<p className="lg:text-base text-sm text-start">
						Geser layar untuk melihat galeri!
					</p>
				</div>
			</div>

			{mounted &&
				expandedItem &&
				createPortal(
					<ExpandedView
						data={expandedItem.data}
						initialRect={expandedItem.initialRect}
						onCloseTrigger={onCloseExpanded}
						onFinishClosing={onFinishClosing}
					/>,
					document.body,
				)}
		</>
	);
}

// -----------------------------------------------------------------------------
// EXPANDED VIEW + BACK BUTTON
// -----------------------------------------------------------------------------

interface ExpandedViewProps {
	data: GalleryItemData;
	initialRect: DOMRect;
	onCloseTrigger: () => void;
	onFinishClosing: () => void;
}

function ExpandedView({
	data,
	initialRect,
	onCloseTrigger,
	onFinishClosing,
}: ExpandedViewProps) {
	const elRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		const el = elRef.current;
		const btn = buttonRef.current;
		if (!el) return;

		const viewportW = window.innerWidth;
		const isSmall = viewportW < 768;
		const targetWidth = isSmall
			? Math.min(viewportW * 0.8, 400)
			: Math.min(viewportW * 0.4, 500);
		const targetHeight = targetWidth * 1.2;

		if (isSmall) {
			// Mobile: simple slide-up from bottom, no width/height tween
			gsap.set(el, {
				autoAlpha: 1,
				width: targetWidth,
				height: targetHeight,
				x: viewportW / 2 - targetWidth / 2,
				y: window.innerHeight,
			});
			gsap.to(el, {
				y: window.innerHeight / 2 - targetHeight / 2,
				duration: 0.6,
				ease: "power3.out",
			});
		} else {
			// Desktop: expand from clicked position
			gsap.set(el, {
				autoAlpha: 1,
				width: initialRect.width,
				height: initialRect.height,
				x: initialRect.left,
				y: initialRect.top,
			});
			gsap.to(el, {
				width: targetWidth,
				height: targetHeight,
				x: viewportW / 2 - targetWidth / 2,
				y: window.innerHeight / 2 - targetHeight / 2,
				duration: 1,
				ease: "hop",
			});
		}

		if (btn) {
			gsap.fromTo(
				btn,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					delay: isSmall ? 0.4 : 0.8,
					ease: "power2.out",
				},
			);
		}
	}, [initialRect]);

	const handleClose = () => {
		if (isClosing) return;
		setIsClosing(true);

		onCloseTrigger();

		const el = elRef.current;
		const btn = buttonRef.current;
		const isSmall = window.innerWidth < 768;

		if (btn) {
			gsap.to(btn, { y: 100, opacity: 0, duration: 0.3 });
		}

		if (isSmall) {
			// Mobile: slide down off screen
			gsap.to(el, {
				y: window.innerHeight,
				duration: 0.5,
				ease: "power2.in",
				onComplete: () => {
					onFinishClosing();
				},
			});
		} else {
			gsap.to(el, {
				width: initialRect.width,
				height: initialRect.height,
				x: initialRect.left,
				y: initialRect.top,
				duration: 0.8,
				ease: "hop",
				onComplete: () => {
					onFinishClosing();
				},
			});
		}
	};

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Click to close */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Click to close */}
			<div
				ref={elRef}
				onClick={handleClose}
				className="fixed z-70 top-0 left-0 bg-foreground overflow-hidden cursor-pointer shadow-2xl opacity-0"
			>
				{/** biome-ignore lint/performance/noImgElement: static */}
				<img
					src={data.img}
					alt={data.name}
					className="w-full h-full object-cover"
				/>
			</div>

			<button
				ref={buttonRef}
				type="button"
				onClick={handleClose}
				className="fixed bottom-10 left-1/2 -translate-x-1/2 z-80 px-8 py-3 bg-foreground text-background font-semibold rounded-4xl hover:bg-foreground/80 transition-colors cursor-pointer opacity-0"
			>
				Back
			</button>
		</>
	);
}
