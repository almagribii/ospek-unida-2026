"use client";

import { useState } from "react";
import styled from "styled-components";

const MenuButton = ({
	Color,
	onClick,
	defaultOpen = false,
}: {
	Color: string;
	onClick?: () => void;
	defaultOpen?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<StyledWrapper data-open={isOpen}>
			<div className="scale-75">
				<button
					type="button"
					className="toggle"
					aria-label="Toggle menu"
					aria-pressed={isOpen}
					onClick={() => {
						setIsOpen((prev) => !prev);
						onClick?.();
					}}
				>
					<div className={`bars ${Color}`} id="bar1" />
					<div className={`bars ${Color}`} id="bar2" />
					<div className={`bars ${Color}`} id="bar3" />
				</button>
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: .3s;
  }

  .bars {
    width: 100%;
    height: 4px;
    border-radius: 5px;
    transition-duration: .3s;
  }

  &[data-open='true'] .toggle .bars {
    margin-left: 13px;
  }

  &[data-open='true'] .toggle #bar2 {
    transform: rotate(135deg);
    margin-left: 0;
    transform-origin: center;
    transition-duration: .3s;
  }

  &[data-open='true'] .toggle #bar1 {
    transform: rotate(45deg);
    transition-duration: .3s;
    transform-origin: left center;
  }

  &[data-open='true'] .toggle #bar3 {
    transform: rotate(-45deg);
    transition-duration: .3s;
    transform-origin: left center;
  }`;

export default MenuButton;
