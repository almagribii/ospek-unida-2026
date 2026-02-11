import type { Metadata } from "next";
import Gallery from "./components/Gallery";

export const metadata: Metadata = {
	title: "Galeri",
	description:
		"Kumpulan foto dan dokumentasi Universitas Darussalam Gontor dalam bentuk galeri interaktif. OSPEK AKHYAR 2026.",
};

export default function Galeri() {
	return (
		<div>
			<Gallery />
		</div>
	);
}
