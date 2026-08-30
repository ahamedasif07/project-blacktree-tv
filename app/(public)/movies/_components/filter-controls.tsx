"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  label: string;
  items: string[];
}

export function FilterControls() {
  return (
    <section className="w-full py-4">
      <div className="container px-4 md:px-0 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-items-stretch">
          <Button className="w-full py-5 bg-primary/90 hover:bg-primary text-foreground font-bold uppercase tracking-wider rounded-lg transition-all shadow-md">
            ALL
          </Button>

          <FilterDropdown
            label="CATEGORY"
            items={["ACTION", "HORROR", "COMEDY"]}
          />
          <FilterDropdown label="YEAR" items={["2024", "2023", "2022"]} />
          <FilterDropdown
            label="LANGUAGE"
            items={["English", "Spanish", "French"]}
          />
        </div>
      </div>
    </section>
  );
}

function FilterDropdown({ label, items }: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("All");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full  justify-between px-4 py-5 rounded-lg bg-[#0a0a0a] border-zinc-800 text-zinc-400 hover:bg-[#0f0f0f] hover:text-zinc-300 transition-all outline-none"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">
              {label}:
            </span>
            <span className="truncate text-sm text-zinc-300">{selected}</span>
          </div>
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-1 bg-zinc-950 border-zinc-800 text-zinc-200"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5 text-zinc-500 text-[10px] uppercase tracking-widest">
            Filter by {label}
          </div>
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-colors cursor-pointer outline-none",
                selected === item
                  ? "bg-primary text-white"
                  : "hover:bg-zinc-800 text-zinc-300",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
