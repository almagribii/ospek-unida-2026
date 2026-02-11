import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import Content from "./components/Content";
import Hero from "./components/Hero";

export const metadata: Metadata = {
	title: "Pembayaran",
	description:
		"Informasi pembayaran untuk Mahasiswa Baru 2026 Universitas Darussalam Gontor, OSPEK AKHYAR 2026.",
};

export default function Pembayaran() {
	return (
		<>
			<Hero />
			<Content />
			<BackToTop length={2000} />
		</>
	);
}
