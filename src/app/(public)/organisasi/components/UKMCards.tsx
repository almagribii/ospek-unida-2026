import Image from "next/image";
import { dataUkmPutra, dataUkmPutri } from "./ukm-data";

interface UKMCardsProps {
	activeGender: "mahasiswa" | "mahasiswi";
}

export function UKMCards({ activeGender }: UKMCardsProps) {
	const members = activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri;

	return (
		<div className="cards fixed inset-0 w-screen h-screen flex items-center justify-center pointer-events-none bg-[url('/background/white_texture.webp')] bg-cover bg-center z-0">
			<div className="absolute text-center pointer-events-none ">
				<h2 className="hidden lg:block text-6xl md:text-9xl font-bold text-gray-300 uppercase tracking-tighter mb-4 select-none">
					UKM {activeGender === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
				</h2>
			</div>
			{members.map((member) => (
				<div className="card pointer-events-auto group" key={member.title}>
					<div className="relative flex flex-col rounded-3xl border-4 border-white shadow-2xl overflow-hidden p-4">
						<div className="card-header bg-primary text-center px-6 py-3 rounded-xl shadow-lg">
							<h3 className="text-lg lg:text-xl font-bold text-white font-mirage uppercase tracking-wide">
								UKM {member.title}
							</h3>
						</div>
						<div className="relative rounded-b-xl overflow-hidden shadow-lg border-4 border-transparent rounded-2xl bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding p-1 mt-2">
							<div className="card-img relative w-70 lg:w-160 aspect-square rounded-lg overflow-hidden bg-white">
								<Image
									src={member.image}
									alt={member.title}
									fill
									loading="lazy"
									className="object-cover group-hover:scale-105 transition-transform duration-500 l"
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
