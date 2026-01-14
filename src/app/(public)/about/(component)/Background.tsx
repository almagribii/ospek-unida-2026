import Image from "next/image";

type BackgroundProps = {
	isActive: boolean;
};

export const Background = ({ isActive }: BackgroundProps) => {
	return (
		<div>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: "url('/background/white_texture.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>

			{/* Top Center Decorative Header */}
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 z-10 pt-6">
				<div className="hidden lg:block w-48 h-px bg-gray-800" />
				<Image
					src="/assets/ospek-arabi.webp"
					alt="Quote Icon"
					width={600}
					height={30}
					className="filter brightness-0 shrink-0 hidden lg:block"
				/>
				<div className="hidden lg:block w-48 h-px bg-gray-800" />
			</div>
			<Image
				src="/background/geter.webp"
				alt="Silhouette gedung UNIDA"
				fill
				priority
				sizes="100vw"
				className="object-cover object-bottom opacity-80"
			/>

			{/* Top Left Feather */}
			<Image
				src="/assets/bulu-kiri.webp"
				alt="Feather ornament top left"
				width={280}
				height={280}
				className={`absolute -left-3 -top-6 w-32 opacity-70 drop-shadow-lg sm:w-40 md:w-56 lg:w-72 transition-all duration-1000 ${
					isActive
						? "translate-x-0 translate-y-0 opacity-70"
						: "-translate-x-32 -translate-y-32 opacity-0"
				}`}
			/>

			{/* Top Right Feather */}
			<Image
				src="/assets/bulu-kanan.webp"
				alt="Feather ornament top right"
				width={280}
				height={280}
				className={`absolute -right-3 -top-6 w-32 opacity-70 drop-shadow-lg sm:w-40 md:w-56 lg:w-72 transition-all duration-1000 ${
					isActive
						? "translate-x-0 translate-y-0 opacity-70"
						: "translate-x-32 -translate-y-32 opacity-0"
				}`}
			/>

		{/* Bottom Left Feather */}
		<Image
			src="/assets/bulu-kanan.webp"
			alt="Feather ornament bottom left"
			width={280}
			height={280}
			className={`absolute -left-3 -bottom-6 w-32 opacity-70 drop-shadow-lg sm:w-40 md:w-56 lg:w-72 transition-all duration-1000 rotate-180 ${
				isActive
					? "translate-x-0 translate-y-0 opacity-70"
					: "-translate-x-32 translate-y-32 opacity-0"
			}`}
		/>

		{/* Bottom Right Feather */}
		<Image
			src="/assets/bulu-kiri.webp"
			alt="Feather ornament bottom right"
			width={280}
			height={280}
			className={`absolute -right-3 -bottom-6 w-32 opacity-70 drop-shadow-lg sm:w-40 md:w-56 lg:w-72 transition-all duration-1000 rotate-180 ${
				isActive
					? "translate-x-0 translate-y-0 opacity-70"
					: "translate-x-32 translate-y-32 opacity-0"
			}`}
		/>
		</div>
	);
}
