"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ZCAuthForgotPassword, ZTAuthForgotPassword } from "@/types/zod/auth";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { forgotPassword, isForgotPasswordPending } = useAuth();

  const form = useForm<ZTAuthForgotPassword>({
    resolver: zodResolver(ZCAuthForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ZTAuthForgotPassword) => {
    try {
      await forgotPassword(data);
      toast.success("Verification code sent to your email!");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&flow=reset-password`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] lg:max-w-[480px] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl p-2 sm:p-4 transition-all duration-300">
        <CardHeader className="space-y-3 pb-6 pt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600/20 to-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <KeyRound className="h-7 w-7 text-red-500" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
              Enter your registered email address and we&apos;ll send you a recovery code.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 pl-10 pr-4 rounded-xl border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isForgotPasswordPending}
              className="h-12 w-full mt-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isForgotPasswordPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending Recovery Code...</span>
                </>
              ) : (
                "Send Recovery Code"
              )}
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
