import type { Metadata } from "next";
import FooterSection from "./(component)/FooterSection";
import ScrollSlider from "./(component)/ScrollSlider";

export const metadata: Metadata = {
	title: "Tentang Kami",
	description:
		"Ketahui lebih lanjut tentang OSPEK tahun ini mulai dari filosofi, lambang dan juga motto. OSPEK AKHYAR 2026.",
};

export default function Home() {
	return (
		<div className=" overflow-x-hidden">
			<ScrollSlider />
			<FooterSection />
		</div>
	);
}
