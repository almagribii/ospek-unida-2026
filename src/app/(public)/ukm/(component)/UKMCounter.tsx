import type { CrewMember } from "./ukm-data";

interface UKMCounterProps {
	activeIndex: number;
	members: CrewMember[];
}

export function UKMCounter({ activeIndex, members }: UKMCounterProps) {
	return (
		<div className="team-counter relative z-20">
			

			<div className="count">
				<div className="count-container text-center">
					<h1 key={activeIndex}>{members[activeIndex]?.title}</h1>
				</div>
			</div>
		</div>
	);
}
