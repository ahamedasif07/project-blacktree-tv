"use client";

import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { memo } from "react";

// Dynamically import the heavy Picker component
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="w-[352px] h-[435px] bg-[#100F0F] flex items-center justify-center rounded-xl border border-[#FFFFFF1A]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface EmojiMartProps {
  onEmojiSelect: (emoji: {native: string}) => void;
}

const EmojiMartComponent = ({ onEmojiSelect }: EmojiMartProps) => {
  const { theme } = useTheme();

  return (
    <div className="relative shadow-2xl rounded-xl overflow-hidden border border-[#FFFFFF1A] bg-[#100F0F]">
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        theme={theme === "dark" ? "dark" : "light"}
        set="native"
        skinTonePosition="none"
        previewPosition="none"
        navPosition="bottom"
        perLine={8}
        autoFocus={false}
        icons="outline"
      />
    </div>
  );
};

export const EmojiMart = memo(EmojiMartComponent);
