"use client";

import React, { useRef } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePaginationStore } from "@/store/public/use-pagination-store";
import MovieCard from "@/components/shared/movieCard";
import { ALL_MOVIES } from "@/constants/movies";

export default function AllMoviesSection() {
  const { currentPage, itemsPerPage, setCurrentPage } = usePaginationStore();
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const displayMovies = Array.from({ length: 45 }, (_, i) => ({
    ...ALL_MOVIES[i % ALL_MOVIES.length],
    id: i,
  }));

  const totalPages = Math.ceil(displayMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = displayMovies.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <section className="w-full py-10 ">
      <div ref={sectionRef} className="scroll-mt-24" />

      <div className="container px-4 md:px-0 mx-auto space-y-6 md:space-y-8 lg:space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

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
    </section>
  );
}
