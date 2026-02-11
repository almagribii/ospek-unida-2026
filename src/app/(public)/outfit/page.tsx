import type { Metadata } from "next";
import Slider from "./components/Slider";

export const metadata: Metadata = {
	title: "Outfit",
	description:
		"Outfit, Seragam dan Pakaian yang dapat dipakai di Universitas Darussalam Gontor.",
};

export default function Outfit() {
	return (
		<>
			<Slider />
		</>
	);
}
