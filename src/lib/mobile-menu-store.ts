import { create } from "zustand";

interface MobileMenuState {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
}));