import { createContext, useContext } from 'react';

export interface HeaderContextValue {
  sticky: boolean;
  transparent: boolean;
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextValue>({
  sticky: false,
  transparent: false,
  scrolled: false,
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function useHeaderContext() {
  return useContext(HeaderContext);
}
