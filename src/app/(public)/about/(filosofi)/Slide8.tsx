import { Background } from "../(component)/Background";

type SlideProps = {
	isActive: boolean;
};

export default function Slide8({ isActive }: SlideProps) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<Background isActive={isActive} />

			<div className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative z-20">
				<div className="max-w-7xl w-full text-center">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-black relative z-30">
						Filosofi Nama
					</h1>

					<div className="bg-white rounded-[20px] sm:rounded-[30px] md:rounded-[40px] shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden border border-slate-100">
						<div className="absolute inset-0 border-[3px] border-transparent rounded-[20px] sm:rounded-[30px] md:rounded-[40px] pointer-events-none bg-linear-to-br from-blue-100/20 via-transparent to-blue-200/20" />

						<div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
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

							<div className="py-2 sm:py-3 md:py-4">
								<h2
									className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose font-amiri"
									dir="rtl"
								>
									وَإِنَّهُمْ عِنْدَنَا لَمِنَ الْمُصْطَفَيْنَ الْأَخْيَارِ ﴿٤٧﴾
								</h2>
							</div>

							<p className="italic text-slate-600 text-sm sm:text-base md:text-lg">
								"Sesungguhnya mereka di sisi Kami termasuk orang-orang pilihan
								lagi baik."
							</p>

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
