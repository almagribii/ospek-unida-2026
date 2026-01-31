import BackToTop from "@/components/BackToTop";
import Content from "./components/Content";
import Description from "./components/Description";
import Hero from "./components/Hero";

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
