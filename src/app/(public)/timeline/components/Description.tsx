import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDate,
	TimelineDescription,
	TimelineHeader,
	TimelineIcon,
	TimelineItem,
	TimelineTitle,
} from "@/components/Timeline";

export default function Description() {
	return (
		<div className="bg-[linear-gradient(rgba(243,243,243,1),rgba(0,0,0,0.2)),url('/background/blue_texture.webp')] bg-cover bg-center p-8 md:p-12 flex flex-col gap-12">
			<div className="bg-muted p-6 md:p-10 rounded-xl overflow-x-auto">
				<Timeline>
					<TimelineItem status="completed">
						<TimelineHeader>
							<TimelineIcon></TimelineIcon>
							<TimelineConnector />
						</TimelineHeader>
						<TimelineContent>
							<TimelineDate>Mar 15, 2025</TimelineDate>
							<TimelineTitle className="text-white">
								Project Kickoff
							</TimelineTitle>
							<TimelineDescription className="text-gray-400">
								Kicked off the project with team alignment.
							</TimelineDescription>
						</TimelineContent>
					</TimelineItem>
				</Timeline>
			</div>
		</div>
	);
}
