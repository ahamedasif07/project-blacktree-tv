"use client";

import * as React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, RotateCw, ShieldCheck, Timer } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ZCAuthVerifyOtp, ZTAuthVerifyOtp } from "@/types/zod/auth";

export const VerifyOtpForm = () => {
  const [timeLeft, setTimeLeft] = React.useState(120); // 2 minutes countdown
  const [isResending, setIsResending] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const flow = searchParams?.get("flow") || ""; // 'signup' | 'login' | 'reset-password'

  const {
    signInVerify,
    isSigningInVerify,
    verifyEmailOtp,
    isVerifyingEmailOtp,
    verifyResetOtp,
    isVerifyingResetOtp,
    signInInitiate,
    resendOtp,
  } = useAuth();

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing");
      return;
    }

    setIsResending(true);
    try {
      if (flow === "login") {
        const stored = sessionStorage.getItem("temp_login_credentials");
        if (stored) {
          const { email: storedEmail, password } = JSON.parse(stored);
          await signInInitiate({ email: storedEmail, password });
          toast.success("Verification code resent successfully!");
          setTimeLeft(120);
        } else {
          toast.error("Session expired. Please sign in again.");
          router.push("/login");
        }
      } else if (flow === "signup") {
        resendOtp(
          { email, type: "email-verification" },
          {
            onSuccess: () => {
              setTimeLeft(120);
            },
          }
        );
      } else if (flow === "reset-password") {
        resendOtp(
          { email, type: "forget-password" },
          {
            onSuccess: () => {
              setTimeLeft(120);
            },
          }
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const form = useForm<ZTAuthVerifyOtp>({
    resolver: zodResolver(ZCAuthVerifyOtp),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = useWatch({
    control: form.control,
    name: "otp",
  });

  const isPending = isSigningInVerify || isVerifyingEmailOtp || isVerifyingResetOtp;

  function onSubmit(data: ZTAuthVerifyOtp) {
    if (!email) {
      toast.error("Email address is missing");
      return;
    }

    if (flow === "signup") {
      verifyEmailOtp({ email, otp: data.otp });
    } else if (flow === "login") {
      const stored = sessionStorage.getItem("temp_login_credentials");
      if (stored) {
        const { email: storedEmail, password, rememberMe } = JSON.parse(stored);
        signInVerify(
          { email: storedEmail, password, otp: data.otp, rememberMe },
          {
            onSuccess: () => {
              sessionStorage.removeItem("temp_login_credentials");
            },
          }
        );
      } else {
        toast.error("Login session expired. Please sign in again.");
        router.push("/login");
      }
    } else if (flow === "reset-password") {
      verifyResetOtp({ email, otp: data.otp });
    } else {
      toast.error("Invalid verification flow");
    }
  }

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] lg:max-w-[480px] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl p-2 sm:p-4 transition-all duration-300">
        <CardHeader className="space-y-3 pb-6 pt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600/20 to-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <ShieldCheck className="h-7 w-7 text-red-500" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Verify Security Code
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
              Enter the 6-digit code sent to <br />
              <span className="text-zinc-200 font-semibold">{email || "your email address"}</span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 flex flex-col items-center">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col items-center">
            <Controller
              name="otp"
              control={form.control}
              render={({ field }) => (
                <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
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
              )}
            />

            {/* Expiration Timer */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <Timer className="h-4 w-4 text-zinc-500" />
              <span>Code expires in:</span>
              <span className="text-red-400 font-bold tabular-nums">{formatTime(timeLeft)}</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={otpValue?.length !== 6 || isPending}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>
          </form>

          {/* Resend Section */}
          <div className="text-center pt-2">
            <p className="text-xs text-zinc-500 mb-2">Didn&apos;t receive the code?</p>
            <button
              type="button"
              disabled={isResending || timeLeft > 90}
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 disabled:text-zinc-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <RotateCw className={cn("h-3.5 w-3.5", isResending && "animate-spin")} />
              <span>Resend Code</span>
            </button>
          </div>
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
