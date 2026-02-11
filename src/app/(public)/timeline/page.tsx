import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import Content from "./components/Content";
import Description from "./components/Description";
import Hero from "./components/Hero";

export const metadata: Metadata = {
	title: "Timeline",
	description:
		"Informasi mengenail rundown dan timeline untuk Mahasiswa Baru 2026 Universitas Darussalam Gontor, OSPEK AKHYAR 2026.",
};

const timelinePage = () => {
	return (
		<>
			<Hero />
			<Content />
			<Description />
			<BackToTop length={4000} />
		</>
	);
};

export default timelinePage;
