import { useQuery } from "@tanstack/react-query";
import { getMovies, getMovieById } from "./get-movies";

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });
};
