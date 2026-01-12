import Image from "next/image";

type SlideProps = {
	isActive: boolean;
};

export default function Slide9({ isActive }: SlideProps) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: "url('/background/white_texture.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			/>

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

			<div className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative z-20">
				<div className="max-w-4xl w-full text-center">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-black relative z-30">
						Mata Panah ke Atas
					</h1>

					{/* Kartu Konten */}
					<div className="bg-white rounded-[20px] sm:rounded-[30px] md:rounded-[40px] shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden border border-slate-100">
						<div className="absolute inset-0 border-[3px] border-transparent rounded-[20px] sm:rounded-[30px] md:rounded-[40px] pointer-events-none bg-linear-to-br from-blue-100/20 via-transparent to-blue-200/20" />

						<div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
							{/* Paragraf Pembuka */}
							<p className="text-sm sm:text-base md:text-lg leading-relaxed md:px-6">
								Nama <span className="font-bold italic">"Al-Akhyaar"</span>{" "}
								(الأَخْيَار) berarti
								<span className="font-medium italic">
									{" "}
									"orang-orang pilihan yang terbaik"
								</span>
								, berasal dari kata{" "}
								<span className="font-bold italic">khayr</span> (خَيْر) yang
								berarti kebaikan dan kemuliaan. Dalam Al-Qur'an, istilah ini
								disebut dalam Surah Şād ayat 47:
							</p>

							{/* Kaligrafi / Teks Arab */}
							<div className="py-2 sm:py-3 md:py-4">
								<h2
									className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose font-amiri"
									dir="rtl"
								>
									وَإِنَّهُمْ عِنْدَنَا لَمِنَ الْمُصْطَفَيْنَ الْأَخْيَارِ ﴿٤٧﴾
								</h2>
							</div>

							{/* Terjemahan */}
							<p className="italic text-slate-600 text-sm sm:text-base md:text-lg">
								"Sesungguhnya mereka di sisi Kami termasuk orang-orang pilihan
								lagi baik."
							</p>

							{/* Deskripsi Konteks */}
							<div className="text-justify md:text-center text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-slate-50">
								<p>
									Dalam konteks OSPEK Mahasiswa UNIDA 2026,{" "}
									<span className="font-bold">"Al-Akhyaar"</span> melambangkan
									para mahasiswa baru sebagai generasi pilihan yang datang bukan
									hanya untuk menuntut ilmu, tetapi juga untuk mewarisi misi
									perjuangan dan nilai-nilai kebaikan Pondok Modern Darussalam
									Gontor. Mereka diharapkan menjadi insan yang unggul dalam
									ilmu, kuat dalam adab, dan tulus dalam pengabdian, sebagaimana
									cita-cita Gontor untuk mencetak kader umat dan bangsa.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
