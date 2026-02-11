import type { Metadata } from "next";
import FaqSection from "./component/FaqSection";

export const metadata: Metadata = {
	title: "FAQ | Frequently Asked Questions",
	description:
		"Berisi pertanyaan-pertanyaan yang sering ditanyakan tentang OSPEK dan juga Admis (PMB) Universitas Darussalam Gontor. OSPEK AKHYAR 2026.",
};

export default function faq() {
	return <FaqSection />;
}
