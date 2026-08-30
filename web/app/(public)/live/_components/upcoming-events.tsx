/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Trophy, Film, ArrowRight, Bookmark } from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const UpcomingEvents = () => {
  return (
    <section className="w-full py-12 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-0">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl tracking-tight font-bold">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Don't miss out on these scheduled premieres
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* LEFT: Main Featured Card */}
          <Card className="md:col-span-8 bg-card border-border rounded-2xl relative overflow-hidden group min-h-[250px] md:min-h-[300px] flex flex-col justify-between">
            <CardContent className="p-6 md:p-8 h-full flex flex-col justify-between">
              {/* Theme Based Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none" />

              <div className="relative z-10 justify-between flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                      Exclusive Premiere
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 max-w-md leading-tight">
                    Cyber-City 2077: Director's Commentary
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm max-w-sm leading-relaxed">
                    Join the creators for a live deep-dive into the making of
                    this year's biggest noir thriller.
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mt-2">
                  <div className="bg-background/60 backdrop-blur-md rounded-lg p-2.5 border border-border">
                    <span className="text-[9px] text-muted-foreground block uppercase mb-0.5 font-medium">
                      Starts In
                    </span>
                    <span className="text-lg font-mono font-bold text-primary">
                      02:45:12
                    </span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 h-12 text-sm font-semibold transition-all">
                    Notify Me
                  </Button>
                </div>
              </div>

              {/* Inset Thumbnail */}
              <div className="hidden md:block absolute bottom-6 right-6 w-28 h-16 rounded-md overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=500&auto=format&fit=crop"
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Stacked Cards */}
          <div className="md:col-span-4 flex flex-col gap-5">
            {/* Sports Card */}
            <Card className="flex-1 bg-card border-border rounded-2xl relative overflow-hidden group cursor-pointer min-h-[150px]">
              <CardContent className="p-5 h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-40 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Trophy className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      Sports
                    </span>
                  </div>
                  <h3 className="text-frontground/90 font-semibold mb-1">
                    Urban Street Skateboard Finals
                  </h3>
                  <p className="text-muted-foreground text-[11px]">
                    Live from LA • Tonight 8PM
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-3">
                  <div className="flex -space-x-1.5">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-background bg-accent overflow-hidden"
                      >
                        <div className="w-full h-full opacity-50 bg-muted-foreground" />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[7px] font-bold text-primary-foreground">
                      +12k
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Cinema Card */}
            <Card className="flex-1 bg-card border-border rounded-2xl relative overflow-hidden group min-h-[150px]">
              <CardContent className="p-5 h-full flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-40 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Film className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      Cinema
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-1">
                    Retro Cinema: Noir Classics
                  </h3>
                  <p className="text-muted-foreground text-[11px]">
                    Curated Selection • Weekend Only
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-3">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-none px-2 py-0.5 text-[9px] font-bold uppercase">
                    24H Event
                  </Badge>
                  <Bookmark className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
