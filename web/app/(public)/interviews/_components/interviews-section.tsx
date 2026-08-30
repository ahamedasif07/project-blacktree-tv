"use client";

import { useRef, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { InterviewCard } from "./interview-card";
import { ALL_INTERVIEWS } from "@/constants/intervirew";
import { useInterviewStore } from "@/store/public/use-interview-store";

export default function InterviewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Zustand Store logic
  const { currentPage, activeTab, itemsPerPage, setCurrentPage, setActiveTab } =
    useInterviewStore();

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Filter logic
  const filteredInterviews = useMemo(() => {
    const baseList = Array.from({ length: 45 }, (_, i) => ({
      ...ALL_INTERVIEWS[i % ALL_INTERVIEWS.length],
      id: i,
    }));

    if (activeTab === "All") return baseList;
    return baseList.filter((item) => item.category === activeTab);
  }, [activeTab]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredInterviews.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToSection();
  };

  return (
    <section
      ref={sectionRef}
      className="container mx-auto mt-6 md:mt-10  pb-20"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          {/* Using your OKLCH primary color for the accent bar */}
          <div className="w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Interviews
          </h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-card border border-border p-1">
            {["All", "Exclusive", "Behind the Scenes", "Live"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-4 py-2 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                {tab === "Live" && (
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                )}
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item) => (
          <InterviewCard key={item.id} interview={item} />
        ))}
      </div>

      {/* Pagination using Zustand State */}
      <Pagination className="mt-10">
        <PaginationContent className="gap-2 border-none bg-transparent">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={`bg-card text-muted-foreground uppercase border border-border rounded-lg px-4 hover:bg-accent hover:text-accent-foreground transition-colors ${
                currentPage === 1
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>

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
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    className={`w-10 h-10 border border-border rounded-lg transition-all flex items-center justify-center font-bold ${
                      isActive
                        ? "bg-primary text-primary-foreground pointer-events-none shadow-lg"
                        : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={`bg-card text-muted-foreground uppercase border border-border rounded-lg px-4 hover:bg-accent hover:text-accent-foreground transition-colors ${
                currentPage === totalPages
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
