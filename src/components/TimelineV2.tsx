"use client";

import * as React from "react";

// ----------------------------------------------------------------------------
// Types & Interfaces
// ----------------------------------------------------------------------------

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	/** Maximum items per row before wrapping. Default is 4. */
	itemsPerRow?: number;
}

// ----------------------------------------------------------------------------
// Compound Components
// ----------------------------------------------------------------------------

const TimelineItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			// Mobile: flex-row (side-by-side), items-start.
			// Desktop (md): flex-col (stacked), items-center.
			className={`relative flex group flex-1 mb-8 md:mb-4 
            flex-row items-start gap-6
            md:flex-col md:items-center md:gap-0
            ${className || ""}`}
			{...props}
		>
			{/* Vertical Line for Mobile (Hidden on Desktop) */}
			{/* Placed absolute behind the dot. Dot is w-12 (3rem), so center is left-6 (1.5rem). */}
			<div className="absolute left-6 top-12 bottom-[-2rem] w-0.5 bg-primary/50 -z-0 md:hidden last:bottom-0 [.last-item_&]:hidden" />

			{children}
		</div>
	);
});
TimelineItem.displayName = "TimelineItem";

const TimelineDot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-foreground border-4 border-primary ${className || ""}`}
		{...props}
	/>
));
TimelineDot.displayName = "TimelineDot";

const TimelineContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		// Mobile: Text left, no margin top.
		// Desktop: Text center, margin top, fixed max-width.
		className={`text-left md:text-center space-y-1 md:mt-4 md:max-w-[200px] ${className || ""}`}
		{...props}
	/>
));
TimelineContent.displayName = "TimelineContent";

// ----------------------------------------------------------------------------
// Main Timeline Container (Logic Layer)
// ----------------------------------------------------------------------------

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
	({ children, className, itemsPerRow = 4, ...props }, ref) => {
		const arrayChildren = React.Children.toArray(children);
		const rows = [];
		for (let i = 0; i < arrayChildren.length; i += itemsPerRow) {
			rows.push(arrayChildren.slice(i, i + itemsPerRow));
		}

		return (
			<div
				ref={ref}
				className={`flex flex-col w-full ${className || ""}`}
				{...props}
			>
				{rows.map((rowItems, rowIndex) => {
					const isReverse = rowIndex % 2 !== 0;
					const isLastRow = rowIndex === rows.length - 1;

					// Desktop Only Directions
					const rowDirectionMd = isReverse
						? "md:flex-row-reverse"
						: "md:flex-row";

					// Calculate how far from the edge the dot centers are.
					const offset = `calc(100% / ${itemsPerRow} / 2)`;

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: component
						<div key={rowIndex} className="relative">
							{/* The Row Container */}
							<div
								// Mobile: flex-col (Vertical stack)
								// Desktop: flex-row/reverse (Snake)
								className={`flex flex-col w-full relative ${rowDirectionMd} justify-between`}
							>
								{/* Horizontal Connector Line (Desktop Only) */}
								<div
									className="hidden md:block absolute top-6 h-0.5 bg-primary-muted/50 -z-0"
									style={{ left: offset, right: offset }}
								/>

								{rowItems.map((child, index) => {
									// Determine if this is the absolute last item in the entire timeline
									const isLastItem = isLastRow && index === rowItems.length - 1;

									return (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: Component
											key={index}
											className="relative flex-1 flex md:justify-center z-10"
										>
											{/* We clone the child to inject a class if it's the last item, 
                                                allowing us to hide the vertical connector line via CSS */}
											{React.isValidElement(child)
												? React.cloneElement(child as React.ReactElement<any>, {
														className: `${(child.props as any).className || ""} ${isLastItem ? "last-item" : ""}`,
													})
												: child}
										</div>
									);
								})}
							</div>

							{/* Vertical "Turn" Connector (The Snake Bend) - Desktop Only */}
							{!isLastRow && (
								<div className="hidden md:block">
									<CurveConnector
										isReverse={isReverse}
										itemsPerRow={itemsPerRow}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	},
);
Timeline.displayName = "Timeline";

// ----------------------------------------------------------------------------
// Internal Helper for the "Snake" Bend
// ----------------------------------------------------------------------------

function CurveConnector({
	isReverse,
	itemsPerRow,
}: {
	isReverse: boolean;
	itemsPerRow: number;
}) {
	const width = `calc(100% / ${itemsPerRow} / 2)`;

	const classes = !isReverse
		? "right-0 rounded-e-[3rem] border-r-2 border-y-2 border-l-0" // "⊃" shape
		: "left-0 rounded-s-[3rem] border-l-2 border-y-2 border-r-0"; // "⊂" shape

	return (
		<div
			className={`absolute top-6 h-[calc(100%+0.2rem)] border-primary-muted/50 -z-0 ${classes}`}
			style={{
				width: width,
			}}
		/>
	);
}

// ----------------------------------------------------------------------------
// Export
// ----------------------------------------------------------------------------

export { Timeline, TimelineItem, TimelineDot, TimelineContent };
