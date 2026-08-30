"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export function BrowseFilterSection() {
  const [selectedLetter, setSelectedLetter] = React.useState("#");

  return (
    <section className="w-full bg-background py-10 px-4 md:px-0">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Area */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tighter uppercase italic">
            BROWSE <span className="text-primary">A-Z</span>
          </h2>
          <button className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">
            VIEW ALL
          </button>
        </div>

        {/* Alphabet List - Scrollable on mobile */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-2 no-scrollbar">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={cn(
                "min-w-[32px] h-8 md:min-w-[40px] md:h-10 flex items-center justify-center rounded-sm text-xs md:text-sm font-bold transition-all",
                selectedLetter === letter
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-transparent",
              )}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Filter Controls Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
          {/* Main Toggle Button */}
          <button className="w-full h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest rounded-md text-sm shadow-lg hover:opacity-90 transition-opacity">
            ALL
          </button>

          {/* Custom Selects */}
          <FilterSelect label="COUNTRY" />
          <FilterSelect label="YEAR" />
          <FilterSelect label="LANGUAGE" />
          <FilterSelect label="GENRE" />
        </div>
      </div>
    </section>
  );
}

// Reusable Select Component to reduce div nesting
function FilterSelect({ label }: { label: string }) {
  return (
    <div className="relative group cursor-pointer">
      <div className="w-full h-12 px-4 flex items-center justify-between bg-card border border-border rounded-md group-hover:border-primary/50 transition-colors">
        <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}:
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </div>
  );
}
