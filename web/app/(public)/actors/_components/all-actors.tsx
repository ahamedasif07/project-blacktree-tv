"use client";

import React, { useRef, useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BrowseAlphabet } from "../../movies/_components/browse-alphabet";
import { FEATURED_ACTORS } from "@/constants/actors";
import ActorCard from "@/components/shared/actor-card";
import { usePaginationStore } from "@/store/public/use-pagination-store";
import { useActorStore } from "@/store/public/use-actor-store";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Name (A-Z)", value: "az" },
  { label: "Name (Z-A)", value: "za" },
];

export default function Actors() {
  // Store values
  const { searchQuery, setSearchQuery, selectedLetter, sortBy, setSortBy } =
    useActorStore();
  const { currentPage, setCurrentPage } = usePaginationStore();

  // Local state for the custom Popover/Dropdown
  const [open, setOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 15;

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mock data setup
  const allActors = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        ...FEATURED_ACTORS[i % FEATURED_ACTORS.length],
        id: `actor-${i}`,
      })),
    [],
  );

  // Unified Filtering & Sorting Logic
  const filteredAndSortedActors = useMemo(() => {
    let result = [...allActors];

    // 1. Filter by Search Query
    if (searchQuery) {
      result = result.filter((actor) =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 2. Filter by Alphabet
    if (selectedLetter !== "All") {
      result = result.filter((actor) =>
        actor.name.toUpperCase().startsWith(selectedLetter.toUpperCase()),
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === "az") return a.name.localeCompare(b.name);
      if (sortBy === "za") return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedLetter, sortBy, allActors]);

  const totalPages = Math.ceil(filteredAndSortedActors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActors = filteredAndSortedActors.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === sortBy,
  )?.label;

  return (
    <main className="min-h-screen text-white py-10" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-0">
        {/* Header */}
        <div className="mb-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-3 uppercase tracking-tight">
            The Stars of <span className="text-primary">CineLens</span>
          </h1>
          <p className="text-gray-400 lg:max-w-2xl text-sm md:text-base leading-relaxed">
            Explore the definitive directory of legendary performers. From
            silent era icons to modern-day luminaries, browse the casts that
            have defined the history of motion pictures.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-12 space-y-6 border-b border-white/10 pb-10">
          <div className="w-full">
            <div className="flex flex-wrap justify-center lg:justify-start gap-1">
              <BrowseAlphabet />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full md:max-w-md relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search actor name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#0A0A0A] border-zinc-800/60 pl-11 pr-4 focus:border-primary/40 focus:ring-1 focus:ring-primary/10 text-white h-11 rounded-xl w-full text-sm transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-auto shrink-0">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="bg-[#0A0A0A] text-zinc-400 text-sm border-zinc-800/60 rounded-xl h-11 w-full md:w-48 justify-between hover:bg-[#0f0f0f] hover:text-zinc-300 focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all px-4 shadow-none"
                  >
                    <span className="truncate">
                      {currentSortLabel || "Sort by"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
                        open ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-1 bg-[#0A0A0A] border-zinc-800 text-zinc-400 shadow-2xl"
                  align="end"
                  sideOffset={6}
                >
                  <div className="flex flex-col gap-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer outline-none",
                          sortBy === option.value
                            ? "bg-primary text-white font-medium"
                            : "hover:bg-zinc-800/50 hover:text-zinc-200",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Actors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
          {currentActors.length > 0 ? (
            currentActors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-zinc-500 text-lg">
                No stars found matching {searchQuery}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination className="mt-10">
          <PaginationContent className="gap-2 border-none bg-transparent">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    scrollToSection();
                  }
                }}
                className={`bg-[#121212] text-zinc-400 uppercase border-none rounded-lg px-4 hover:bg-zinc-800 hover:text-white transition-colors ${
                  currentPage === 1
                    ? "opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      // isActive prop soriye dewa hoyeche jate Shadcn internal style clash na kore
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                        scrollToSection();
                      }}
                      className={`w-10 h-10 border-none rounded-lg transition-all flex items-center justify-center font-bold ${
                        isActive
                          ? "bg-primary  text-white hover:bg-primary  hover:cursor-pointer hover:text-white pointer-events-none shadow-lg"
                          : "bg-[#121212] text-zinc-400 hover:bg-zinc-800 hover:text-white cursor-pointer"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis className="text-zinc-500" />
                  </PaginationItem>
                );
              }
              return null;
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                    scrollToSection();
                  }
                }}
                className={`bg-[#121212] text-zinc-400 uppercase border-none rounded-lg px-4 hover:bg-zinc-800 hover:text-white transition-colors ${
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : "cursor-pointer"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
