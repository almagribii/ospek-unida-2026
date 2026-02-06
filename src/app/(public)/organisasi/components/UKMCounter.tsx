import Shuffle from "@/components/Shuffle";
import type { dataUkm } from "./ukm-data";

interface UKMCounterProps {
	activeIndex: number;
	members: dataUkm[];
}

export function UKMCounter({ activeIndex, members }: UKMCounterProps) {
	return (
		<div
			className="team-counter"
			style={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				display: "flex",
				justifyContent: "center",
				padding: "40px 0",
			}}
		>
			<div className="count text-center">
				<div className="count-container text-center"></div>

				<Shuffle
					key={activeIndex}
					text={members[activeIndex]?.title || "UKM"}
					shuffleDirection="right"
					duration={0.35}
					animationMode="evenodd"
					shuffleTimes={1}
					ease="power3.out"
					stagger={0.03}
					threshold={0}
					triggerOnce={false}
					triggerOnHover={false}
					respectReducedMotion={false}
					loop={false}
					loopDelay={0}
					className="font-mirage text-5xl md:text-7xl lg:text-8xl font-bold"
				/>
			</div>
		</div>
	);
}
