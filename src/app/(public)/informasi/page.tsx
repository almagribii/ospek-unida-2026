import type { Metadata } from "next";
import Content from "./components/Content";
import Hero from "./components/Hero";

export const metadata: Metadata = {
	title: "Pusat Informasi",
	description:
		"Daftar informasi tentang OSPEK maupun Admisi (PMB) Universitas Darussalam Gontor, cari semua kebutuhan, keperluan dan seputar informasi OSPEK disini. OSPEK AKHYAR 2026.",
};

export default function Informasi() {
	return (
		<>
			<Hero />
			<Content />
		</>
	);
}
