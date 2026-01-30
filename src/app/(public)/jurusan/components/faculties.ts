interface CardData {
	name: string;
	description: string;
	image: string;
	url: string;
	jurusan: string[];
}

export const cardsData: CardData[] = [
	{
		name: "Tarbiyah",
		description:
			"Mengintegrasikan ilmu pendidikan dengan nilai Islam, mencetak pendidik yang berkualitas, berakhlak mulia, dan mampu membimbing generasi masa depan",
		image: "/jurusan/tarbiyah.jpg",
		url: "https://unida.gontor.ac.id/tarbiyah/",
		jurusan: [
			"Pendidikan Agama Islam",
			"Pendidikan Bahasa Arab",
			"Tadris Bahasa Inggris",
		],
	},
	{
		name: "Syariah",
		description:
			"Memadukan ilmu hukum syariah dengan nilai Islam, mencetak ahli hukum yang adil, berintegritas, dan mampu menegakkan keadilan dalam masyarakat",
		image: "/jurusan/syariah.jpg",
		url: "https://unida.gontor.ac.id/sharia/",
		jurusan: ["Perbandingan Madzhab", "Hukum Ekonomi Syariah"],
	},
	{
		name: "Humaniora",
		description:
			"Memadukan ilmu humaniora dengan nilai Islam, mencetak pemikir kritis dan berakhlak mulia yang mampu memahami dan membangun peradaban",
		image: "/jurusan/humaniora.jpg",
		url: "https://unida.gontor.ac.id/humanities/",
		jurusan: ["Hubungan Internasional", "Ilmu Komunikasi"],
	},
	{
		name: "Ekonomi & Manajemen",
		description:
			"Mencetak pemimpin bisnis yang cerdas, visioner dan berintegritas dengan memadukan ilmu ekonomi & manajemen dengan nilai Islam",
		image: "/jurusan/fem.jpg",
		url: "https://unida.gontor.ac.id/economics/",
		jurusan: ["Ekonomi Islam", "Manajemen"],
	},
	{
		name: "Ushuluddin",
		description:
			"Mencetak pemikir teologis yang mendalam, berakhlak mulia, serta berkemampuan untuk memperkuat pondasi keimanan dan menjaga keharmonisan umat nilai-nilai Islam",
		image: "/jurusan/ushuluddin.jpg",
		url: "https://unida.gontor.ac.id/ushuluddin/",
		jurusan: [
			"Studi Agama-Agama",
			"Aqidah & Filsafat Islam",
			"Ilmu Al-Qur'an dan Tafsir",
		],
	},
	{
		name: "Sains & Teknologi",
		description:
			"Mengintegrasikan inovasi ilmiah dengan nilai Islam, mencetak ahli teknologi yang cerdas, dan siap memberi dampak positif bagi masyarakat",
		image: "/jurusan/saintek.jpg",
		url: "https://unida.gontor.ac.id/sciencetech/",
		jurusan: [
			"Teknik Informatika",
			"Teknologi Industri Pertanian",
			"Agroteknologi",
		],
	},
	{
		name: "Kesehatan",
		description:
			"Membentuk tenaga kesehatan profesional dan berakhlak mulia berasaskan nilai Islam, serta memberikan pelayanan terbaik dengan menjunjung tinggi etika dan moral",
		image: "/jurusan/kesehatan.jpg",
		url: "https://unida.gontor.ac.id/health/",
		jurusan: ["Farmasi", "Ilmu Gizi", "Kesehatan & Keselamatan Kerja"],
	},
	{
		name: "Kedokteran",
		description:
			"Mencetak dokter yang tidak hanya kompeten dalam bidang medis, tetapi juga berakhlak mulia, peduli terhadap pasien, dan mampu mengedepankan prinsip moral dalam setiap tindakan",
		image: "/jurusan/kedokteran.jpeg",
		url: "https://unida.gontor.ac.id/medicine/",
		jurusan: ["Kedokteran Program Sarjana", "Pendidikan Profesi Dokter"],
	},
];
