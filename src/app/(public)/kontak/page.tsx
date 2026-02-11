import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import FormSection from "./components/FormSection";
import Hero from "./components/Hero";

export const metadata: Metadata = {
	title: "Kontak Kami",
	description:
		"Informasi mengenai kontak yang dapat dihubungi untuk OSPEK ataupun Admisi (PMB) Universitas Darussalam Gontor. OSPEK AKHYAR 2026.",
};

export default function Kontak() {
	return (
		<>
			<Hero />
			<FormSection />
			<BackToTop length={2600} />
		</>
	);
}
