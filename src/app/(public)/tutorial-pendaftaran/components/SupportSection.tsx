import { ExternalLink } from "lucide-react";
import { supportData } from "./tutorialData";

export const SupportSection: React.FC = () => {
	return (
		<div className="mt-16 sm:mt-24 p-8 sm:p-12 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
			<div className="flex-1 space-y-3">
				<h2 className="font-mirage text-2xl sm:text-3xl font-bold">
					{supportData.title}
				</h2>
				<p className="text-gray-300 text-base sm:text-lg font-light">
					{supportData.description}
				</p>
			</div>
			<div className="flex gap-3 flex-col sm:flex-row">
				<a
					href={supportData.buttonLink}
					className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition-all duration-300 whitespace-nowrap shadow-lg"
					target="_blank"
					rel="noopener noreferrer"
				>
					{supportData.buttonText} <ExternalLink size={18} />
				</a>
			</div>
		</div>
	);
};
