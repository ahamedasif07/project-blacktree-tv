"use client";

import React, { useEffect, useRef } from "react";
import { X, Shield, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterBar } from "./live-filterbar";

import dynamic from "next/dynamic";

const VidPlayer = dynamic(() => import("@/features/player/components/vid-player"), {
  ssr: false,
});

// Stores
import { useHeroStore } from "@/store/public/use-hero-store";
import { usePlayerStore } from "@/features/player/store/player.store";
import { ChatInput } from "@/components/shared/home/chat-input";

export function LivePlayer() {
  const { messages } = useHeroStore();
  const { isChatOpen, toggleChat } = usePlayerStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages]);

  return (
    <section className="bg-black text-foreground p-4 lg:p-8 min-h-screen">
      <div className="container mx-auto">
        <FilterBar />

        {/* Using items-stretch to ensure player and chat have the same height */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6 transition-all duration-500 ease-in-out items-stretch">
          {/* --- LEFT SIDE: VIDEO & INFO --- */}
          <div
            className={cn(
              "transition-all duration-500 ease-in-out flex flex-col gap-6",
              isChatOpen ? "lg:w-2/3" : "lg:w-full",
            )}
          >
            {/* VIDEO PLAYER CONTAINER */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5 flex flex-col h-full min-h-100 lg:min-h-125">
              <VidPlayer />
            </div>

            {/* TEXT INFO SECTION */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white uppercase tracking-tighter">
                  Beyond The Story
                </h1>
                <h2 className="text-xl font-bold text-white/90">
                  Episode 4: Finding Home
                </h2>
                <p className="text-zinc-400 text-[14px] max-w-2xl leading-relaxed">
                  A powerful journey of resilience, identity and community.
                  Exploring the depths of what it truly means to belong in an
                  ever-changing landscape.
                </p>
              </div>

              <Button
                variant="outline"
                className="bg-[#1A1A1A] border-white/10 hover:bg-zinc-800 text-white rounded-xl gap-2 h-10 px-6"
              >
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* --- RIGHT SIDE: LIVE CHAT --- */}
          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden",
              isChatOpen
                ? "flex-1 lg:w-1/3 opacity-100 translate-y-0 lg:translate-x-0"
                : "h-0 lg:h-auto w-0 lg:w-0 opacity-0 pointer-events-none",
            )}
          >
            <Card className="border border-white/10 bg-[#0A0A0A] flex flex-col h-full min-h-125 rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-5 border-b border-white/5 bg-zinc-900/20">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-bold uppercase text-white tracking-widest">
                    Live Chat
                  </CardTitle>
                  <Badge className="bg-white/10 text-white/60 hover:bg-white/20 border-none px-2 py-0.5 text-[9px] uppercase font-bold">
                    Top Chat
                  </Badge>
                </div>

                <X
                  onClick={toggleChat}
                  className="w-5 h-5 cursor-pointer text-zinc-500 hover:text-white transition-colors"
                />
              </div>

              <CardContent className="flex-1 p-0 overflow-hidden relative">
                <ScrollArea ref={scrollRef} className="absolute inset-0 h-full">
                  <div className="p-4 space-y-5">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-3 animate-in fade-in slide-in-from-right-4 text-[13px]",
                          msg.isMod &&
                            "bg-red-950/10 border-l-2 border-red-600 p-3 rounded-r-md -mx-1",
                        )}
                      >
                        <Avatar className="h-8 w-8 rounded-full ring-1 ring-white/10">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`}
                          />
                          <AvatarFallback className="bg-white/5 text-white/40">
                            {msg.user[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 leading-tight">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span
                              className={cn(
                                "flex items-center gap-1 font-bold text-[14px]",
                                msg.isMod ? "text-red-500" : "text-primary",
                              )}
                            >
                              <span className="hover:underline cursor-pointer">
                                {msg.user}
                              </span>
                              {msg.isMod && <Shield className="w-3.5 h-3.5" />}
                              <span>:</span>
                            </span>
                            <span className="text-[14px] text-zinc-200 font-normal leading-relaxed wrap-break-word">
                              {msg.message}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <div className="p-4 border-t border-white/5 bg-black">
                <ChatInput />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
