import Image from "next/image";
import { type dataUkm, dataUkmPutra, dataUkmPutri } from "./ukm-data";

interface UKMCardsProps {
	activeGender: "mahasiswa" | "mahasiswi";
	onSelectUKM: (ukm: dataUkm) => void;
}

export function UKMCards({ activeGender, onSelectUKM }: UKMCardsProps) {
	const members = activeGender === "mahasiswa" ? dataUkmPutra : dataUkmPutri;

	return (
		<div className="cards fixed inset-0 w-screen h-screen pointer-events-none bg-[url('/background/white_texture.webp')] bg-cover bg-center z-0 flex justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-20">
			<div className="absolute text-center pointer-events-none">
				<h2 className="hidden lg:block text-5xl lg:text-8xl font-bold text-gray-300 uppercase tracking-wider select-none">
					{activeGender === "mahasiswa" ? "Mahasiswa" : "Mahasiswi"}
				</h2>
			</div>
			{members.map((member) => (
				<button
					className="card pointer-events-auto group opacity-0 transform-gpu cursor-pointer"
					key={member.title}
					onClick={() => onSelectUKM(member)}
					type="button"
					aria-label={`Buka detail ${member.title}`}
				>
					<div className="relative flex flex-col">
						<div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block" />

						<div className="relative overflow-hidden rounded-2xl bg-white backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] group-hover:border-linear-to-r group-hover:from-blue-500/60 group-hover:via-purple-500/60 group-hover:to-pink-500/60 transition-all duration-500 group">
							<div className="absolute -top-20 -right-20 w-48 h-48 bg-linear-to-br from-blue-400/0 to-purple-400/0 rounded-full blur-3xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500 hidden lg:block" />
							<div className="absolute -bottom-20 -left-20 w-48 h-48 bg-linear-to-tr from-pink-400/0 to-purple-400/0 rounded-full blur-3xl group-hover:from-pink-500/40 group-hover:to-purple-500/40 transition-all duration-500 hidden lg:block" />

							<div className="relative w-70 sm:w-70 md:w-80 lg:w-90 aspect-square overflow-hidden bg-gray-100 ">
								<Image
									src={member.image}
									alt={member.title}
									fill
									priority={false}
									loading="lazy"
									quality={85}
									className="object-cover group-hover:scale-120 transition-transform duration-800 ease-out"
									sizes="(max-width: 768px) 280px, 320px"
								/>

								<div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

								<div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20 group-hover:border-white/70 transition-all duration-500" />
								<div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20 group-hover:border-white/70 transition-all duration-500" />
							</div>
						</div>

						<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-linear-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-500 pointer-events-none hidden lg:block" />
					</div>
				</button>
			))}
		</div>
	);
}
