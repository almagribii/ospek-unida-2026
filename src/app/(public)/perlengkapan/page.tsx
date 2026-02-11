import type { Metadata } from "next";
import Slider from "./components/Slider";

export const metadata: Metadata = {
	title: "Perlengkapan",
	description:
		"Daftar perlengkapan yang harus dibawa untuk Mahasiswa Baru 2026 Universitas Darussalam Gontor, OSPEK AKHYAR 2026.",
};

export default function Perlengkapan() {
	return (
		<>
			<Slider />
		</>
	);
}
