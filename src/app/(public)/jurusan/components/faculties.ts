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
	// {
	// 	id: "card-1",
	// 	title: "Reverie",
	// 	info: "A surreal dive into neon hues and playful decay",
	// 	description:
	// 		"A psychedelic skull study exploring the tension between playfulness and decay. Bold candy tones, liquid forms, and crisp vectors bring a surreal, pop-art mood meant for covers and prints.",
	// 	image: "/background/blue_texture.webp",
	// 	accentColor: "#b1c0ef",
	// },
];
