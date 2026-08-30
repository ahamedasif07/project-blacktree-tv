"use client";

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Film,
  Play,
  ArrowRight,
  ShieldCheck,
  Award,
  Flame,
  CheckCircle2,
  Tv,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  aboutStats,
  coreFeatures,
  stars,
  technicalFeatures,
  timelineMilestones,
} from "@/constants/about";

const AboutSection = () => {
  return (
    <div className="relative min-h-screen bg-[#070708] text-foreground font-sans overflow-hidden antialiased selection:bg-primary selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-primary/15 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-red-600/10 blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-amber-600/10 blur-[180px] rounded-full pointer-events-none -z-10" />

      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER SECTION                                        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/5">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>The BlackTree Television Story</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            Where Cinematic Art Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-300">
              Cultural Legacy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            We are redefining global streaming. A dedicated sanctuary built for
            uncompromising cinema, fearless storytellers, and a worldwide
            audience who demands excellence on every frame.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/movies">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider px-8 py-6 rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105">
                <Play className="w-4 h-4 mr-2 fill-current" /> Explore Cinema
              </Button>
            </Link>
            <Link href="/live">
              <Button
                variant="outline"
                className="border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm uppercase tracking-wider px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Radio className="w-4 h-4 mr-2 text-primary animate-pulse" /> Watch 24/7 Live
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Stats Row */}
        <div className="container mx-auto px-4 mt-16 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {aboutStats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-primary/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-neutral-200 mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MISSION & ORIGIN SECTION (Why We Built This Platform)       */}
      {/* ------------------------------------------------------------- */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary">
                Our Purpose & Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Built to Honor the Pure Magic of the Silver Screen
              </h2>
            </div>

            <div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed">
              <p>
                BlackTree was born from a singular obsession: the transformative
                power of storytelling. In a digital world crowded with disposable
                clips and fragmented catalogs, we engineered a dedicated haven
                where stories breathe in their fullest, uncompressed glory.
              </p>
              <p>
                From groundbreaking indie directors to Academy Award-winning
                legends, our platform brings together creators who shape the
                cultural zeitgeist. We don't merely host video files—we curate
                unforgettable cinematic journeys.
              </p>
            </div>

            {/* Checklist Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "100% Curated 4K Cinema Feeds",
                "Direct Creator Royalties Support",
                "Synchronized Multi-User Watch Rooms",
                "Uncensored Director's Cuts & Q&As",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-neutral-200 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Founder Quote Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-primary backdrop-blur-md">
              <p className="italic text-neutral-300 text-sm leading-relaxed">
                "Our mission is to ensure that authentic cultural stories receive
                the monumental stage, pristine technology, and global spotlight
                they truly deserve."
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-bold text-white uppercase tracking-wider">
                  The BlackTree Media Collective
                </span>
                <span className="text-primary font-mono font-semibold">Established 2010</span>
              </div>
            </div>
          </div>

          {/* Right Visual Banner with Glass Overlays */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl group bg-neutral-900/60">
              {/* Background Poster Image */}
              <Image
                src="https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg"
                alt="Cinematic production background"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  Live Master Broadcast
                </span>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 p-5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">
                    Master Grade Cinema
                  </span>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] uppercase font-bold">
                    4K Ultra HD • HDR10+
                  </Badge>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Uncompressed Bitrates. Theatrical Fidelity.
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  Engineered with custom edge-caching and adaptive resolution for
                  instant playback without buffering.
                </p>
              </div>
            </div>

            {/* Decorative Ambient Under-Glow */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 blur-3xl rounded-full pointer-events-none -z-10" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE PILLARS & FEATURES (Interactive Grid)                 */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-y border-white/5 bg-white/[0.01] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary">
              What Sets Us Apart
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Core Pillars of BlackTree TV
            </h2>
            <p className="text-sm md:text-base text-neutral-400">
              Designed from the ground up for seamless streaming, community
              engagement, and cinematic discovery.
            </p>
          </div>

          {/* 6-Grid Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-primary/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Tag */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/25 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <Badge
                        variant="outline"
                        className="border-white/10 text-neutral-400 text-[10px] uppercase tracking-wider font-semibold group-hover:border-primary/40 group-hover:text-primary transition-colors"
                      >
                        {feat.tag}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Hover Indicator */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. STORIES BEHIND THE STARS & CREATORS                         */}
      {/* ------------------------------------------------------------- */}
      <section className="container mx-auto px-4 py-20 md:py-28 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary">
              Faces of the Movement
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Stories Behind the Stars
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Meet the visionary actors, directors, and cinematographers
              bringing raw stories to life exclusively on BlackTree TV.
            </p>
          </div>

          <Link href="/actors">
            <Button
              variant="outline"
              className="border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider px-6 py-5 rounded-xl transition-all self-start md:self-auto"
            >
              View All Featured Talent <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* 3-Column Creator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stars.map((star, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/60 shadow-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Star Portrait Image */}
              <Image
                src={star.img}
                alt={star.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108 filter brightness-95"
              />

              {/* Dynamic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Award Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-black/70 border border-white/15 text-white/90 text-[10px] uppercase tracking-wider font-semibold backdrop-blur-md">
                  <Award className="w-3 h-3 text-amber-400 mr-1.5" />
                  {star.awards}
                </Badge>
              </div>

              {/* Bottom Details Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  {star.role}
                </p>
                <h3 className="text-2xl font-bold text-white">{star.name}</h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  "{star.tagline}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. TIMELINE JOURNEY / HERITAGE MILESTONES                     */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 md:py-28 border-t border-white/5 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              From Festival Roots to Global Network
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {timelineMilestones.map((m, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/40 backdrop-blur-md space-y-3 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-block px-3 py-1 rounded-md bg-primary text-white text-xs font-mono font-bold">
                  {m.year}
                </div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. TECHNICAL ARCHITECTURE & PERFORMANCE                       */}
      {/* ------------------------------------------------------------- */}
      <section className="container mx-auto px-4 py-20 md:py-24 max-w-6xl border-t border-white/5">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-primary">
            Engineering Precision
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Smooth. Reliable.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              Cinematic.
            </span>
          </h2>
          <p className="text-sm text-neutral-400">
            A state-of-the-art streaming infrastructure engineered for
            unmatched clarity, speed, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalFeatures.map((tech, idx) => {
            const TechIcon = tech.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all space-y-3 text-center flex flex-col items-center"
              >
                <div className="p-3 rounded-xl bg-white/5 text-primary border border-white/10">
                  <TechIcon className="w-5 h-5 stroke-2" />
                </div>
                <h4 className="text-sm font-bold text-white">{tech.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. HIGH IMPACT CALL TO ACTION (Join The Experience)           */}
      {/* ------------------------------------------------------------- */}
      <section className="container mx-auto px-4 pb-24 pt-8 max-w-5xl">
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-white/15 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 shadow-2xl overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/25 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-orange-600/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-xs uppercase tracking-widest font-bold">
              Ready For Pure Cinema?
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Join Millions of Movie Buffs on BlackTree TV
            </h2>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              Unlock our full library of 4K cinematic masterworks, 24/7 live
              channels, and exclusive creator retrospectives today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/checkout/premium-4k-hdr" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-sm uppercase tracking-wider px-8 py-6 rounded-xl shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105">
                  Get Started Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/subscription" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider px-8 py-6 rounded-xl transition-all duration-300"
                >
                  Explore Membership Plans
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Instant Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Cancel Anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Stream Anywhere
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
