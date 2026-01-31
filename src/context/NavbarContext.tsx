"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type NavbarState = {
	isHidden: boolean;
	isAtTop: boolean;
	setNavbarState: (
		state: Partial<{ isHidden: boolean; isAtTop: boolean }>,
	) => void;
};

const NavbarContext = createContext<NavbarState | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState({ isHidden: false, isAtTop: true });

	const setNavbarState = useCallback(
		(newState: Partial<{ isHidden: boolean; isAtTop: boolean }>) => {
			setState((prev) => {
				if (
					(newState.isHidden === undefined ||
						newState.isHidden === prev.isHidden) &&
					(newState.isAtTop === undefined || newState.isAtTop === prev.isAtTop)
				) {
					return prev;
				}
				return { ...prev, ...newState };
			});
		},
		[],
	);

	const value = useMemo(
		() => ({
			isHidden: state.isHidden,
			isAtTop: state.isAtTop,
			setNavbarState,
		}),
		[state.isHidden, state.isAtTop, setNavbarState],
	);

	return (
		<NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
	);
}

export function useNavbar() {
	const context = useContext(NavbarContext);
	if (!context) {
		throw new Error("useNavbar must be used within a NavbarProvider");
	}
	return context;
}
