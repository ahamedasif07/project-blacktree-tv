/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { coreFeatures, stars, technicalFeatures } from "@/constants/about";

const AboutSection = () => {
  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] mt-10 antialiased font-sans overflow-hidden">
      {/* 1. Why We Built This Platform Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-primary after:mt-3">
              Why We Built This Platform
            </h2>
            <div className="space-y-4 text-neutral-400 text-sm md:text-base leading-relaxed font-normal">
              <p>
                Blacktree was born from a singular obsession: the magic of the
                theater. We believe that every story deserves to be told in its
                purest form, without compromise. In an era of fragmented
                streaming, we created a sanctuary for storytelling—a place where
                the frame vanishes and the film breathes.
              </p>
              <p>
                Our platform isn't just about watching; it's about witnessing.
                By bridging the gap between global creators and a discerning
                audience, we've built more than a service—we've built a legacy
                for the screen.
              </p>
            </div>
          </div>

          {/* Right Side: Director Chair & Asset Image Placeholder */}
          <div className="relative w-full h-100  group md:h-137.5 md:aspect-square flex justify-center items-center bg-linear-to-b from-neutral-900/40 to-transparent rounded-2xl border border-neutral-800/20 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

            <div
              className="w-full h-full bg-cover grayscale group-hover:grayscale-50 transition-all duration-300 ease-in-out bg-center bg-no-repeat opacity-80"
              style={{
                backgroundImage: "url('/assets/images/about-baner.png')",
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. 6-Grid Core Features */}
      <section className="border-t border-neutral-900 bg-black/20 py-16">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6 text-center">
            {coreFeatures.map((feat, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-3 group"
              >
                <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/40 text-primary group-hover:scale-105 transition-transform duration-300">
                  <feat.icon className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 max-w-35 mx-auto leading-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stories Behind the Stars */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="space-y-3 mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Stories Behind the Stars
          </h2>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Exclusive interviews and raw, behind-the-scenes insights into the
            lives of your favorite actors.
          </p>
        </div>

        {/* 3 Column Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stars.map((star, index) => (
            <div
              key={index}
              className="relative aspect-3/4 rounded-2xl overflow-hidden border border-neutral-800/50 group bg-neutral-900/40"
            >
              {/* Image Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center filter  contrast-125 group-hover:scale-102 transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${star.img})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

              {/* Hover Content placeholder (If needed) */}
              <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white font-bold text-lg">{star.name}</h4>
                <p className="text-primary text-xs uppercase tracking-wider font-semibold">
                  {star.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Smooth. Reliable. Cinematic. Technical Features */}
      <section className="container mx-auto px-4 py-12  text-center border-t border-neutral-900">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-400 tracking-wide mb-12">
          Smooth. Reliable.{" "}
          <span className="text-primary font-semibold">Cinematic.</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          {technicalFeatures.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-3 px-4"
            >
              <tech.icon className="w-5 h-5 text-primary stroke-2" />
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {tech.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom Ready to Box Card CTA */}
      <section className="container mx-auto px-4 pb-20 pt-12">
        <div className="bg-[#121212] border border-neutral-800/60 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -inset-24 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Ready to be part of the experience?
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
              Join Blacktree Media today and unlock a global library of
              storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Link
                href="/checkout/premium-4k-hdr"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-md transition-all duration-200">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/subscription" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-900 font-bold text-xs uppercase tracking-wider px-8 py-5 rounded-md transition-all duration-200"
                >
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
