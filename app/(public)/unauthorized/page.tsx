import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowRight, Home } from "lucide-react";
import authBg from "../../../public/assets/images/auth-bg.png";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-primary/30">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src={authBg}
          alt="background"
          fill
          className="object-cover opacity-20 sepia-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-primary/5" />
      </div>

      {/* Decorative Glows */}
      <div className="fixed right-[-5%] top-[-5%] h-125 w-125 rounded-full bg-orange-950/10 blur-[120px] pointer-events-none z-1" />
      <div className="fixed left-[-5%] bottom-[-5%] h-125 w-125 rounded-full bg-primary/5 blur-[120px] pointer-events-none z-1" />

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-8 md:p-16 backdrop-blur-2xl shadow-2xl">
          {/* Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-primary rounded-b-full shadow-[0_0_20px_rgba(229,9,20,0.5)]" />

          <div className="flex flex-col items-center text-center">
            {/* Security Header */}
            <div className="mb-10 text-[10px] font-black uppercase tracking-[0.8em] text-zinc-500">
              Access Restricted // 403
            </div>

            <div className="relative mb-10">
              <div className="h-20 w-20 md:h-24 md:w-24 bg-[#141414] border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-xl">
                <Lock className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                Restricted Content
              </h1>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed max-w-100 mx-auto font-medium">
                This screening is exclusive to our premium subscribers. Please
                authenticate to continue your experience.
              </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <Button
                asChild
                className="w-full sm:w-auto h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_50px_rgba(229,9,20,0.4)]"
              >
                <Link href="/login" className="flex items-center gap-3">
                  Unlock Access
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Link
                href="/"
                className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest transition-all hover:text-white group"
              >
                <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Return to Gallery
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-white/3" />
          <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold whitespace-nowrap">
            VIP Screening Room // Final Production
          </p>
          <div className="h-px flex-1 bg-white/3" />
        </div>
      </div>
    </div>
  );
}
