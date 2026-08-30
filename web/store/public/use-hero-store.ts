import { create } from "zustand";

interface Message {
  id: string;
  user: string;
  message: string;
  color: string;
  isMod?: boolean;
}

interface HeroState {
  messages: Message[];
  isChatOpen: boolean;
  chatInput: string;
  addMessage: (text: string) => void;
  setChatInput: (input: string | ((prev: string) => string)) => void;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  messages: [
    {
      id: "1",
      user: "Admin",
      message: "Welcome to the stream!",
      color: "#ff0000",
      isMod: true,
    },
    {
      id: "2",
      user: "Masrafi",
      message: "Hello everyone!",
      color: "#ffffff",
    },
    // Add your initial messages here
  ],
  isChatOpen: true, // Default open
  chatInput: "",
  addMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          user: "You",
          message: text,
          color: "#00ff00",
        },
      ],
      chatInput: "", // Clear input after adding message
    })),
  setChatInput: (input) =>
    set((state) => ({
      chatInput: typeof input === "function" ? input(state.chatInput) : input,
    })),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  setChatOpen: (open) => set({ isChatOpen: open }),
}));
