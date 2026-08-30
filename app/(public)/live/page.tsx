import React from "react";
import { LivePlayer } from "./_components/live-player";
import TrendingSlider from "./_components/trending-slider";
import UpcomingEvents from "./_components/upcoming-events";

const Live = () => {
  return (
    <div className="mt-22">
      <LivePlayer />
      <TrendingSlider />
      <UpcomingEvents />
    </div>
  );
};

export default Live;
