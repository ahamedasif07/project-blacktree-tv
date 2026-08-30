"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Play } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface SpotlightItem {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  label: string;
}

interface SpotlightSliderProps {
  items: SpotlightItem[];
}

// ... (baki import gulo thik thakbe)

export function ExclusiveInterview({ items }: SpotlightSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugins = React.useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: false })],
    [],
  );

  React.useEffect(() => {
    if (!api) return;

    setTimeout(() => {
      if (api) setCurrent(api.selectedScrollSnap());
    }, 0);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full py-10 ">
      <Carousel
        setApi={setApi}
        plugins={plugins}
        // LOOP TRUE KORE DEWA HOLO JATE REVERSE NA HOYE CONTINUOUS CHOLE
        opts={{
          loop: true,
        }}
        className="w-full container mx-auto overflow-hidden md:rounded-2xl shadow-2xl"
      >
        <CarouselContent className="ml-0">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-0">
              {/* ... baki content thik thakbe ... */}
              <Link href="/interviews">
                <div className="relative w-full h-75 md:h-105 lg:h-120 bg-zinc-950">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-center px-10 md:px-20">
                    <div className="max-w-2xl space-y-3 md:space-y-4">
                      <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-[15px]  py-1 rounded-full w-fit">
                        {item.label}
                      </h3>

                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-frontground font-sans uppercase">
                        {item.title}
                      </h2>

                      <div className="space-y-1 md:space-y-2">
                        <h4 className="text-lg md:text-2xl text-frontground/90 font-medium">
                          {item.subtitle}
                        </h4>
                        <p className="text-muted-foreground text-sm md:text-base max-w-md line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-4 py-3 md:px-5 md:py-3 h-auto text-base font-bold shadow-lg shadow-primary/20">
                          Watch Now
                          <Play className="ml-2 h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={cn(
                          "h-1.5 transition-all duration-300 rounded-full",
                          current === i
                            ? "bg-primary w-8"
                            : "bg-frontground/20 w-4 hover:bg-frontground/40",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
