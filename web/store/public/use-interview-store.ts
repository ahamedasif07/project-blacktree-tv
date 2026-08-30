import { create } from "zustand";

interface InterviewState {
  currentPage: number;
  activeTab: string;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setActiveTab: (tab: string) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  currentPage: 1,
  activeTab: "All",
  itemsPerPage: 8,
  setCurrentPage: (page) => set({ currentPage: page }),
  setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }), // Reset to page 1 on filter change
}));
