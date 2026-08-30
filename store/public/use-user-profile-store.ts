import { create } from "zustand";

export interface Device {
  id: number;
  name: string;
  location: string;
  icon: string;
  current: boolean;
}

export interface PlaylistItem {
  id: string;
  title: string;
  image: string;
  year: number;
  rating: string;
}

export interface WatchHistoryItem {
  id: string;
  title: string;
  image: string;
  watchedAt: string;
  progress: number; // percentage completed
  duration: string; // e.g. "1h 24m / 2h 10m"
  year?: number;
  rating?: string;
}

export interface UserProfileData {
  name: string;
  username: string; 
  email: string;
  phone: string;
  avatar: string;
  membershipTier: string;
  expirationDate: string;
  autoplay: boolean;
  matureContent: boolean;
  devices: Device[];
  watchlist: PlaylistItem[];
  watchHistory: WatchHistoryItem[];
}

interface UserProfileState {
  profile: UserProfileData;
  editName: string;
  editUsername: string;
  editEmail: string;
  editPhone: string;
  timezone: string;
  countdownText: string;

  // Actions
  setProfile: (updates: Partial<UserProfileData>) => void;
  setEditFields: (
    fields: Partial<{
      editName: string;
      editUsername: string;
      editEmail: string;
      editPhone: string;
      timezone: string;
    }>,
  ) => void;
  initializeForm: () => void; // Syncs profile -> form fields
  setCountdownText: (text: string) => void;
  savePersonalDetails: () => void;
  revokeDevice: (id: number) => void;
  removeFromWatchlist: (id: string) => void;
  removeFromWatchHistory: (id: string) => void;
  clearWatchHistory: () => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  // Mocking initial values for demonstration
  profile: {
    name: "Asif Hosen",
    username: "asifhosen",
    email: "asif@example.com",
    phone: "+8801700000000",
    avatar: "",
    membershipTier: "Premium Tier",
    expirationDate: new Date(
      Date.now() + 10 * 24 * 60 * 60 * 1000,
    ).toISOString(), // 10 days from now
    autoplay: true,
    matureContent: false,
    devices: [],
    watchlist: [],
    watchHistory: [
      {
        id: "h1",
        title: "The Midnight Horizon",
        image: "",
        watchedAt: "2026-05-20T18:30:00.000Z",
        progress: 85,
        duration: "1h 42m / 2h 00m",
        year: 2025,
        rating: "8.4",
      },
      {
        id: "h2",
        title: "Echoes of Eternity",
        image: "",
        watchedAt: "2026-05-19T21:15:00.000Z",
        progress: 100,
        duration: "1h 35m / 1h 35m",
        year: 2024,
        rating: "7.9",
      },
      {
        id: "h3",
        title: "Shadow Recruit: Legacy",
        image: "",
        watchedAt: "2026-05-18T14:20:00.000Z",
        progress: 40,
        duration: "48m / 2h 02m",
        year: 2026,
        rating: "8.8",
      },
      {
        id: "h4",
        title: "Cyberpunk 2099: Neon City",
        image: "",
        watchedAt: "2026-05-15T22:40:00.000Z",
        progress: 10,
        duration: "12m / 1h 55m",
        year: 2025,
        rating: "9.2",
      },
    ],
  },
  editName: "",
  editUsername: "",
  editEmail: "",
  editPhone: "",
  timezone: "Asia/Dhaka",
  countdownText: "",

  setProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),

  setEditFields: (fields) =>
    set((state) => ({
      ...state,
      ...fields,
    })),

  initializeForm: () =>
    set((state) => ({
      editName: state.profile.name,
      editUsername: state.profile.username,
      editEmail: state.profile.email,
      editPhone: state.profile.phone,
    })),

  setCountdownText: (text) => set({ countdownText: text }),

  savePersonalDetails: () =>
    set((state) => ({
      profile: {
        ...state.profile,
        name: state.editName,
        username: state.editUsername,
        email: state.editEmail,
        phone: state.editPhone,
      },
    })),

  revokeDevice: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        devices: state.profile.devices.filter((d) => d.id !== id),
      },
    })),

  removeFromWatchlist: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        watchlist: state.profile.watchlist.filter((item) => item.id !== id),
      },
    })),

  removeFromWatchHistory: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        watchHistory: state.profile.watchHistory.filter((item) => item.id !== id),
      },
    })),

  clearWatchHistory: () =>
    set((state) => ({
      profile: {
        ...state.profile,
        watchHistory: [],
      },
    })),
}));
