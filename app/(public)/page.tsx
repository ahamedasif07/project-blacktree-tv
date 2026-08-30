import { HeroSection } from "@/components/shared/home/hero";
import LiveSchedule from "@/components/shared/home/liveSchedule";
import heroBg from "../../public/assets/images/hero-bg.png";

import { FEATURED_MOVIES } from "@/constants/movies";

import MovieSlider from "@/components/shared/movie-slider";
import ActorSlider from "@/components/shared/actor-slider";
import { FEATURED_ACTORS } from "@/constants/actors";
import SubscriptionSection from "@/components/shared/home/subscription-section";
import { ExclusiveInterview } from "@/components/shared/home/SpotlightSlider";
import { INTERVIEW_SPORTLIGHT } from "@/constants/intervirew";

export default function Home() {
  return (
    <main className="relative w-full  overflow-hidden">
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
        style={{
          backgroundImage: `url(${heroBg.src})`,
        }}
      >
        {/* Navigation Height Offset for Hero content */}
        <div className="h-16 md:h-20 w-full" />

        <HeroSection />
        <LiveSchedule />
      </div>

      <div className="bg-popover">
        <MovieSlider title="Featured Movies" movies={FEATURED_MOVIES} />
        <MovieSlider title="New Movies" movies={FEATURED_MOVIES} />
        <ExclusiveInterview items={INTERVIEW_SPORTLIGHT} />
        <ActorSlider title="Featured Actors" actors={FEATURED_ACTORS} />
        <SubscriptionSection />
      </div>
    </main>
  );
}
