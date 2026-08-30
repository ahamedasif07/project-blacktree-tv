import React from "react";
import WatchingVideo from "./_components/watching-video";
import ProgramSchedule from "./_components/program-schedule";
import MovieSlider from "@/components/shared/movie-slider";
import { FEATURED_MOVIES } from "@/constants/movies";

const VideoWatching = () => {
  return (
    <div>
      <WatchingVideo />
      <ProgramSchedule />
      <MovieSlider title="Watch later" movies={FEATURED_MOVIES} />
    </div>
  );
};

export default VideoWatching;
