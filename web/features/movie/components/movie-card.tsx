'use client';

import React from 'react';
import Image from 'next/image';
import { Movie } from '../types/movie.types';
import { cn } from '@/lib/utils';
import { formatDuration } from '../utils/format-duration';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  onClick?: (movie: Movie) => void;
}

/**
 * MovieCard Component - Displays a movie thumbnail with basic info
 */
export const MovieCard = ({ movie, className, onClick }: MovieCardProps) => {
  return (
    <div 
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 transition-all hover:scale-[1.02] hover:border-zinc-700", 
        className
      )}
      onClick={() => onClick?.(movie)}
    >
      <div className="aspect-[16/9] relative w-full overflow-hidden">
        <Image
          src={movie.thumbnailUrl || "/placeholder-movie.jpg"}
          alt={movie.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-bold text-white line-clamp-1">{movie.title}</h3>
          <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">
            ★ {movie.rating.toFixed(1)}
          </span>
        </div>
        
        <p className="text-xs text-zinc-400 flex items-center gap-2">
          <span>{formatDuration(movie.duration)}</span>
          <span>•</span>
          <span className="line-clamp-1">{movie.genre.join(', ')}</span>
        </p>
      </div>
    </div>
  );
};
