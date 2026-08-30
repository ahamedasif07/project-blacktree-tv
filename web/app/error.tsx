"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import authBg from "../public/assets/images/auth-bg.png";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-primary/30">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src={authBg}
          alt="background"
          fill
          className="object-cover opacity-30 grayscale blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      {/* Decorative Glows */}
      <div className="fixed right-[-5%] top-[-5%] h-125 w-125 rounded-full bg-red-950/10 blur-[120px] pointer-events-none z-1" />
      <div className="fixed left-[-5%] bottom-[-5%] h-125 w-125 rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none z-1" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-red-500/10 bg-white/2 p-8 md:p-16 backdrop-blur-2xl shadow-2xl">
          {/* Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-red-600 rounded-b-full shadow-[0_0_20px_rgba(220,38,38,0.5)]" />

          <div className="flex flex-col items-center text-center">
            {/* Technical Header */}
            <div className="mb-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <div className="text-[10px] font-black uppercase tracking-[0.8em] text-red-500/80">
                System Error // 500
              </div>
            </div>

            <div className="relative mb-10">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white/90">
                Transmission Interrupted
              </h1>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed max-w-100 mx-auto font-medium">
                The content stream has been destabilized. Our technical
                operations team is investigating the interference.
              </p>
              {error.digest && (
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    Ref: {error.digest}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <Button
                onClick={() => reset()}
                className="w-full sm:w-auto h-14 px-10 bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reconnect
              </Button>

              <Link
                href="/"
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest transition-all hover:text-white group"
              >
                <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Emergency Exit
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-white/3" />
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold whitespace-nowrap">
            Technical Operations Center // Final Production
          </p>
          <div className="h-px flex-1 bg-white/3" />
        </div>
      </div>
    </div>
  );
}
