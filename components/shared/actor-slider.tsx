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
import ActorCard from "./actor-card";

export interface ActorDetails {
  born: string;
  awards: string;
  training: string;
}

export interface Actor {
  id: number | string;
  slug: string; // Add this line
  name: string;
  role: string;
  label: string;
  shortDesc: string;
  bio: string[];
  details: ActorDetails;
  image: string;
}

interface ActorSliderProps {
  title: string;
  actors: Actor[];
}

const ActorSlider = ({ title, actors }: ActorSliderProps) => {
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

  // Smooth infinite loop logic
  const displayActors = actors.length < 10 ? [...actors, ...actors] : actors;

  return (
    <section className="w-full py-8 md:py-10 lg:py-14 px-4 md:px-0 transition-colors duration-300">
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground/90">
                {title}
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 relative">
              <CarouselPrevious
                className="static translate-y-0 h-9 w-9 rounded-full border border-foreground/70 hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </CarouselPrevious>

              <CarouselNext
                className="static translate-y-0 h-9 w-9 rounded-full border border-foreground/70 hover:text-primary bg-transparent hover:bg-transparent hover:border-primary transition-all duration-300 group shadow-none"
                variant="ghost"
              >
                <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="-ml-4">
            {displayActors.map((actor, index) => (
              <CarouselItem
                key={`${actor.id}-${index}`}
                className="pl-4 basis-1/2 sm:basis-1/2 md:basis-[31%] lg:basis-[24%] xl:basis-1/5"
              >
                <ActorCard actor={actor} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ActorSlider;
