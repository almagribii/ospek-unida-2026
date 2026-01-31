import FooterSection from "./(component)/FooterSection";
import ScrollSlider from "./(component)/ScrollSlider";

export default function Home() {
	return (
		<div className=" overflow-x-hidden">
			<ScrollSlider />
			<FooterSection />
		</div>
	);
}
