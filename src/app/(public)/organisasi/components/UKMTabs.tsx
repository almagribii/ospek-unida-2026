import { MahasiswaSvg } from "@/components/MahasiswaSvg";
import { MahasiswiSvg } from "@/components/MahasiswiSvg";

interface UKMTabsProps {
	activeGender: "mahasiswa" | "mahasiswi";
	onGenderChange: (gender: "mahasiswa" | "mahasiswi") => void;
}

export function UKMTabs({ activeGender, onGenderChange }: UKMTabsProps) {
	return (
		<div className="flex justify-center mb-8 pt-20 relative z-20">
			<div className="w-fit rounded-4xl bg-foreground p-2">
				<div className="flex flex-row gap-2">
					<button
						type="button"
						onClick={() => onGenderChange("mahasiswa")}
						className={`p-2 rounded-full ${
							activeGender === "mahasiswa"
								? "bg-primary text-background hover:text-background/75 hover:bg-primary/75"
								: "bg-background text-foreground hover:bg-primary hover:text-background"
						} transition-colors cursor-pointer`}
					>
						<MahasiswaSvg className="h-8 w-8" />
					</button>
					<button
						type="button"
						onClick={() => onGenderChange("mahasiswi")}
						className={`p-2 rounded-full ${
							activeGender === "mahasiswi"
								? "bg-primary text-background hover:text-background/75 hover:bg-primary/75"
								: "bg-background text-foreground hover:bg-primary hover:text-background"
						} transition-colors cursor-pointer`}
					>
						<MahasiswiSvg className="h-8 w-8" />
					</button>
				</div>
			</div>
		</div>
	);
}
