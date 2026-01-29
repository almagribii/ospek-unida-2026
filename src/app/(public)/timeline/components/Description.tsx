import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineItem,
} from "@/components/TimelineV2";
import { timelineData as data } from "./timelineData";

export default function Description() {
	return (
		<div className="bg-[linear-gradient(rgba(243,243,243,1),rgba(0,0,0,0.2)),url('/background/white_texture.webp')] bg-cover bg-center p-8 md:p-12 flex flex-col gap-12">
			<div className="bg-foreground relative p-6 md:p-10 rounded-xl overflow-x-auto">
				<div className="absolute hidden lg:flex flex-col items-center justify-center left-5 h-full max-h-[288px] w-full max-w-[80px] bg-primary text-2xl font-mirage font-semibold">
					<span>T</span>
					<span>I</span>
					<span>M</span>
					<span>E</span>
					<span>L</span>
					<span>I</span>
					<span>N</span>
					<span>E</span>
				</div>
				<Timeline>
					{data.map((item, index) => {
						return (
							<TimelineItem key={`${item.title}-${index}`}>
								<TimelineDot>{index + 1}</TimelineDot>
								<TimelineContent className="flex flex-col">
									<span className="text-secondary-muted">{item.date}</span>
									<span className="text-background">{item.title}</span>
								</TimelineContent>
							</TimelineItem>
						);
					})}
				</Timeline>
			</div>
		</div>
	);
}
