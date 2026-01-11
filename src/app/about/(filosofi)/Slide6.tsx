import Image from "next/image";

export default function Slide6({ isActive }: { isActive: boolean }) {
	return (
		<div
			className={`absolute inset-0 transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<Image
				src="/filosofi/nama1.png"
				alt="Awal"
				fill
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-black/40" />
			<h2
				className={`absolute bottom-20 left-20 text-4xl transition-all delay-300 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
			>
				Slide Pertama: Awal Perjalanan
			</h2>
		</div>
	);
}