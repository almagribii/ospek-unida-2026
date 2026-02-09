"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// MAKE SURE THIS PATH IS CORRECT FOR YOUR PROJECT
import { type GalleryItemData, ITEMS } from "./images";

gsap.registerPlugin(CustomEase);

// -----------------------------------------------------------------------------
// TYPES & CONFIG
// -----------------------------------------------------------------------------

interface SplitTypeInstance {
	words: HTMLElement[] | null;
	revert: () => void;
}

type VisibleItem = {
	id: string;
	col: number;
	row: number;
	x: number;
	y: number;
	data: GalleryItemData;
};

const CONFIG = {
	itemWidth: 250,
	itemHeight: 340,
	itemGap: 30,
	columns: 4,
	pad: 2,
	ease: 0.075,
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function Gallery() {
	const wrapperRef = useRef<HTMLDivElement>(null); // NEW: Wrapper for fade-in
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const splitTitleRef = useRef<SplitTypeInstance | null>(null);

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

		if (dist > 50 || now - s.lastUpdateTime > 100) {
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

			s.targetX += dx;
			s.targetY += dy;

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
			const MOMENTUM = 200;
			if (Math.abs(s.dragVelocityX) > 0.1 || Math.abs(s.dragVelocityY) > 0.1) {
				s.targetX += s.dragVelocityX * MOMENTUM;
				s.targetY += s.dragVelocityY * MOMENTUM;
			}
		}
	}, [expandedItem]);

	const handleResize = useCallback(() => {
		updateGrid();
	}, [updateGrid]);

	// --- OPEN ---
	const onItemClick = useCallback(
		(item: VisibleItem, e: React.MouseEvent) => {
			if (state.current.mouseHasMoved || expandedItem) return;

			const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();

			gsap.set(e.currentTarget, { autoAlpha: 0 });
			gsap.to(".gallery-item-visible", {
				opacity: 0,
				duration: 0.3,
				ease: "power2.out",
			});

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
		if (splitTitleRef.current?.words) {
			gsap.to(splitTitleRef.current.words, {
				y: "-100",
				duration: 0.4,
				stagger: 0.05,
				ease: "power2.in",
			});
		}
	}, []);

	// --- CLOSE FINISH ---
	const onFinishClosing = useCallback(() => {
		setExpandedItem(null);
		setTitleText("");

		gsap.to(".gallery-item-visible", {
			autoAlpha: 1,
			opacity: 1,
			duration: 0.5,
			delay: 0.1,
		});
	}, []);

	// ---------------------------------------------------------------------------
	// EFFECTS
	// ---------------------------------------------------------------------------

	// IMAGE PRELOADING
	useEffect(() => {
		let loaded = 0;
		const total = ITEMS.length;
		const threshold = Math.ceil(total * 0.5);
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
			gsap.to(wrapperRef.current, {
				opacity: 1,
				duration: 1.5,
				ease: "power2.out",
			});
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
			if (splitTitleRef.current) splitTitleRef.current.revert();
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

		if (splitTitleRef.current) {
			splitTitleRef.current.revert();
			splitTitleRef.current = null;
		}

		if (!titleText) {
			el.innerText = "";
			return;
		}

		el.innerText = titleText;

		import("split-type").then((module) => {
			const SplitType = module.default;

			const instance = new SplitType(el, { types: "words" });
			splitTitleRef.current = instance as unknown as SplitTypeInstance;

			gsap.set(instance.words, { y: "140%" });

			gsap.to(instance.words, {
				y: "0%",
				duration: 1,
				stagger: 0.05,
				delay: 0.8,
				ease: "power3.out",
			});
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
									loading="lazy"
									decoding="async"
								/>
							</div>
						))}
					</div>

					<div
						className={`fixed inset-0 bg-background pointer-events-none transition-opacity duration-500 z-60 ${
							expandedItem ? "opacity-100" : "opacity-0"
						}`}
					/>
				</div>

				<div
					ref={titleRef}
					className={`fixed left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-20 w-full text-center pointer-events-none z-80 ${
						expandedItem ? "mix-blend-normal" : "mix-blend-difference"
					}`}
				>
					<p className="relative h-12 overflow-hidden text-foreground font-mirage drop-shadow-2xl lg:text-4xl text-2xl font-semibold ra tracking-tighter">
						{/* Text inserted via effect */}
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
		const targetWidth = Math.min(viewportW * 0.4, 500);
		const targetHeight = targetWidth * 1.2;

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
			x: window.innerWidth / 2 - targetWidth / 2,
			y: window.innerHeight / 2 - targetHeight / 2,
			duration: 1,
			ease: "hop",
		});

		if (btn) {
			gsap.fromTo(
				btn,
				{ y: 100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, delay: 0.8, ease: "power2.out" },
			);
		}
	}, [initialRect]);

	const handleClose = () => {
		if (isClosing) return;
		setIsClosing(true);

		onCloseTrigger();

		const el = elRef.current;
		const btn = buttonRef.current;

		if (btn) {
			gsap.to(btn, { y: 100, opacity: 0, duration: 0.3 });
		}

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
				className="fixed bottom-10 left-1/2 -translate-x-1/2 z-80 px-8 py-3 bg-foreground/80 text-background font-semibold rounded-4xl hover:bg-foreground transition-colors cursor-pointer opacity-0"
			>
				Back
			</button>
		</>
	);
}
