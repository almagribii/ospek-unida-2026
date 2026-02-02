export interface PaymentItem {
	category: string;
	description: string;
	nominal: string;
	note?: string;
}

export interface ProdiPayment {
	nama: string;
	spp: string;
	praktikum: string;
	mahasiswa: PaymentItem[];
	mahasiswi: PaymentItem[];
}

const mahasiswaItems: PaymentItem[] = [
	{
		category: "Sumbangan Gedung",
		description: "Kontribusi pengembangan fasilitas gedung",
		nominal: "Rp 850.000",
	},
	{
		category: "Sumbangan Peringatan 100 Tahun Gontor",
		description: "Komitmen perayaan 100 tahun pondok pesantren",
		nominal: "Rp 300.000",
	},
	{
		category: "Majalah Gontor",
		description: "Langganan majalah kampus tahunan",
		nominal: "Rp 280.000",
	},
	{
		category: "Pengembangan Institusi",
		description: "Dana pengembangan sarana dan prasarana institusi",
		nominal: "Rp 1.150.000",
	},
	{
		category: "Kepanitian",
		description: "Kontribusi untuk kegiatan kepanitian mahasiswa",
		nominal: "Rp 375.000",
	},
	{
		category: "Asrama dan Kegiatan Mahasiswa",
		description: "Biaya asrama dan kegiatan mahasiswa per bulan",
		nominal: "Rp 500.000",
		note: "Setiap bulan",
	},
	{
		category: "Uang Makan",
		description: "Biaya makan di asrama per bulan",
		nominal: "Rp 370.000",
		note: "Setiap bulan",
	},
	{
		category: "Uang Kesehatan",
		description: "Dana kesehatan dan asuransi kesehatan dasar",
		nominal: "Rp 150.000",
	},
	{
		category: "Sewa Lemari",
		description: "Biaya sewa lemari asrama",
		nominal: "Rp 150.000",
	},
	{
		category: "Pembelian Kasur",
		description: "Kontribusi pembelian dan perawatan kasur asrama",
		nominal: "Rp 250.000",
	},
	{
		category: "Jas dan Kaos Almamater",
		description: "Seragam dan pakaian almamater",
		nominal: "Rp 250.000",
	},
	{
		category: "Buku IELTS & Kelas Bahasa",
		description: "Materi dan kelas persiapan IELTS serta bahasa",
		nominal: "Rp 300.000",
	},
	{
		category: "Kepanitian OSPEK",
		description: "Biaya orientasi dan kepanitian OSPEK",
		nominal: "Rp 500.000",
	},
];

const mahasiswiItems: PaymentItem[] = [
	{
		category: "Sumbangan Gedung",
		description: "Kontribusi pengembangan fasilitas gedung",
		nominal: "Rp 850.000",
	},
	{
		category: "Sumbangan Peringatan 100 Tahun Gontor",
		description: "Komitmen perayaan 100 tahun pondok pesantren",
		nominal: "Rp 300.000",
	},
	{
		category: "Majalah Gontor",
		description: "Langganan majalah kampus tahunan",
		nominal: "Rp 280.000",
	},
	{
		category: "Pengembangan Institusi",
		description: "Dana pengembangan sarana dan prasarana institusi",
		nominal: "Rp 1.150.000",
	},
	{
		category: "Kepanitian",
		description: "Kontribusi untuk kegiatan kepanitian mahasiswi",
		nominal: "Rp 375.000",
	},
	{
		category: "Asrama dan Kegiatan Mahasiswi",
		description: "Biaya asrama dan kegiatan mahasiswi per bulan",
		nominal: "Rp 500.000",
		note: "Setiap bulan",
	},
	{
		category: "Uang Makan",
		description: "Biaya makan di asrama per bulan",
		nominal: "Rp 370.000",
		note: "Setiap bulan",
	},
	{
		category: "Uang Kesehatan",
		description: "Dana kesehatan dan asuransi kesehatan dasar",
		nominal: "Rp 150.000",
	},
	{
		category: "Sewa Lemari",
		description: "Biaya sewa lemari asrama",
		nominal: "Rp 150.000",
	},
	{
		category: "Pembelian Kasur",
		description: "Kontribusi pembelian dan perawatan kasur asrama",
		nominal: "Rp 250.000",
	},
	{
		category: "Jas Almamater",
		description: "Seragam jas almamater",
		nominal: "Rp 160.000",
	},
	{
		category: "Buku IELTS & Kelas Bahasa",
		description: "Materi dan kelas persiapan IELTS serta bahasa",
		nominal: "Rp 300.000",
	},
	{
		category: "Kepanitian OSPEK",
		description: "Biaya orientasi dan kepanitian OSPEK",
		nominal: "Rp 500.000",
	},
	{
		category: "Seragam UNIDA Tosca",
		description: "Seragam UNIDA warna tosca",
		nominal: "Rp 265.000",
	},
	{
		category: "Seragam UNIDA Krem",
		description: "Seragam UNIDA warna krem",
		nominal: "Rp 255.000",
	},
	{
		category: "Kerudung Krem",
		description: "Kerudung untuk kegiatan kampus",
		nominal: "Rp 80.000",
	},
	{
		category: "Seragam Olahraga",
		description: "Pakaian olahraga almamater",
		nominal: "Rp 189.000",
	},
	{
		category: "Tas Sandal",
		description: "Tas dan sandal almamater",
		nominal: "Rp 25.000",
	},
];

export const paymentByProdi: Record<string, ProdiPayment> = {
	studi_perbandingan_agama: {
		nama: "Studi Perbandingan Agama",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	akidah_filsafat_islam: {
		nama: "Akidah dan Filsafat Islam",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	al_quran_tafsir: {
		nama: "Al-Quran dan Tafsir",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	pendidikan_islam: {
		nama: "Pendidikan Islam",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	pba_bahasa_arab: {
		nama: "Pendidikan Bahasa Arab (PBA)",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	pbi_bahasa_inggris: {
		nama: "Pendidikan Bahasa Inggris (PBI)",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	perbandingan_madzhab: {
		nama: "Perbandingan Madzhab",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	hukum_ekonomi_islam: {
		nama: "Hukum Ekonomi Islam",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	ekonomi_islam: {
		nama: "Ekonomi Islam",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	manajemen: {
		nama: "Manajemen",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	hubungan_internasional: {
		nama: "Hubungan Internasional",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	ilmu_komunikasi: {
		nama: "Ilmu Komunikasi",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	teknik_informatika: {
		nama: "Teknik Informatika",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	agroteknologi: {
		nama: "Agroteknologi",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	teknologi_agroindustri: {
		nama: "Teknologi Agroindustri",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	farmasi: {
		nama: "Farmasi",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	gizi: {
		nama: "Gizi (Nutrition Science)",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	k3: {
		nama: "Kesehatan & Keselamatan Kerja (K3)",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	profesi_apoteker: {
		nama: "Profesi Apoteker",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	program_medis: {
		nama: "Program Medis",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
	profesi_medis: {
		nama: "Profesi Medis",
		spp: "Rp 2.500.000",
		praktikum: "Rp 600.000",
		mahasiswa: [
			...mahasiswaItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswaItems.slice(3),
		],
		mahasiswi: [
			...mahasiswiItems.slice(0, 3),
			{
				category: "Biaya SPP",
				description: "Sumbangan Pembinaan Pendidikan",
				nominal: "Rp 2.500.000",
			},
			{
				category: "Praktikum",
				description: "Biaya praktikum dan laboratorium",
				nominal: "Rp 600.000",
			},
			...mahasiswiItems.slice(3),
		],
	},
};
