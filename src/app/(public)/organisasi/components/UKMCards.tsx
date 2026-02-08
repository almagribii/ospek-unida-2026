import Image from "next/image";
import { dataUkmPutra, dataUkmPutri } from "./ukm-data";

interface UKMCardsProps {
	activeGender: "mahasiswa" | "mahasiswi";
}

export function UKMCards({ activeGender }: UKMCardsProps) {
	const members = activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri;

	return (
		<div className="cards fixed inset-0 w-screen h-screen pointer-events-none bg-[url('/background/white_texture.webp')] bg-cover bg-center z-0 flex justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-20">
			<div className="absolute text-center pointer-events-none ">
				<h2 className="hidden lg:block text-6xl md:text-9xl font-bold text-gray-300 uppercase tracking-tighter mb-4 select-none">
					UKM {activeGender === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
				</h2>
			</div>
			{members.map((member) => (
				<div
					className="card pointer-events-auto group opacity-0 transform-gpu"
					key={member.title}
				>
					<div className="relative flex flex-col rounded-3xl border-4 border-white shadow-2xl overflow-hidden p-4">
						<div className="card-header bg-primary text-center px-6 py-3 rounded-2xl shadow-lg">
							<h3 className="text-lg lg:text-xl font-bold text-white font-mirage uppercase tracking-wide">
								{member.title}
							</h3>
						</div>
						<div className="relative rounded-b-xl overflow-hidden shadow-lg border-4 border-transparent rounded-2xl bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding p-1 mt-2">
							<div className="card-img relative w-56 sm:w-64 md:w-70 lg:w-90 aspect-square rounded-lg overflow-hidden bg-white">
								<Image
									src={member.image}
									alt={member.title}
									fill
									priority={false}
									loading="lazy"
									quality={75}
									className="object-cover group-hover:scale-105 transition-transform duration-500"
									sizes="(max-width: 768px) 280px, 640px"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</div>
						</div>
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
					</div>
				</div>
			))}
		</div>
	);
}
