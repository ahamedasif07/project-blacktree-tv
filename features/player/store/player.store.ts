/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { PlayerState } from "../types/player.types";

interface PlayerStore extends PlayerState {
  activeVideo: any;
  setActiveVideo: (video: any) => void;
  setPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (isMuted: boolean) => void;
  toggleFullScreen: () => void;
  toggleChat: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: true,
  isFullScreen: false,
  playbackRate: 1,
  quality: "auto",
  isChatOpen: true,
  activeVideo: null,
  setActiveVideo: (activeVideo) => set({ activeVideo }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setMuted: (isMuted) => set({ isMuted }),
  toggleFullScreen: () =>
    set((state) => ({ isFullScreen: !state.isFullScreen })),
}));
