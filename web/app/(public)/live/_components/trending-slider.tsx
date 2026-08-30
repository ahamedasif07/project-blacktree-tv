"use client";

import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { trendingChannels } from "@/constants/chanels";
import ChannelCard from "../../live/_components/channel-card";

export interface Channel {
  id: number | string;
  title: string;
  subtitle: string;
  viewers: string;
  image: string;
  icon: "music" | "globe" | "gamepad" | "utensils";
  is1080p: boolean;
  progress?: number;
}

const TrendingSlider = () => {
  const [plugin] = useState(() =>
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <section className="w-full py-10 px-4 md:px-0 bg-black">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin]}
          onMouseEnter={() => plugin.stop()}
          onMouseLeave={() => plugin.reset()}
          className="w-full"
        >
          {/* Header Section with Navigation */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Trending Channels
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Most watched broadcasts right now
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 relative">
              <CarouselPrevious
                className="static translate-y-0 h-9 w-9 rounded-full border border-zinc-800 hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
              </CarouselPrevious>

              <CarouselNext
                className="static translate-y-0 h-9 w-9 rounded-full border border-zinc-800 hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
              </CarouselNext>
            </div>
          </div>

          {/* Slider Content */}
          <CarouselContent>
            {(trendingChannels as Channel[]).map((channel: Channel) => (
              <CarouselItem
                key={channel.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ChannelCard channel={channel} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingSlider;
