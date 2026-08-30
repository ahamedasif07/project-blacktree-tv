"use client";

import { useHeroStore } from "@/store/public/use-hero-store";
import { SendHorizontal, Smile, CircleDollarSign } from "lucide-react";
import { EmojiMart } from "./emoji-mart";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import React, { memo, useCallback, useState, useRef, useEffect } from "react";

const ChatInputComponent = () => {
  const { chatInput, setChatInput, addMessage } = useHeroStore();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setIsEmojiOpen(false);
      }
    };

    if (isEmojiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEmojiOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    addMessage(chatInput);
  };

  const handleEmojiSelect = useCallback(
    (emoji: { native: string }) => {
      setChatInput((prev) => prev + emoji.native);
    },
    [setChatInput],
  );

  return (
    <CardFooter className="w-full p-0 m-0">
      <div className="p-4 w-full bg-white/5 border-t border-white/5">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="relative flex items-center bg-zinc-900/50 border border-white/5 group-focus-within:border-white/20 transition-all px-3 py-2">
            <Input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send a message..."
              className="bg-transparent! focus:bg-transparent! placeholder:text-white/40! border-none focus-visible:ring-0 text-[14px] h-9 p-0 px-2.5 w-full flex-1"
            />
            <div className="flex items-center gap-3 ml-2 relative" ref={emojiRef}>
              <Smile
                onClick={() => setIsEmojiOpen((prev) => !prev)}
                className={`w-5 h-5 transition-colors cursor-pointer ${
                  isEmojiOpen ? "text-primary" : "text-white/30 hover:text-white"
                }`}
              />
              <div
                className={`absolute bottom-full mb-4 right-0 z-50 transition-all duration-200 origin-bottom-right ${
                  isEmojiOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <EmojiMart onEmojiSelect={handleEmojiSelect} />
              </div>
              <button type="submit" disabled={!chatInput.trim()}>
                <SendHorizontal
                  className={`cursor-pointer w-5 h-5 transition-all ${chatInput.trim() ? "text-primary scale-110" : "text-white/20"}`}
                />
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-between mt-3 px-1 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors cursor-pointer">
            <CircleDollarSign className="w-3.5 h-3.5" />
            <span>1,240 Bits</span>
          </div>
          <span className="text-white/20 uppercase tracking-widest text-[9px]">
            Press Enter to send
          </span>
        </div>
      </div>
    </CardFooter>
  );
};

export const ChatInput = memo(ChatInputComponent);
