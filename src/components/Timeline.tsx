"use client";

import * as React from "react";

// --- Types ---

type Orientation = "horizontal" | "vertical";
type Status = "completed" | "current" | "upcoming";

interface TimelineContextValue {
	orientation: Orientation;
}

const TimelineContext = React.createContext<TimelineContextValue | undefined>(
	undefined,
);

// --- 1. Root Component ---

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: Orientation;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
	({ className, orientation = "horizontal", children, ...props }, ref) => {
		return (
			<TimelineContext.Provider value={{ orientation }}>
				<div
					ref={ref}
					className={`flex w-full flex-col ${orientation === "horizontal" ? "md:flex-row" : "md:flex-col"} ${className}`}
					{...props}
				>
					{children}
				</div>
			</TimelineContext.Provider>
		);
	},
);
Timeline.displayName = "Timeline";

// --- 2. Item Component ---

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
	status?: Status;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
	({ className, status = "upcoming", children, ...props }, ref) => {
		const { orientation } = useTimeline();

		return (
			<div
				ref={ref}
				className={`group relative flex flex-1 gap-4 flex-row last:pb-0 ${orientation === "horizontal" ? "md:flex-col md:pb-0" : "md:flex-row"} ${className}`}
				data-status={status}
				{...props}
			>
				{children}
			</div>
		);
	},
);
TimelineItem.displayName = "TimelineItem";

// --- 3. Header (Icon + Connector) ---

const TimelineHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const { orientation } = useTimeline();

	return (
		<div
			ref={ref}
			className={`flex items-center flex-col ${orientation === "horizontal" ? "md:flex-row md:w-full" : "md:flex-col"} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
});
TimelineHeader.displayName = "TimelineHeader";

// --- 4. The Icon Bubble ---

const TimelineIcon = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-white shadow-sm transition-colors duration-300 group-data-[status=completed]:bg-primary group-data-[status=completed]:border-primary group-data-[status=current]:bg-primary group-data-[status=current]:border-primary group-data-[status=upcoming]:bg-transparent group-data-[status=upcoming]:border-muted-foreground group-data-[status=upcoming]:text-muted-foreground ${className}`}
			{...props}
		>
			{children}
		</div>
	);
});
TimelineIcon.displayName = "TimelineIcon";

// --- 5. The Connector Line ---

const TimelineConnector = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useTimeline();

	return (
		<div
			ref={ref}
			className={`flex-1 transition-colors duration-300 w-0.5 min-h-8 my-2 ${orientation === "horizontal" ? "md:h-0.5 md:w-full md:min-h-0 md:my-0 md:mx-2" : "md:w-0.5 md:min-h-8 md:my-2 md:mx-0"} group-last:hidden bg-(--muted-foreground)/30 group-data-[status=completed]:bg-primary group-data-[status=current]:bg-primary`}
			{...props}
		/>
	);
});
TimelineConnector.displayName = "TimelineConnector";

// --- 6. Content (Title, Date, Description) ---

const TimelineContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const { orientation } = useTimeline();

	return (
		<div
			ref={ref}
			className={`flex flex-col gap-1 pt-1 ${orientation === "horizontal" ? "md:pt-4" : "md:pt-1"} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
});
TimelineContent.displayName = "TimelineContent";

const TimelineTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
	return (
		<h3
			ref={ref}
			className={`font-semibold text-foreground ${className}`}
			{...props}
		>
			{children}
		</h3>
	);
});
TimelineTitle.displayName = "TimelineTitle";

const TimelineDate = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={`text-xs font-medium text-primary-muted ${className}`}
			{...props}
		>
			{children}
		</span>
	);
});
TimelineDate.displayName = "TimelineDate";

const TimelineDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={`text-sm text-(--foreground)/80 leading-relaxed ${className}`}
			{...props}
		>
			{children}
		</p>
	);
});
TimelineDescription.displayName = "TimelineDescription";

// --- Helper Hook ---
function useTimeline() {
	const context = React.useContext(TimelineContext);
	if (!context) {
		throw new Error(
			"Timeline sub-components must be used within a Timeline provider",
		);
	}
	return context;
}

export {
	Timeline,
	TimelineItem,
	TimelineHeader,
	TimelineIcon,
	TimelineConnector,
	TimelineContent,
	TimelineTitle,
	TimelineDate,
	TimelineDescription,
};
