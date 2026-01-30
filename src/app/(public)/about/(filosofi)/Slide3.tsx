import Image from "next/image";
import { Background } from "../(component)/Background";

type SlideProps = {
	isActive: boolean;
};

export default function Slide3({ isActive }: SlideProps) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<Background isActive={isActive} />

			<div className="min-h-screen flex items-center justify-center p-2 xs:p-3 sm:p-4 relative z-20">
				<div className="max-w-7xl w-full">
					{/* headline */}
					<div className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-12 font-mirage">
						<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 xs:mb-3 sm:mb-6">
							Menara Gontor
						</h1>
						<div className="h-1 w-20 xs:w-24 sm:w-32 md:w-40 bg-black mx-auto" />
					</div>
					{/* menara */}
					<div className="flex flex-row flex-nowrap justify-center items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 xs:mb-6 sm:mb-8 md:mb-12">
						<div className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg flex-1 max-w-32 xs:max-w-40 sm:max-w-72 md:max-w-80 border-2 border-transparent bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding p-0.5 sm:p-1">
							<div className="relative w-full h-auto bg-white rounded-md sm:rounded-xl">
								<Image
									src="/filosofi/menara1.webp"
									width={520}
									height={520}
									alt="Logo Menara Gontor"
									className="w-full h-auto object-contain transition-transform duration-300 rounded lg:rounded-xl"
								/>
							</div>
						</div>

						<div className="shrink-0 flex items-center justify-center">
							<svg
								className="w-8 xs:w-10 sm:w-12 md:w-16 lg:w-20 text-gray-500 hover:text-gray-700 transition-colors"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-label="Arrow pointing right"
							>
								<title>Arrow pointing right</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</div>

						<div className="relative group overflow-hidden rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg flex-1 max-w-32 xs:max-w-40 sm:max-w-72 md:max-w-80 border-2 border-transparent bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding p-0.5 sm:p-1">
							<div className="relative w-full h-auto bg-white rounded-md sm:rounded-xl">
								<Image
									src="/filosofi/menara2.webp"
									width={320}
									height={320}
									alt="Menara Gontor Building"
									className="w-full h-auto object-contain transition-transform duration-300 rounded lg:rounded-xl"
									priority
								/>
							</div>
						</div>
					</div>

					{/* content bawah */}
					<div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-transparent bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding">
						<div className="absolute inset-1 bg-white rounded-2xl sm:rounded-[26px] md:rounded-[36px]" />

						<div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
							<div className="space-y-3 sm:space-y-4 text-black font-product-sans text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
								<p className="text-justify">
									Menara Gontor merupakan ikon Pondok Modern Darussalam Gontor
									yang menggambarkan simbol{" "}
									<span className="font-bold">mercusuar peradaban Islam</span>{" "}
									yang kokoh serta menjadi pengingat akan pentingnya ajaran
									Islam seperti yang diisyaratkan oleh moto{" "}
									<span className="font-bold italic">
										"al Islamu ya'lu wa laa yu'alaa yu'laaih"
									</span>{" "}
									<span className="font-medium italic">
										(Islam itu tinggi dan tidak ada yang mengalahkan).
									</span>
								</p>

								<p className="text-justify">
									Menara juga mencerminkan nilai-nilai Gontor seperti{" "}
									<span className="font-bold">Panca Jiwa</span> sebagai misi
									hidup dan <span className="font-bold">Panca Jangka</span>{" "}
									sebagai visinya. Yang diharapkan menjadi syi'ar dan pengingat
									bagi mahasiswa baru akan almamater pendidikannya.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
