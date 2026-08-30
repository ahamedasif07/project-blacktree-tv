"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { InterviewCard } from "./interview-card";
import { ALL_INTERVIEWS } from "@/constants/intervirew";

interface Interview {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

interface InterviewSliderProps {
  title: string;
  interviews: Interview[];
}

const InterviewSlider = ({ title }: InterviewSliderProps) => {
  const plugins = React.useMemo(
    () => [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
    [],
  );

  const displayInterviews =
    ALL_INTERVIEWS.length < 10
      ? [...ALL_INTERVIEWS, ...ALL_INTERVIEWS]
      : ALL_INTERVIEWS;

  return (
    <section className="w-full py-10 px-4 md:px-0 transition-colors duration-300">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            containScroll: false,
          }}
          plugins={plugins}
          className="w-full"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-primary rounded-r-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground/90  tracking-tight">
                {title}
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 relative">
              <CarouselPrevious
                className="static translate-y-0 h-9 w-9 rounded-full border border-border hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </CarouselPrevious>

              <CarouselNext
                className="static translate-y-0 h-9 w-9 rounded-full border border-border hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {displayInterviews.map((interview, index) => (
              <CarouselItem
                key={`${interview.id}-${index}`}
                className="pl-4 basis-full sm:basis-1/2 md:basis-[33.33%] lg:basis-[25%]"
              >
                <InterviewCard interview={interview} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default InterviewSlider;
