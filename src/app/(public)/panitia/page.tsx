import type { Metadata } from "next";
import Content from "./components/Content";

export const metadata: Metadata = {
	title: "Panitia",
	description:
		"Struktur Panitia OSPEK Universitas Darussalam Gontor periode 2026/1447, berisi dengan beragam bagian dan koordinasi yang efisien dan efektif.",
};

export default function Panitia() {
	return (
		<>
			<Content />
		</>
	);
}
