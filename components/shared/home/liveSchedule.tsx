import React from "react";
import Image from "next/image";
import { SendHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SCHEDULE_DATA = {
  nowPlaying: {
    title: "Beyond Thr Story",
    episode: "Episode 4: Finding Home",
    time: "12:PM - 12:30 PM",
    image: "/assets/images/Rectangle 13.png",
  },
  upNext: {
    title: "The Culture Code",
    time: "12:30 PM - 1:00 PM",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop",
  },
  requests: [
    {
      id: 1,
      name: "Legend Of The Game",
      percentage: 89,
      image: "/assets/images/Rectangle 14.png",
    },
    {
      id: 2,
      name: "Black Excellence",
      percentage: 78,
      image:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=200&auto=format&fit=crop",
    },
  ],
};

const LiveSchedule = () => {
  return (
    <section className="w-full px-4  py-8">
      <Card className="container mx-auto p-0 border-none shadow-none bg-card rounded-xl overflow-hidden">
        <CardContent className="p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Section 1: NOW PLAYING */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center lg:pr-8">
            <CardTitle className="text-primary font-bold text-[15px] uppercase  mb-4">
              Now Playing
            </CardTitle>
            <div className="flex gap-4 items-center">
              <div className="relative flex-shrink-0 w-36 h-24 rounded-lg overflow-hidden border border-border shadow-sm">
                <Image
                  src={SCHEDULE_DATA.nowPlaying.image}
                  alt={SCHEDULE_DATA.nowPlaying.title}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold leading-tight">
                  {SCHEDULE_DATA.nowPlaying.title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {SCHEDULE_DATA.nowPlaying.episode}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-muted-foreground text-xs font-mono">
                    {SCHEDULE_DATA.nowPlaying.time}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-primary border-primary/50 bg-primary/10 px-2 py-0 h-5 text-[10px] uppercase font-bold"
                  >
                    Live
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Separator 1 (Visible only on Desktop) */}
          <Separator
            orientation="vertical"
            className="hidden lg:block h-40 bg-border mx-2"
          />

          {/* Section 2: UP NEXT */}
          <div className="w-full lg:w-[30%] flex flex-col justify-center lg:px-8">
            <h2 className="text-muted-foreground font-bold text-[15px] uppercase  mb-4">
              Up Next
            </h2>
            <div className="flex gap-4 items-center">
              <div className="relative flex-shrink-0 w-36 h-24 rounded-lg overflow-hidden border border-border shadow-sm">
                <Image
                  src={SCHEDULE_DATA.upNext.image}
                  alt={SCHEDULE_DATA.upNext.title}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold leading-tight">
                  {SCHEDULE_DATA.upNext.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 font-mono uppercase tracking-tighter">
                  {SCHEDULE_DATA.upNext.time}
                </p>
              </div>
            </div>
          </div>

          {/* Separator 2 (Visible only on Desktop) */}
          <Separator
            orientation="vertical"
            className="hidden lg:block h-40 bg-border mx-2"
          />

          {/* Section 3: REQUEST FOR NEXT MOVIE */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center lg:pl-8 space-y-4">
            <h2 className="text-muted-foreground font-bold text-[15px] uppercase ">
              Request For Next Movie
            </h2>

            <div className="space-y-3">
              {SCHEDULE_DATA.requests.map((movie) => (
                <div key={movie.id} className="flex items-center gap-3">
                  <div className="relative w-14 h-9 rounded overflow-hidden flex-shrink-0 border border-border">
                    <Image
                      src={movie.image}
                      alt={movie.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] mb-1 font-bold">
                      <span className="text-foreground/80 uppercase tracking-tight">
                        {movie.name}
                      </span>
                      <span className="text-muted-foreground">
                        {movie.percentage}%
                      </span>
                    </div>
                    <Progress
                      value={movie.percentage}
                      className="h-1 bg-border [&>div]:bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative group pt-1">
              <Input
                type="text"
                placeholder="Type Here..."
                className="w-full bg-background border-border rounded-md py-4 pr-10 ted:text-mu5ed-foreground  focus-visible:ring-primary/20"
              />
              <SendHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LiveSchedule;
