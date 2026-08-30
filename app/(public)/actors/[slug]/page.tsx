import React from "react";
import SingleActor from "../_components/actor-details";
import MovieSlider from "@/components/shared/movie-slider";
import { FEATURED_MOVIES } from "@/constants/movies";
import InterviewSlider from "../../interviews/_components/interview-slider";
import { ALL_INTERVIEWS } from "@/constants/intervirew";

const ActorDetails = () => {
  return (
    <div>
      <SingleActor />
      <MovieSlider title="Filmography" movies={FEATURED_MOVIES} />
      <InterviewSlider
        title="Exclusive Interviews"
        interviews={ALL_INTERVIEWS}
      />
    </div>
  );
};

export default ActorDetails;
