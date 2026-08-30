"use client";

import React, { useState } from "react";
import {
  History,
  Trash2,
  Film,
  Star,
  Calendar,
  Search,
  X,
  Play,
  Pause,
  Clock,
  BarChart3,
} from "lucide-react";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WatchHistoryTab = () => {
  const { profile, removeFromWatchHistory, clearWatchHistory } = useUserProfileStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleClearHistory = () => {
    clearWatchHistory();
    setShowClearConfirm(false);
    toast.success("Watch history cleared successfully.");
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    toast.success(
      isPaused ? "Watch history recording resumed." : "Watch history recording paused."
    );
  };

  const filteredHistory = profile?.watchHistory?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getMovieDescription = (id: string) => {
    const descMap: Record<string, string> = {
      h1: "Under the shadows of the neon-drenched metropolis, an operative uncovers a digital signal from the edge of space, revealing a truth that could rewrite history.",
      h2: "A team of deep-space researchers falls out of contact. Years later, a rescue team intercepts a transmission containing echoes of their final moments.",
      h3: "When a security breach exposes high-profile operatives, a new recruit is forced to decipher encrypted legacies to prevent an international crisis.",
      h4: "Deep inside Neon City, hackers and cyber-mercenaries fight for control of a quantum chip capable of granting absolute digital immortality.",
    };
    return descMap[id] || "An immersive cinematic experience, exploring the deep stories, unseen boundaries, and stellar characters of Blacktree TV.";
  };

  const ThumbnailPlaceholder = ({ title }: { title: string }) => {
    const gradients = [
      "from-red-950/40 via-red-900/10 to-neutral-950",
      "from-rose-950/40 via-rose-900/10 to-neutral-950",
      "from-neutral-900 via-neutral-950 to-neutral-900",
      "from-red-950/30 via-neutral-900/20 to-neutral-950",
    ];
    const charSum = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const selectedGradient = gradients[charSum % gradients.length];
    
    return (
      <div className={`w-full h-full bg-linear-to-br ${selectedGradient} flex items-center justify-center relative`}>
        <Film className="text-red-500/20 group-hover:text-red-500/40 transition-all duration-300" size={32} />
        <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-wider font-extrabold text-neutral-500/80 font-sans group-hover:text-red-500/60 transition-colors">
          Blacktree TV
        </span>
      </div>
    );
  };

  // Stats calculation
  const totalVideos = profile?.watchHistory?.length || 0;
  const completedVideos = profile?.watchHistory?.filter((item) => item.progress === 100).length || 0;

  return (
    <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* SECTION 1: HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900/60 pb-4 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 text-red-500">
            <History size={18} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white tracking-wide font-sans">
              Watch History
            </h3>
            <p className="text-xs text-neutral-400 font-sans">
              Review your recently played movies, series, and streaming logs.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: TWO-COLUMN CONTENT AREA (YouTube Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: History List */}
        <div className="lg:col-span-8 space-y-4">
          {!profile?.watchHistory || profile.watchHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-neutral-900 bg-neutral-950/40 backdrop-blur-md rounded-2xl p-16 text-center shadow-2xl">
              <div className="p-3 bg-neutral-900 rounded-full border border-neutral-850 text-neutral-400 mb-3">
                <Film size={20} className="opacity-60" />
              </div>
              <p className="text-xs font-medium text-neutral-400 font-sans tracking-wide">
                Your watch history is currently empty. Start streaming!
              </p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-neutral-900 bg-neutral-950/20 backdrop-blur-md rounded-2xl p-12 text-center shadow-md">
              <span className="text-xs font-medium text-neutral-500 font-sans">
                No history items match your search &ldquo;{searchQuery}&rdquo;.
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => {
                const totalDuration = item.duration.includes("/")
                  ? item.duration.split("/")[1].trim()
                  : item.duration;

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col sm:flex-row gap-4 p-3.5 bg-neutral-900/20 hover:bg-neutral-900/40 border border-neutral-900/80 hover:border-neutral-800/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 relative"
                  >
                    {/* Thumbnail (16:9 aspect ratio) */}
                    <div className="aspect-video w-full sm:w-48 md:w-56 rounded-xl relative overflow-hidden bg-neutral-950 border border-neutral-850 shrink-0 shadow-inner group">
                      <ThumbnailPlaceholder title={item.title} />

                      {/* Duration Overlay */}
                      <span className="absolute bottom-2 right-2 bg-black/85 text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded text-white z-10">
                        {totalDuration}
                      </span>

                      {/* Progress Bar overlaying the bottom edge */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-850 z-10">
                        <div
                          className={`h-full transition-all duration-500 ${
                            item.progress === 100 ? "bg-emerald-600" : "bg-red-650"
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Information Section */}
                    <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0 pr-8">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-red-500 transition-colors duration-300">
                          {item.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[10px] sm:text-[11px] text-neutral-400 font-sans font-medium">
                          <span className="font-semibold text-neutral-300">Blacktree TV</span>
                          <span className="text-neutral-800">•</span>
                          {item.rating && (
                            <>
                              <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                <Star size={10} className="fill-amber-500/20" />
                                {item.rating} Rating
                              </span>
                              <span className="text-neutral-800">•</span>
                            </>
                          )}
                          {item.year && <span>{item.year}</span>}
                        </div>

                        <p className="text-xs text-neutral-400 font-sans mt-2 line-clamp-2 leading-relaxed hidden sm:block font-normal">
                          {getMovieDescription(item.id)}
                        </p>

                        <span className="text-[10px] sm:text-[11px] text-neutral-550 font-sans mt-1.5 sm:mt-2.5 flex items-center gap-1.5">
                          <Calendar size={11} className="opacity-70 text-red-500" />
                          Watched on {formatDate(item.watchedAt)}
                        </span>
                      </div>

                      {/* Progress Telemetry */}
                      <div className="flex items-center gap-2 mt-3 sm:mt-0 text-[9px] font-mono font-bold text-neutral-500">
                        <span>
                          Watched: {item.duration.includes("/") ? item.duration.split("/")[0].trim() : item.duration}
                        </span>
                        <span
                          className={
                            item.progress === 100
                              ? "text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider"
                              : "text-rose-455 border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider"
                          }
                        >
                          {item.progress === 100 ? "Completed" : `${item.progress}% watched`}
                        </span>
                      </div>
                    </div>

                    {/* Delete Icon Button (Top Right of Card) */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWatchHistory(item.id)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-full h-8 w-8 border border-transparent hover:border-neutral-850 transition-all duration-300"
                      aria-label={`Remove ${item.title} from history`}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar Controls (YouTube Style Sidebar) */}
        <div className="lg:col-span-4 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.5),0_0_20px_rgba(220,38,38,0.01)] space-y-5 lg:sticky lg:top-24">
          {/* Search History input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-0.5">
              Search Watch History
            </label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-red-500 transition-colors duration-300">
                <Search size={14} />
              </span>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="bg-neutral-900/20 border-neutral-800 focus-visible:bg-neutral-950/60 focus-visible:border-red-500/60 focus-visible:ring-2 focus-visible:ring-red-500/10 hover:bg-neutral-900/40 hover:border-neutral-700/80 h-10 text-xs text-white pl-9 pr-8 rounded-xl transition-all duration-300 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-450 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* History Controls */}
          <div className="space-y-3 pt-2">
            {!showClearConfirm ? (
              <Button
                disabled={totalVideos === 0}
                onClick={() => setShowClearConfirm(true)}
                className="w-full bg-neutral-900/60 border border-neutral-800 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-neutral-800 disabled:hover:text-neutral-500 text-white transition-all duration-300 rounded-xl h-10 text-xs font-bold font-sans flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Trash2 size={13} className="text-red-500" />
                Clear All History
              </Button>
            ) : (
              <div className="flex flex-col gap-2 p-3 bg-neutral-950/80 border border-neutral-850 rounded-xl animate-in fade-in duration-200">
                <span className="text-[10px] font-bold text-neutral-400 text-center pb-1">
                  Clear entire watch history?
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={handleClearHistory}
                    className="flex-1 h-8 text-[10px] font-bold bg-red-600 hover:bg-red-750 text-white rounded-lg transition-all"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 h-8 text-[10px] font-bold bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Button
              onClick={handleTogglePause}
              className={`w-full transition-all duration-300 rounded-xl h-10 text-xs font-bold font-sans flex items-center justify-center gap-2 cursor-pointer border shadow-md ${
                isPaused
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/35"
                  : "bg-neutral-900/60 border-neutral-800 hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-400 text-white"
              }`}
            >
              {isPaused ? (
                <>
                  <Play size={13} />
                  Resume Watch History
                </>
              ) : (
                <>
                  <Pause size={13} />
                  Pause Watch History
                </>
              )}
            </Button>
          </div>

          {/* History Analytics / Stats Summary */}
          <div className="border-t border-neutral-850/80 pt-4 space-y-3.5">
            <div className="flex items-center gap-2 text-neutral-400">
              <BarChart3 size={14} className="text-red-500" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono">
                History Stats
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-neutral-950/40 border border-neutral-850/40 p-2.5 rounded-xl space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold">
                  Streamed
                </span>
                <span className="text-white font-extrabold text-sm tracking-wide flex items-center gap-1.5">
                  <Film size={12} className="text-neutral-400" />
                  {totalVideos} {totalVideos === 1 ? "title" : "titles"}
                </span>
              </div>

              <div className="bg-neutral-950/40 border border-neutral-850/40 p-2.5 rounded-xl space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold">
                  Completed
                </span>
                <span className="text-emerald-450 font-extrabold text-sm tracking-wide flex items-center gap-1.5">
                  <Clock size={12} className="text-emerald-500" />
                  {completedVideos} {completedVideos === 1 ? "title" : "titles"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchHistoryTab;
