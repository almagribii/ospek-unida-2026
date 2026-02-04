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
				<h2 className="text-4xl md:text-5xl font-bold text-gray-800">
					UKM {activeGender === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
				</h2>
			</div>
			{members.map((member) => (
				<div className="card pointer-events-auto" key={member.title}>
					<div className="card-img relative w-40 lg:w-120 aspect-9/16">
						<Image src={member.image} alt="" fill className="object-cover" />
					</div>
					<div className="card-content text-center">
						<h3>{member.title}</h3>
					</div>
				</div>
			))}
		</div>
	);
}
