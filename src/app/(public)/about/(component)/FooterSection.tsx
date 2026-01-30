import Image from "next/image";

export default function FooterSection() {
	return (
		<section
			className="h-svh flex min-h-screen items-center justify-center p-3 sm:p-4 relative overflow-hidden"
			style={{
				backgroundImage: "url('/background/blue_texture.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="absolute inset-0 bg-black/30" />

			<div className="relative z-10 flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 px-4">
				<div className="flex justify-center">
					<Image
						src="/logo/logo.webp"
						alt="Akhyar Logo"
						width={200}
						height={200}
						className="w-40 h-40 sm:w-48 sm:h-48 md:w-74 md:h-74 object-contain"
					/>
				</div>

				<div className="flex justify-center w-full max-w-3xl">
					<Image
						src="/logo/akhyar_text.webp"
						alt="Akhyar Text"
						width={600}
						height={200}
						className="w-80 sm:w-96 md:w-160 object-contain drop-shadow-lg"
						style={{
							filter: "brightness(1.2) saturate(1.3)",
						}}
					/>
				</div>

				<p className="text-xl sm:text-2xl md:text-3xl text-orange-300 font-mirage font-bold tracking-widest">
					OSPEK UNIDA GONTOR 2026
				</p>

				<p className="text-xl sm:text-2xl md:text-3xl text-orange-200 font-mirage italic max-w-xl text-center">
					Together we make it meaningful
				</p>
			</div>
		</section>
	);
}
