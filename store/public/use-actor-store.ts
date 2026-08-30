import { create } from "zustand";

interface ActorStore {
  searchQuery: string;
  selectedLetter: string;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  setSelectedLetter: (letter: string) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useActorStore = create<ActorStore>((set) => ({
  searchQuery: "",
  selectedLetter: "All",
  sortBy: "popularity",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedLetter: (letter) => set({ selectedLetter: letter }),
  setSortBy: (sort) => set({ sortBy: sort }),

  resetFilters: () =>
    set({
      searchQuery: "",
      selectedLetter: "All",
      sortBy: "popularity",
    }),
}));
