import { create } from "zustand";

interface NavbarStore {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  setSearch: (open: boolean) => void;
  setMobileMenu: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useNavbar = create<NavbarStore>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  setSearch: (open) => set({ isSearchOpen: open }),
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
