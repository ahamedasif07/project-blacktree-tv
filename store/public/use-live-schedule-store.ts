import { create } from "zustand";

interface ScheduleItem {
  id: string;
  title: string;
  time?: string;
  thumbnail: string;
  percentage?: number;
}

interface LiveScheduleStore {
  nowPlaying: {
    title: string;
    episode: string;
    time: string;
    thumbnail: string;
  };
  upNext: ScheduleItem[];
  votingPoll: ScheduleItem[];
  castVote: (id: string) => void;
}

export const useLiveScheduleStore = create<LiveScheduleStore>((set) => ({
  nowPlaying: {
    title: "Beyond Thr Story",
    episode: "Episode 4: Finding Home",
    time: "12:00 PM - 12:30 PM",
    thumbnail:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400",
  },
  upNext: [
    {
      id: "un-1",
      title: "The Culture Code",
      time: "12:30 PM - 1:00 PM",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400",
    },
    {
      id: "un-2",
      title: "Urban Voices",
      time: "1:00 PM - 1:30 PM",
      thumbnail:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400",
    },
  ],
  votingPoll: [
    {
      id: "vp-1",
      title: "Legend Of The Game",
      thumbnail:
        "https://images.unsplash.com/photo-1542204113-e9354e710682?q=80&w=400",
      percentage: 89,
    },
    {
      id: "vp-2",
      title: "Black Excellence",
      thumbnail:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400",
      percentage: 78,
    },
  ],
  castVote: (id) =>
    set((state) => ({
      votingPoll: state.votingPoll.map((item) =>
        item.id === id
          ? { ...item, percentage: Math.min((item.percentage || 0) + 1, 100) }
          : item,
      ),
    })),
}));
