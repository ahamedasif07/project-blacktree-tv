"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export function BrowseAlphabet() {
  const [selectedLetter, setSelectedLetter] = React.useState("#");

  return (
    <section className="w-full bg-background px-4 md:px-0  py-4">
      <div className="container mx-auto space-y-6">
        {/* Header Section */}
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl  text-foreground font-semibold uppercase ">
              BROWSE <span className="text-primary">A-Z</span>
            </h2>
          </div>
        </header>

        {/* <Separator className="bg-border" /> */}

        {/* Alphabet Navigation */}
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <nav className="flex justify-around  space-x-2">
            {ALPHABET.map((letter) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "secondary"}
                onClick={() => setSelectedLetter(letter)}
                className={cn(
                  "h-10 w-10 p-0 font-bold uppercase border transition-all",
                  selectedLetter !== letter &&
                    "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border-none",
                )}
              >
                {letter}
              </Button>
            ))}
          </nav>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </section>
  );
}
