"use client";
import React, { useState } from "react";

// --- MOCK SCHEDULE DATA ---
const SCHEDULE_DATA = [
  {
    id: 1,
    time: "09:00 - 10:30",
    title: "Morning Classics",
    subtitle: "Live from Berlin Philharmonic",
  },
  {
    id: 2,
    time: "11:00 - 12:30",
    title: "Jazz Sessions",
    subtitle: "Blue Note Collective",
  },
  {
    id: 3,
    time: "13:00 - 14:30",
    title: "Documentary Hour",
    subtitle: "Urban Architecture Series",
  },
  {
    id: 4,
    time: "15:00 - 16:30",
    title: "Global Beats",
    subtitle: "Electronic Live Mix",
  },
];

const ProgramSchedule = () => {
  // Manage active clicked state dynamically
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-12 font-sans selection:bg-red-600 selection:text-white">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          {/* Rounded Left Pill Bar */}
          <span className="w-1.25 h-6 bg-red-600 rounded-r-full block" />
          <h2 className="text-2xl  font-semibold tracking-wide text-neutral-200">
            Program Schedule
          </h2>
        </div>

        {/* Schedule Grid Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCHEDULE_DATA.map((program) => {
            const isActive = activeId === program.id;

            return (
              <div
                key={program.id}
                onClick={() => setActiveId(program.id)}
                className={`relative p-6 min-h-35 flex flex-col justify-center transition-all duration-300 group cursor-pointer select-none
                  ${
                    isActive
                      ? "bg-linear-to-br from-neutral-900/40 to-neutral-950/20"
                      : "bg-[#0d0d0d]/20 hover:bg-[#121212]/30"
                  }`}
              >
                {/* --- PIXEL PERFECT BORDERS (ONLY TOP & LEFT FOR ACTIVE CARD) --- */}
                {isActive && (
                  <>
                    {/* Top Accent Border Line */}
                    <span className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-10" />
                    {/* Left Accent Border Line */}
                    <span className="absolute top-0 bottom-0 left-0 w-0.75 bg-red-600 z-10" />
                  </>
                )}

                {/* Content Canvas */}
                <div className="space-y-2">
                  {/* Time Indicator Slot */}
                  <p
                    className={`text-xs font-semibold tracking-wider font-mono transition-colors
                      ${isActive ? "text-red-500" : "text-neutral-500 group-hover:text-neutral-400"}`}
                  >
                    {program.time}
                  </p>

                  {/* Show Title */}
                  <h3
                    className={`text-lg font-medium tracking-tight transition-colors
                      ${isActive ? "text-neutral-100" : "text-neutral-400 group-hover:text-neutral-200"}`}
                  >
                    {program.title}
                  </h3>

                  {/* Meta Subtext */}
                  <p className="text-xs text-neutral-600 font-normal tracking-wide truncate group-hover:text-neutral-500 transition-colors">
                    {program.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramSchedule;
