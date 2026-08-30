"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import authBg from "../public/assets/images/auth-bg.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-primary/30">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src={authBg}
          alt="background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      </div>

      {/* Decorative Glows */}
      <div className="fixed right-[-5%] top-[-5%] h-125 w-125 rounded-full bg-primary/5 blur-[120px] pointer-events-none z-1" />
      <div className="fixed left-[-5%] bottom-[-5%] h-125 w-125 rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none z-1" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-8 md:p-16 backdrop-blur-2xl shadow-2xl">
          {/* Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-primary rounded-b-full shadow-[0_0_20px_rgba(229,9,20,0.5)]" />

          <div className="flex flex-col items-center text-center">
            {/* Minimalist 404 Header */}
            <div className="mb-10 text-[10px] font-black uppercase tracking-[0.8em] text-zinc-500">
              Error Code // 404
            </div>

            <div className="relative mb-12">
              <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white/5 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full max-w-50 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Scene Not Found
              </h2>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed max-w-100 mx-auto font-medium">
                The requested sequence has been omitted from the final
                production. Please return to the main selection.
              </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <Button
                asChild
                className="w-full sm:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(229,9,20,0.2)]"
              >
                <Link href="/" className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Return Home
                </Link>
              </Button>

              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest transition-all hover:text-white group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go Back
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-white/3" />
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold whitespace-nowrap">
            BlackTree TV // Final Production
          </p>
          <div className="h-px flex-1 bg-white/3" />
        </div>
      </div>
    </div>
  );
}
