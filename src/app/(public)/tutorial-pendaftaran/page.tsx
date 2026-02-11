import type { Metadata } from "next";
import { Content } from "./components/Content";

export const metadata: Metadata = {
	title: "Tutorial Pendaftaran",
	description:
		"Panduan pendaftaran untuk Mahasiswa Baru 2026 Universitas Darussalam Gontor. OSPEK AKHYAR 2026.",
};

export default function HalamanTutorialPMB() {
	return (
		<div>
			<Content />
		</div>
	);
}
