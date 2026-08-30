import { ExclusiveInterview } from "@/components/shared/home/SpotlightSlider";

import React from "react";
import InterviewsSection from "./_components/interviews-section";

import { INTERVIEW_SPORTLIGHT } from "@/constants/intervirew";

const Interview = () => {
  return (
    <div className="mt-22 px-4 md:px-0">
      {/* <HeroSection /> */}
      <ExclusiveInterview items={INTERVIEW_SPORTLIGHT} />
      <InterviewsSection />
    </div>
  );
};

export default Interview;
