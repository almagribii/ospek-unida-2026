import Image from "next/image";
import { dataUkmPutra, dataUkmPutri } from "./ukm-data";

interface UKMCardsProps {
	activeGender: "mahasiswa" | "mahasiswi";
}

export function UKMCards({ activeGender }: UKMCardsProps) {
	const members = activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri;

	return (
		<div className="cards fixed inset-0 w-screen h-screen flex items-center justify-center pointer-events-none bg-[url('/background/white_texture.webp')] bg-cover bg-center z-0">
			<div className="absolute text-center pointer-events-none">
				<h2 className="text-6xl md:text-9xl font-bold text-gray-300 uppercase tracking-tighter mb-4 select-none">
					UKM {activeGender === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
				</h2>
			
			</div>
			{members.map((member) => (
				<div className="card pointer-events-auto group" key={member.title}>
					<div className="relative">
						<div className="card-img relative w-40 lg:w-180 aspect-square rounded-2xl overflow-hidden shadow-2xl">
							<Image 
								src={member.image} 
								alt={member.title} 
								fill 
								className="object-cover group-hover:scale-105 transition-transform duration-500" 
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</div>
						<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
					</div>
					<div className="card-content text-center mt-6">
						<h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 font-mirage">
							{member.title}
						</h3>
					</div>
				</div>
			))}
		</div>
	);
}