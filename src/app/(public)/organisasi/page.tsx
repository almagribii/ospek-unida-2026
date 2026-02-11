import type { Metadata } from "next";
import { UKMSection } from "./components/UKMSection";

export const metadata: Metadata = {
	title: "Organisasi",
	description:
		"Informasi mengenai organisasi dan UKM yang tersedia di Universitas Darussalam Gontor. OSPEK AKHYAR 2026.",
};

export default function UKMPage() {
	return <UKMSection />;
}
