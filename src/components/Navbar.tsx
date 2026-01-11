"use client";

import Link from "next/link";
import MenuButton from "@/components/MenuButton";

export type NavbarProps = {
	isHidden?: boolean;
	isAtTop?: boolean;
	brandText?: string;
	brandHref?: string;
	onMenuClick?: () => void;
};

export default function Navbar({
	isHidden = false,
	isAtTop = false,
	brandText = "AKHYAR",
	brandHref = "/",
	onMenuClick,
}: NavbarProps) {
	return (
		<nav
			className={`nav fixed top-0 left-0 z-50 flex w-full flex-row items-stretch justify-between bg-transparent px-6 py-4 transition-opacity duration-200 ease-out ${
				isHidden ? "opacity-0 pointer-events-none" : "opacity-100"
			}`}
		>
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
					}`}
				>
					<p className="nav-fade font-mirage font-bold text-xl tracking-[0.2em] transition-[letter-spacing] duration-500 ease-out group-hover:tracking-normal">
						{brandText}
					</p>
				</div>
			</Link>

			<div
				className={`flex items-center justify-center gap-4 ${
					isAtTop ? "lg:text-background text-foreground" : "text-foreground"
				}`}
			>
				<button type="button" onClick={onMenuClick} className="cursor-pointer">
					<p className="nav-fade hidden font-product-sans font-thin uppercase tracking-[0.3em] transition-[letter-spacing] duration-500 ease-out hover:tracking-widest text-shadow-md lg:block">
						MENU
					</p>
				</button>
				<div className="nav-fade">
					<MenuButton
						Color={`${isAtTop ? "lg:bg-background bg-foreground" : "bg-foreground"}`}
						onClick={onMenuClick}
					/>
				</div>
			</div>
		</nav>
	);
}
