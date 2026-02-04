interface UKMTabsProps {
	activeGender: "mahasiswa" | "mahasiswi";
	onGenderChange: (gender: "mahasiswa" | "mahasiswi") => void;
}

export function UKMTabs({ activeGender, onGenderChange }: UKMTabsProps) {
	return (
		<div className="flex justify-center gap-4 mb-8 pt-20 relative z-20">
			<button
				type="button"
				onClick={() => onGenderChange("mahasiswa")}
				className={`px-8 py-3 rounded-lg font-semibold transition-all ${
					activeGender === "mahasiswa"
						? "bg-blue-600 text-white"
						: "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}`}
			>
				Mahasiswa
			</button>
			<button
				type="button"
				onClick={() => onGenderChange("mahasiswi")}
				className={`px-8 py-3 rounded-lg font-semibold transition-all ${
					activeGender === "mahasiswi"
						? "bg-blue-600 text-white"
						: "bg-gray-200 text-gray-700 hover:bg-gray-300"
				}`}
			>
				Mahasiswi
			</button>
		</div>
	);
}
