import Navbar from "@/components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<Navbar/>
			<body>{children}</body>
		</html>
	);
};

export default layout;