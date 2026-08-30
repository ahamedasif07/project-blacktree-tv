"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export const VerifyOtpForm = () => {
  const router = useRouter();
  const [otp, setOtp] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    toast.success("Verification successful!");
    router.push("/");
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] lg:max-w-[480px] border border-white/10 bg-zinc-950/85 backdrop-blur-2xl text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl p-3 sm:p-5 transition-all duration-300">
        <CardHeader className="space-y-3 pb-6 pt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600/20 to-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <ShieldCheck className="h-7 w-7 text-red-500" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Verify Security Code
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
              Enter the 6-digit verification code.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-6 flex flex-col items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2 sm:gap-2.5 flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={cn(
                      "w-11 h-13 sm:w-12 sm:h-14 rounded-xl border border-white/15 bg-zinc-900/80 text-xl font-bold text-white transition-all duration-300",
                      "data-[active=true]:border-red-500 data-[active=true]:ring-2 data-[active=true]:ring-red-500/20 data-[active=true]:scale-105"
                    )}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button
              type="submit"
              disabled={otp.length !== 6}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              Verify & Continue
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-4 pt-2">
          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
