import Image from "next/image";
import { Background } from "../(component)/Background";

type BackgroundProps = {
	isActive: boolean;
};

export default function Slide2({ isActive }: BackgroundProps) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<Background isActive={isActive} />

			<div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-20">
				<div className="w-full">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center lg:px-30">
						<div className="relative group lg:col-span-2 order-2 lg:order-1 flex justify-center lg:justify-start lg:pr-10">
							<div className="relative aspect-video lg:aspect-video overflow-hidden rounded-2xl border-2 border-transparent bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] shadow-2xl w-full max-w-md lg:max-w-none p-0.5">
								<div className="relative w-full h-full overflow-hidden rounded-xl bg-white">
									<Image
										src="/filosofi/monogram.webp"
										height={450}
										width={800}
										alt="Penjelasan Monogram"
										className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
										priority
									/>
								</div>
							</div>
						</div>

						<div className="flex flex-col space-y-6 sm:space-y-8 order-1 lg:order-2 text-center lg:text-left">
							<div className="space-y-3 sm:space-y-4">
								<h1 className="text-3xl sm:text-4xl md:text-5xl font-mirage font-bold italic text-black tracking-tight leading-tight">
									Penjelasan Monogram
								</h1>
								<div className="w-20 sm:w-full h-0.5 bg-stone-600 rounded-full mx-auto" />
							</div>

							<div className="space-y-4 text-black font-mirage text-sm sm:text-base leading-relaxed">
								<p>
									Monogram <span className="font-bold italic">Al-Akhyar</span>{" "}
									dirancang dengan menggabungkan empat huruf Arab yang membentuk
									kata <span className="font-bold font-amiri">"الأخيار"</span>{" "}
									(Alif-Kha-Ya-Ra) dalam harmoni visual yang elegan.
								</p>
								<p>
									Setiap huruf dalam monogram memiliki makna simbolis:
									kesempurnaan, kekuatan, kebaikan, dan kejayaan. Desain yang
									indah ini mencerminkan nilai-nilai keunggulan dan integritas
									yang menjadi fondasi komunitas OSPEK Al-Akhyar.
								</p>
								<p className="italic text-sm">
									Logo ini merepresentasikan visi untuk menciptakan pemimpin
									masa depan yang tidak hanya cerdas secara intelektual, tetapi
									juga kuat dalam karakter dan komitmen terhadap kebaikan.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
