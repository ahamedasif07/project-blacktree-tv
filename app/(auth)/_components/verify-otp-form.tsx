"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { ZCAuthVerifyOtp, ZTAuthVerifyOtp } from "@/types/zod/auth";

export const VerifyOtpForm = () => {
  const [timeLeft, setTimeLeft] = React.useState(114); // 01:54 in seconds
  const [spinAngle, setSpinAngle] = React.useState(0);

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
    setSpinAngle((prev) => prev + 360);
    if (!email) {
      toast.error("Email address is missing");
      return;
    }

    if (flow === "login") {
      try {
        const stored = sessionStorage.getItem("temp_login_credentials");
        if (stored) {
          const { email: storedEmail, password } = JSON.parse(stored);
          await signInInitiate({ email: storedEmail, password });
          toast.success("OTP code resent successfully!");
          setTimeLeft(114);
        } else {
          toast.error("Session expired. Please log in again.");
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
      }
    } else if (flow === "signup") {
      resendOtp({ email, type: "email-verification" }, {
        onSuccess: () => setTimeLeft(114)
      });
    } else if (flow === "reset-password") {
      resendOtp({ email, type: "forget-password" }, {
        onSuccess: () => setTimeLeft(114)
      });
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
        signInVerify({ email: storedEmail, password, otp: data.otp, rememberMe }, {
          onSuccess: () => {
            sessionStorage.removeItem("temp_login_credentials");
          }
        });
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
    <div className="w-full flex flex-col items-center justify-center px-4 gap-8">
      <Card className="w-full max-w-[440px] md:max-w-[500px] lg:max-w-[586px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl px-2 md:px-4">
        <CardHeader className="space-y-3 pb-6 pt-10 flex flex-col items-center">
          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-1">
            <Lock className="h-7 w-7 text-red-500" />
          </div>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Security Verification
          </CardTitle>
          <CardDescription className="text-center text-sm text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
            Enter the 6-digit code sent to <br />
            <span className="text-zinc-200 font-medium">{email || "your email"}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 flex flex-col items-center"
          >
            <Controller
              name="otp"
              control={form.control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="gap-2 flex items-center justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={cn(
                          "w-10 h-12 md:w-12 md:h-14 rounded-lg border border-[#FFFFFF1A] bg-[#0F0F0F] text-xl font-bold text-white transition-all duration-300",
                          "data-[active=true]:border-red-500 data-[active=true]:ring-1 data-[active=true]:ring-red-500",
                          "border-l border-y border-r last:border-r",
                        )}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <Timer className="h-4 w-4" />
              Code expires in{" "}
              <span className="text-red-500 ml-1 tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={otpValue?.length !== 6 || isPending}
              className="h-12 w-full rounded-lg bg-primary text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] cursor-pointer duration-300 ease-in-out hover:scale-101 flex items-center justify-center gap-2"
            >
              {isPending ? "Verifying..." : "Verify & Access"}
            </Button>
          </form>

          <div className="text-center space-y-3 pb-8">
            <p className="text-[13px] text-zinc-500">
              Didn&apos;t receive the code?
            </p>
            <Button
              type="button"
              variant="ghost"
              className="text-xs  font-medium uppercase hover:bg-none  text-white  cursor-pointer border-b  pb-1"
              onClick={handleResend}
            >
              <ImSpinner9
                size={20}
                className="text-red-500 transition-transform duration-500 ease-in-out"
                style={{ transform: `rotate(${spinAngle}deg)` }}
              />
              Resend Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Link
        href="/login"
        className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest transition-all hover:text-white group duration-300 ease-in-out hover:scale-101"
      >
        <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>
    </div>
  );
};
