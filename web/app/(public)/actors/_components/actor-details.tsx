"use client";

import React from "react";
import Image from "next/image";
import { Plus, Share2 } from "lucide-react";
// shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { FEATURED_ACTORS } from "@/constants/actors";

const SingleActor = () => {
  const params = useParams();
  const slug = params.slug;

  const actor = FEATURED_ACTORS.find((a) => a.slug === slug);

  if (!actor) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Actor Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="bg-background text-foreground pt-32  px-4  lg:px-0  selection:bg-primary/30 font-sans">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Profile Image Section */}
          <div className="relative w-full lg:w-[450px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border/10">
            <Image
              src={actor.image}
              alt={actor.name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col">
            <div className="mb-8">
              <span className="text-primary text-[14px] uppercase mb-3 block font-medium">
                Featured Talent
              </span>
              <h1 className="text-5xl font-semibold tracking-tighter uppercase leading-none mb-6">
                {actor.name}
              </h1>
              <p className="text-foreground/70 text-[16px] leading-relaxed max-w-2xl">
                {actor.shortDesc}
              </p>
            </div>

            {/* Premium Details Card - Using shadcn Card */}
            <Card className="relative bg-card border-border/10 p-10 mb-12 overflow-hidden shadow-2xl rounded-2xl">
              {/* Subtle gradient glow using OKLCH primary */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] pointer-events-none" />

              <CardContent className="p-0 relative">
                <div className="flex items-center gap-3 mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                    Professional Background
                  </span>
                  <Separator className="flex-1 bg-border/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {/* Detail Item: Born */}
                  <div className="group transition-all duration-300">
                    <p className="text-[12px] uppercase text-primary font-black mb-3 group-hover:translate-x-1 transition-transform">
                      Born
                    </p>
                    <p className="text-base text-foreground font-light tracking-wide leading-snug">
                      {actor.details.born}
                    </p>
                  </div>

                  {/* Detail Item: Awards */}
                  <div className="group transition-all duration-300 md:border-l md:border-border/20 md:pl-8">
                    <p className="text-[12px] uppercase text-primary font-black mb-3 group-hover:translate-x-1 transition-transform">
                      Major Awards
                    </p>
                    <p className="text-base text-foreground font-light tracking-wide leading-snug">
                      {actor.details.awards}
                    </p>
                  </div>

                  {/* Detail Item: Training */}
                  <div className="group transition-all duration-300 md:border-l md:border-border/20 md:pl-8">
                    <p className="text-[12px] uppercase text-primary font-black mb-3 group-hover:translate-x-1 transition-transform">
                      Training
                    </p>
                    <p className="text-base text-foreground font-light tracking-wide leading-snug">
                      {actor.details.training}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Using shadcn Button */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 rounded-full font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                <Plus className="mr-2 h-5 w-5" strokeWidth={3} /> Follow
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-card/5 hover:bg-accent hover:text-accent-foreground px-10 py-7 rounded-full font-bold uppercase tracking-[0.1em] backdrop-blur-sm transition-all"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="mt-18 container mx-auto px-0">
          <div className="flex items-center gap-4 mb-10">
            <Separator
              orientation="vertical"
              className="h-10 w-[4px] bg-primary rounded-full"
            />
            <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">
              Biography
            </h2>
          </div>
          <div className="space-y-8 text-foreground/70 leading-relaxed text-lg font-light">
            {actor.bio.map((para, index) => (
              <p
                key={index}
                className={`text-[16px] ${
                  index === 0
                    ? "first-letter:text-4xl first-letter:font-bold first-letter:text-foreground first-letter:mr-1"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleActor;
