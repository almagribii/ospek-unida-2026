import ScrollSlider from "./ScrollSlider";
import FooterSection from "./filosofi";

export default function Home() {
	return (
		<main>
	

			{/* 2. Bagian Slider (Pinned) */}
			<ScrollSlider />

			{/* 3. Bagian Bawah */}
			<FooterSection />
		</main>
	);
}