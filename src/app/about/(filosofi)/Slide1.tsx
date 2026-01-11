import Image from "next/image";

type SlideProps = {
	isActive: boolean;
};

export default function Slide1({ isActive }: SlideProps) {
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
				src="/background/Gedung Terpadu Background.png"
				alt="Silhouette gedung UNIDA"
				fill
				priority
				sizes="100vw"
				className="object-cover object-bottom opacity-80"
			/>

			<div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-white/40" />
			<div className="absolute inset-0 bg-linear-to-br from-emerald-100/40 via-transparent to-red-100/40" />

			<Image
				src="/logo/Bulu Transparan.png"
				alt="Feather ornament"
				width={280}
				height={280}
				className="absolute -left-6 -top-10 w-48 opacity-70 drop-shadow-lg md:w-72"
			/>
			<Image
				src="/logo/Bulu Transparan.png"
				alt="Feather ornament"
				width={220}
				height={220}
				className="absolute -right-10 bottom-4 w-40 rotate-180 opacity-70 drop-shadow-lg md:w-64"
			/>

			{/* <div className="relative z-10 flex h-full items-center justify-center px-6 py-12">
				<div className="grid w-full max-w-6xl gap-8 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-xl md:gap-12 md:grid-cols-[1fr_1.1fr] md:p-12">
					<div className="space-y-6 text-gray-800">
						<div>
							<p className="text-[11px] uppercase tracking-[0.32em] text-gray-500">
								Filosofi Nama
							</p>
							<h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
								AKHYAR
							</h1>
						</div>

						<div className="flex w-32 items-center gap-2">
							<span className="h-1.5 flex-1 rounded-full bg-red-600" />
							<span className="h-1.5 flex-1 rounded-full bg-emerald-700" />
							<span className="h-1.5 flex-[0.6] rounded-full bg-gray-700" />
						</div>

						<div className="space-y-4">
							<p className="text-base leading-relaxed text-gray-700 md:text-lg">
								Diambil dari akar kata{" "}
								<span className="font-semibold text-emerald-700">al-khayr</span>{" "}
								yang berarti{" "}
								<span className="font-semibold">kebaikan terbaik</span>. Nama
								ini menjadi pengingat agar setiap langkah kader membawa manfaat,
								mencari ridha Allah, dan menghadirkan keteladanan yang
								menyejukkan.
							</p>
							<p className="text-sm text-gray-600 leading-relaxed">
								Tiga garis warna terinspirasi dari identitas UNIDA Gontor:
								<span className="block mt-2 text-red-600 font-semibold">
									🔴 Keberanian
								</span>
								<span className="block text-emerald-700 font-semibold">
									🟢 Keteguhan
								</span>
								<span className="block text-gray-700 font-semibold">
									🔘 Kejernihan tujuan
								</span>
							</p>
						</div>
					</div>

					<div className="space-y-6">
						<div className="rounded-2xl border border-white/60 bg-gradient-to-br from-emerald-50/80 to-red-50/80 p-6 shadow-lg backdrop-blur-lg overflow-hidden">
							<Image
								src="/filosofi/nama1.png"
								alt="Filosofi Nama AKHYAR"
								width={300}
								height={300}
								className="w-full h-auto object-contain"
								priority
							/>
						</div>

						<div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-lg backdrop-blur-lg">
							<p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 font-semibold">
								Ayat Rujukan
							</p>
							<p className="mt-4 text-lg font-semibold leading-loose text-gray-900 md:text-xl text-right">
								وَلْتَكُنْ مِنْكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ
							</p>
							<p className="mt-2 text-sm font-semibold text-gray-700">
								QS Ali Imran (3): 104
							</p>
							<p className="mt-3 text-sm leading-relaxed text-gray-700">
								"Hendaklah ada di antara kamu segolongan umat yang menyeru
								kepada kebaikan, memerintahkan yang makruf, dan mencegah dari
								yang mungkar; mereka itulah orang-orang yang beruntung."
							</p>
						</div>

						<div className="rounded-2xl border border-white/50 bg-emerald-50/70 p-5 shadow-md backdrop-blur">
							<p className="text-sm font-bold text-emerald-900">
								✨ Makna Singkat
							</p>
							<p className="mt-2 text-sm leading-relaxed text-emerald-900">
								Akhyar adalah ajakan terus-menerus untuk memilih jalan terbaik,
								mengisi hidup dengan amal salih, dan mengajak sesama menuju
								kebaikan bersama.
							</p>
						</div>
					</div>
				</div>
			</div> */}

			<div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 font-sans text-slate-800">
				<div className="max-w-4xl w-full text-center">
					{/* Judul Utama */}
					<h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 tracking-tight">
						Filosofi Nama
					</h1>

					{/* Kartu Konten */}
					<div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 relative overflow-hidden border border-slate-100">
						{/* Efek Gradasi di Pinggir (Opsional) */}
						<div className="absolute inset-0 border-[3px] border-transparent rounded-[40px] pointer-events-none bg-linear-to-br from-blue-100/20 via-transparent to-blue-200/20" />

						<div className="relative z-10 space-y-8">
							{/* Paragraf Pembuka */}
							<p className="text-lg leading-relaxed md:px-6">
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
							<div className="py-4">
								<h2
									className="text-3xl md:text-5xl font-serif leading-loose"
									dir="rtl"
								>
									وَإِنَّهُمْ عِنْدَنَا لَمِنَ الْمُصْطَفَيْنَ الْأَخْيَارِ ﴿٤٧﴾
								</h2>
							</div>

							{/* Terjemahan */}
							<p className="italic text-slate-600 text-lg">
								"Sesungguhnya mereka di sisi Kami termasuk orang-orang pilihan
								lagi baik."
							</p>

							{/* Deskripsi Konteks */}
							<div className="text-justify md:text-center text-slate-700 leading-relaxed space-y-4 pt-4 border-t border-slate-50">
								<p>
									Dalam konteks Ospek Mahasiswa UNIDA 2026,{" "}
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
