import Img from "next/image";
import type { RefObject } from "react";
import { ScrollDown } from "./ScrollDown";

export function HeroSection({
	canvasRef,
}: {
	canvasRef: RefObject<HTMLCanvasElement | null>;
}) {
	return (
		<section className="hero relative h-dvh w-full overflow-hidden">
			<canvas
				ref={canvasRef}
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 grid place-items-center perspective-[1000px] transform-3d">
				<div className="header absolute transform-3d p-4">
					<Img
						className="h-auto object-contain"
						src="/logo/akhyar_col.webp"
						alt="akhyar-logo"
						height={500}
						width={500}
					/>
				</div>
				<div className="scroll-down-animate absolute inset-x-0 bottom-14 z-20 flex justify-center">
					<ScrollDown />
				</div>
				<div className="hero-img absolute top-32 will-change-[transform,opacity] rounded-lg">
					<div className="h-18.75 w-125 flex justify-center scale-50 lg:h-31.25 lg:scale-100">
						<Img
							className="object-contain"
							src="/assets/TOTALITY.webp"
							alt="bg-akhyar"
							height={150}
							width={500}
						/>
					</div>
					<div className="h-18.75 w-125 flex justify-center scale-50 lg:h-31.25 lg:scale-100">
						<Img
							className="object-contain"
							src="/assets/MORALITY.webp"
							alt="bg-akhyar"
							height={165}
							width={500}
						/>
					</div>
					<div className="h-18.75 w-125 flex justify-center scale-50 lg:h-31.25 lg:scale-100">
						<Img
							className="object-contain"
							src="/assets/AGILITY.webp"
							alt="bg-akhyar"
							height={150}
							width={375}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
