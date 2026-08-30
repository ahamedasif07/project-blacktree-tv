"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ZCAuthResetPassword, ZTAuthResetPassword } from "@/types/zod/auth";

export const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";
  const otp = searchParams?.get("otp") || "";
  const { resetPassword, isResettingPassword } = useAuth();

  const form = useForm<ZTAuthResetPassword>({
    resolver: zodResolver(ZCAuthResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ZTAuthResetPassword) => {
    if (!otp) {
      toast.error("Verification code (OTP) is missing from the link");
      return;
    }
    resetPassword({ email, otp, password: data.password });
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
              Create a strong new password for your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-11 rounded-xl border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...form.register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-10 pr-11 rounded-xl border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isResettingPassword}
              className="h-12 w-full mt-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isResettingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                "Set New Password"
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
