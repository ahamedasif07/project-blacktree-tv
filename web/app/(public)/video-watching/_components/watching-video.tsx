"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const VidPlayer = dynamic(() => import("@/features/player/components/vid-player"), {
  ssr: false,
});
import { cn } from "@/lib/utils";

import { usePlayerStore } from "@/features/player/store/player.store";

const WatchingVideo = () => {
  const { activeVideo } = usePlayerStore();

  return (
    <section className="w-full bg-[#0a0a0a] text-white mt-24 font-sans selection:bg-red-600 selection:text-white">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Using items-stretch to ensure player and chat have the same height */}
        <div className=" mt-6 transition-all duration-500 ease-in-out items-stretch">
          {/* --- LEFT SIDE: VIDEO & INFO --- */}
          <div
            className={cn(
              "transition-all duration-500 ease-in-out flex flex-col gap-6",
            )}
          >
            {/* VIDEO PLAYER CONTAINER */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5 flex flex-col h-full min-h-100 lg:h-200">
              <VidPlayer />
            </div>
 
            {/* TEXT INFO SECTION */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-white uppercase tracking-tighter">
                  {activeVideo?.title || "Beyond The Story"}
                </h1>
                <h2 className="text-xl font-bold text-white/90">
                  {activeVideo?.provider || "Episode 4: Finding Home"}
                </h2>
                <p className="text-zinc-400 text-[14px] max-w-2xl leading-relaxed">
                  {activeVideo 
                    ? `Provider: ${activeVideo.provider} | Duration: ${Math.round(activeVideo.size || 0)} seconds (${Math.round((activeVideo.size || 0) / 60)} minutes)` 
                    : "A powerful journey of resilience, identity and community. Exploring the depths of what it truly means to belong in an ever-changing landscape."
                  }
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
        </div>
      </div>
    </section>
  );
};

export default WatchingVideo;
