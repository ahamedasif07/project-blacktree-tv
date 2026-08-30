'use client';

import { useState, useMemo } from 'react';
import { Movie } from '../types/movie.types';

export const useMovieFilters = (movies: Movie[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, selectedGenre]);

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    filteredMovies,
  };
};
