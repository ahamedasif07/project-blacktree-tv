import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface InterviewCardProps {
  interview: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    category: string;
  };
}

export function InterviewCard({ interview }: InterviewCardProps) {
  const isHighAlert =
    interview.category === "Exclusive" || interview.category === "Live";

  return (
    <Card className="group cursor-pointer border-none bg-transparent shadow-none">
      {/* Image Container */}
      <CardHeader className="relative p-0 aspect-video overflow-hidden rounded-[var(--radius)] border border-border bg-card">
        {/* Category Badge */}
        <div className="absolute left-3 top-3 z-20">
          <Badge
            className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm transition-colors ${
              isHighAlert
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {interview.category === "Live" && (
              <span className="mr-1 h-1 w-1 rounded-full bg-white animate-pulse" />
            )}
            {interview.category}
          </Badge>
        </div>

        {/* Thumbnail with Professional Scale Effect */}
        <Image
          src={interview.thumbnail}
          alt={interview.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={interview.id < 4} // Priority loading for first row
        />

        {/* Duration Overlay */}
        <div className="absolute bottom-2 right-2 rounded bg-background/80 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-foreground border border-border/50">
          {interview.duration}
        </div>

        {/* Subtle Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardHeader>

      {/* Content Area */}
      <CardContent className="p-0 pt-3 space-y-1.5">
        <h3 className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary line-clamp-1">
          {interview.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-medium">
          {interview.description}
        </p>
      </CardContent>
    </Card>
  );
}
