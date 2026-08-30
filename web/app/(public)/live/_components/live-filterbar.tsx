"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const FilterBar = () => {
  const categories = [
    "All Live",
    "Sports",
    "News",
    "Entertainment",
    "Movies",
    "Local",
    "Music",
  ];
  const [active, setActive] = useState("All Live");

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          onClick={() => setActive(cat)}
          className={cn(
            "rounded-full px-5 h-9 text-xs font-semibold transition-all border border-white/5 shadow-sm",

            "hover:bg-primary hover:text-primary-foreground",

            active === cat
              ? "bg-primary text-primary-foreground"
              : "bg-[#1A1A1A] text-zinc-400",
          )}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};
