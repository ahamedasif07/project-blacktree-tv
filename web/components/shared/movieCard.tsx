"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link"; // Link import kora hoyeche

interface Movie {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  year: number;
  duration: string;
  rating: number;
  genres: string[];
  languages: string[];
  quality: string;
  pgRating: string;
}
const MovieCard = ({ movie }: { movie: Movie }) => {
  const { slug, image, title, description } = movie;
  return (
    <Link href={`/movies/${slug}`} className="block w-full">
      <Card className="group relative overflow-hidden outline-none border-none bg-transparent shadow-none cursor-pointer w-full max-w-[350px] mx-auto p-0">
        <CardContent className="p-0">
          <div className="relative w-full rounded-[23px] overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] ">
            {/* Main Movie Image */}
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Default State: Dark Gradient Bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-100" />

            {/* Hover State: Glassy Blur Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text & Button Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-8 text-center">
              <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                {/* Movie Title */}
                <h3 className="text-[18px] text-foreground/90 mb-2 font-semibold">
                  {title}
                </h3>

                {/* Movie Description */}
                <p className="text-foreground/75 text-sm mb-4 line-clamp-2">
                  {description}
                </p>

                {/* Watch Now Button */}
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-md font-semibold rounded-xl transition-all duration-300 shadow-2xl">
                  Watch Now
                </Button>
              </div>

              {/* Default State Title (Hide on hover) */}
              <div className="absolute bottom-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-[14px] text-foreground/70 tracking-wide font-medium">
                  {title}
                </h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
