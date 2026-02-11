import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import Content from "./components/Content";
import Hero from "./components/Hero";

export const metadata: Metadata = {
	title: "Jurusan & Fakultas",
	description:
		"Daftar jurusan dan fakultas yang ada di Universitas Darussalam Gontor. OSPEK AKHYAR 2026.",
};

export default function Jurusan() {
	return (
		<>
			<Hero />
			<Content />
			<BackToTop length={2000} />
		</>
	);
}
