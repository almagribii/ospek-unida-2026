import Image from "next/image";
import { Background } from "../(component)/Background";

type SlideProps = {
	isActive: boolean;
};

export default function Slide6({ isActive }: SlideProps) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden transition-all duration-1000 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
		>
			<Background isActive={isActive} />

			<div className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative z-20">
				<div className="max-w-6xl w-full text-center font-mirage">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-black relative z-30">
						Lentera
					</h1>

					<div className="bg-white rounded-[20px] sm:rounded-[30px] md:rounded-[40px] shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden border-2 border-transparent bg-linear-to-r from-[#4270ED] via-[#91167c] to-[#e2b870] bg-clip-padding">
						<div className="absolute inset-1 bg-white rounded-2xl sm:rounded-[26px] md:rounded-[36px]" />

						<div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
							<div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
								<div className="flex justify-center">
									<div className="rounded-md overflow-hidden">
										<Image
											src="/filosofi/lentera1.webp"
											alt="Lentera Logo"
											width={400}
											height={300}
											className="w-56 h-44 sm:w-72 sm:h-56 md:w-96 md:h-72 object-contain"
										/>
									</div>
								</div>

								<div className="flex justify-center">
									<div className="rounded-md overflow-hidden">
										<Image
											src="/filosofi/lentera2.webp"
											alt="Lentera Close Up"
											width={400}
											height={300}
											className="w-56 h-44 sm:w-72 sm:h-56 md:w-96 md:h-72 object-contain"
										/>
									</div>
								</div>
							</div>

							<p className="text-sm sm:text-base md:text-lg md:px-6">
								<span className="font-bold">
									Lentera yang menerangi gelapnya malam
								</span>{" "}
								melambangkan harapan, petunjuk, kebijaksanaan, keikhlasan,
								harapan, dan semangat baru yang menginspirasi dan menginovasi.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
