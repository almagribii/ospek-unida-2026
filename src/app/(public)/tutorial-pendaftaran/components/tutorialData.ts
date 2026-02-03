import {
	Globe,
	LogIn,
	MailCheck,
	ShoppingCart,
	UserPlus,
	Wallet,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import registerForm from "../../../../../public/panduan/4.webp";
import billingInfo from "../../../../../public/panduan/11.webp";
import emailActivation from "../../../../../public/panduan/56.webp";
import loginPage from "../../../../../public/panduan/78.webp";
import admissionHome from "../../../../../public/panduan/123.webp";
import purchaseForm from "../../../../../public/panduan/910.webp";

export interface StepItem {
	step: number;
	title: string;
	icon: React.ComponentType<{ size?: number }>;
}

export interface PanduanCardData {
	steps: StepItem[];
	imageSrc: StaticImageData;
}

export const step1_3Data: PanduanCardData = {
	steps: [
		{
			step: 1,
			title: "Silahkan Mengunjungi Halaman Web unida.gontor.ac.id/admission/",
			icon: Globe,
		},
		{
			step: 2,
			title: "Segala Informasi Terkait Pendaftaran Unida Gontor Ada disini",
			icon: Globe,
		},
		{
			step: 3,
			title: "Untuk Mendaftar Silahkan Klik ADMISSION",
			icon: Globe,
		},
	],
	imageSrc: admissionHome,
};

export const step4_5Data: PanduanCardData = {
	steps: [
		{
			step: 4,
			title: "Buat Akun Pendaftaran",
			icon: UserPlus,
		},
		{
			step: 5,
			title: "Verifikasi & Konfirmasi",
			icon: MailCheck,
		},
	],
	imageSrc: registerForm,
};

export const step6Data: PanduanCardData = {
	steps: [
		{
			step: 6,
			title: "Aktivasi Akun via Email",
			icon: MailCheck,
		},
	],
	imageSrc: emailActivation,
};

export const step7Data: PanduanCardData = {
	steps: [
		{
			step: 7,
			title: "Masuk ke Sistem",
			icon: LogIn,
		},
	],
	imageSrc: loginPage,
};

export const step8Data: PanduanCardData = {
	steps: [
		{
			step: 8,
			title: "Pilih Program & Beli Form",
			icon: ShoppingCart,
		},
	],
	imageSrc: purchaseForm,
};

export const step9Data: PanduanCardData = {
	steps: [
		{
			step: 9,
			title: "Lakukan Pembayaran VA",
			icon: Wallet,
		},
	],
	imageSrc: billingInfo,
};

export const tutorialStepsData: PanduanCardData[] = [
	step1_3Data,
	step4_5Data,
	step6Data,
	step7Data,
	step8Data,
	step9Data,
];

export const heroData = {
	title: "Panduan Menjadi Mahasiswa UNIDA Gontor",
};

export const supportData = {
	title: "Butuh Bantuan Lebih Lanjut?",
	description:
		"Jika mengalami kendala teknis saat pendaftaran atau pembayaran, silakan hubungi tim administrasi kami.",
	buttonText: "Hubungi Kami",
	buttonLink: "https://unida.gontor.ac.id/admission/",
};
