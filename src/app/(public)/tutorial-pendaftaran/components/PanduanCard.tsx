"use client";

import Image from "next/image";
import type { dataTutorial } from "./tutorialData";

interface PanduanCardProps extends dataTutorial {
	stepNumber: number;
}

export const PanduanCard: React.FC<PanduanCardProps> = ({
	title,
	image,
	stepNumber,
}) => {
	return (
		<div className="flex flex-col w-full">
			<div className="w-full relative">
				{image && (
					<div className="bg-white/80 backdrop-blur-sm p-2 sm:p-8 shadow-lg rounded-2xl transition-all duration-300 hover:shadow-2xl border-l-4 border-primary overflow-visible">
						<div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
							<div className="relative w-full bg-slate-50 flex justify-center items-center group">
								<Image
									src={image}
									alt={title}
									width={800}
									height={600}
									className="w-full h-auto object-contain transition-transform duration-700 lg:p-4"
								/>
								<div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>
					</div>
				)}

				<div
					className={`absolute -top-6 md:-top-8 ${stepNumber % 2 === 1 ? "-left-2 md:-left-4" : "-right-2 md:-right-4"} w-12 h-12 md:w-28 md:h-28 flex items-center justify-center`}
				>
					<div className="absolute w-full h-full border-4 border-primary rounded-full flex items-center justify-center bg-white">
						<span className="font-mirage text-xs md:text-4xl font-bold text-primary">
							{title}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
