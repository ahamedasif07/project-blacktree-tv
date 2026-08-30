"use client";

import { ChatInput } from "./chat-input";

import { X, Shield } from "lucide-react";
import React, { useEffect, useRef } from "react";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const VidPlayer = dynamic(() => import("@/features/player/components/vid-player"), {
  ssr: false,
});
import { usePlayerStore } from "@/features/player/store/player.store";
import { useHeroStore } from "@/store/public/use-hero-store";

export function HeroSection() {
  const { messages } = useHeroStore();
  const { isChatOpen, toggleChat } = usePlayerStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Directly targets the container so scrolling works seamlessly when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="text-foreground p-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out">
          {/* Player Column */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-black flex items-center justify-center rounded-2xl ${
              isChatOpen ? "lg:w-2/3" : "lg:w-full"
            } aspect-video lg:aspect-auto lg:max-h-[87vh]  w-full`}
          >
            <VidPlayer />
          </div>

          {/* Chat Column */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isChatOpen
                ? "flex-1 lg:w-1/3 opacity-100 translate-y-0 lg:translate-x-0"
                : "h-0 lg:h-auto w-0 lg:w-0 opacity-0 translate-y-10 lg:translate-x-10 pointer-events-none"
            }`}
          >
            <Card className="border border-[#FFFFFF1A] bg-[#100F0F]  flex flex-col min-w-full  h-[400px]  md:h-[575px]    rounded-lg shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-5 border-b border-[#FFFFFF1A]">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold text-frontground">
                    Live Chat
                  </CardTitle>
                  <Badge className="bg-frontground/10 text-frontground/60 hover:bg-frontground/20 border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                    Top Chat
                  </Badge>
                </div>

                <X
                  onClick={toggleChat}
                  className="w-6 h-6 cursor-pointer hover:text-frontground transition-colors"
                />
              </div>

              {/* Chat Messages */}
              <CardContent
                ref={scrollRef}
                className="flex-1 space-y-5 overflow-y-auto p-4 custom-scrollbar"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 animate-in fade-in slide-in-from-right-4 ${
                      msg.isMod
                        ? "bg-red-950/20 border-l border-red-600 p-3 rounded-r-md -mx-1"
                        : ""
                    }`}
                  >
                    <Avatar className="h-9 w-9 rounded-full ring-1 ring-white/10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                      />
                      <AvatarFallback className="bg-white/5 text-white/40">
                        {msg.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 leading-tight">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="flex items-center gap-1 text-primary">
                          <span className="font-bold  text-[15px] hover:underline cursor-pointer">
                            {msg.user}
                          </span>
                          {msg.isMod && <Shield className="w-3.5 h-3.5" />}
                          <span className="text-[15px] font-bold">:</span>
                        </span>
                        <span className="text-[14px]  text-white font-normal leading-relaxed wrap-break-words">
                          {msg.message}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              {/* Chat Input Area */}
              <ChatInput />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
