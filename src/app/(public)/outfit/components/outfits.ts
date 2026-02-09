interface Insides {
	name: string;
	img: string;
	bg: string;
}

interface Outfits {
	cowo: Insides[];
	cewe: Insides[];
}

export const outfits: Outfits = {
	cowo: [
		{
			name: "Outfit Ibadah",
			img: "/outfit/cowo/sholat.png",
			bg: "/outfit/cowo/sholat.webp",
		},
		{
			name: "Outfit Olahraga",
			img: "/outfit/cowo/olahraga.png",
			bg: "/outfit/cowo/olahraga.webp",
		},
		{
			name: "Outfit Kuliah",
			img: "/outfit/cowo/kuliah.png",
			bg: "/outfit/cowo/kuliah.webp",
		},
		{
			name: "Outfit Berpergian",
			img: "/outfit/cowo/berpergian.png",
			bg: "/outfit/cowo/berpergian.webp",
		},
		{
			name: "Outfit Kasual",
			img: "/outfit/cowo/kasual.png",
			bg: "/outfit/cowo/kasual.webp",
		},
		{
			name: "Outfit Batik",
			img: "/outfit/cowo/batik.png",
			bg: "/outfit/cowo/batik.webp",
		},
		{
			name: "Outfit Almameter",
			img: "/outfit/cowo/almameter.png",
			bg: "/outfit/cowo/almameter.webp",
		},
		{
			name: "Outfit Korsa",
			img: "/outfit/cowo/korsa.png",
			bg: "/outfit/cowo/korsa.webp",
		},
	],
	cewe: [
		{
			name: "Outfit Almameter",
			img: "/outfit/cewe/almameter.png",
			bg: "/outfit/cewe/almameter.jpg",
		},
		{
			name: "Outfit Korsa",
			img: "/outfit/cewe/korsa.png",
			bg: "/outfit/cewe/korsa.jpg",
		},
		{
			name: "Outfit Kuliah",
			img: "/outfit/cewe/kuliah.png",
			bg: "/outfit/cewe/kuliah.jpg",
		},
		{
			name: "Outfit Olahraga",
			img: "/outfit/cewe/olahraga.png",
			bg: "/outfit/cewe/olahraga.jpg",
		},
		{
			name: "Seragam Krem",
			img: "/outfit/cewe/seragam-krem.png",
			bg: "/outfit/cewe/seragam-krem.jpg",
		},
		{
			name: "Seragam Tosca",
			img: "/outfit/cewe/seragam-tosca.png",
			bg: "/outfit/cewe/seragam-tosca.jpg",
		},
	],
};
