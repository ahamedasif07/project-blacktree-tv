import React from "react";
import { ChevronRight } from "lucide-react";
import { SUB_GENRES } from "@/constants/genres";
import Image from "next/image";

export default function TrendingSubGenres() {
  return (
    <section className="w-full py-16 px-4 md:px-10 lg:px-20 bg-background text-frontground">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter flex items-center gap-2">
            TRENDING <span className="text-primary">SUB-GENRES</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            Niche categories curated by our cinema experts
          </p>
        </div>

        {/* Genres List */}
        <div className="flex flex-col gap-4">
          {SUB_GENRES.map((genre) => (
            <div
              key={genre.id}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between  p-6 md:p-8 bg-[#1A1A1ACC] border border-background/50 rounded-2xl hover:bg-[#121212] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="flex items-start sm:items-center gap-5 md:gap-10">
                {/* Number Index */}
                <span className="text-4xl md:text-5xl font-black text-zinc-800/50 group-hover:text-zinc-700 transition-colors leading-none">
                  {genre.id}
                </span>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-wide uppercase group-hover:text-frontground/70 transition-colors">
                    {genre.title}
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base line-clamp-1 sm:line-clamp-none">
                    {genre.description}
                  </p>
                </div>
              </div>

              {/* Right Side Info - Stacked on mobile as per image_6575d2.png */}
              <div className="flex items-center gap-6 mt-6 sm:mt-0 ml-14 sm:ml-0">
                {/* The Avatar + Count Stack */}
                <div className="flex items-center -space-x-3.5">
                  {/* First Avatar */}
                  <div className="relative w-[48px] h-[48px] rounded-[18px] overflow-hidden border-[3px] border-[#0A0A0A] bg-zinc-900 ring-1 ring-zinc-800/50">
                    <Image
                      src="/assets/images/avater1.jpg"
                      alt="Avatar 1"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  {/* Second Avatar */}
                  <div className="relative w-[48px] h-[48px] rounded-[18px] overflow-hidden border-[3px] border-[#0A0A0A] bg-zinc-900 ring-1 ring-zinc-800/50">
                    <Image
                      src="/assets/images/avter-3.jpg"
                      alt="Avatar 2"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  {/* Count Badge - Perfectly matching image_64f996.png */}
                  <div className="relative flex items-center justify-center w-[52px] h-[48px] rounded-[18px] bg-[#27272A] border-[3px] border-[#0A0A0A] ring-1 ring-zinc-800/50 z-10">
                    <span className="text-[13px] font-black text-white tracking-tight">
                      +{genre.count}
                    </span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-[#E50914] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
