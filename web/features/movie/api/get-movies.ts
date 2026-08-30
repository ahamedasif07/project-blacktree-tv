import axios from "axios";
import { Movie } from "../types/movie.types";

// Replace with your actual API endpoint or use a centralized axios instance from @/lib/axios
export const getMovies = async (): Promise<Movie[]> => {
  const { data } = await axios.get("/api/movies");
  return data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const { data } = await axios.get(`/api/movies/${id}`);
  return data;
};
