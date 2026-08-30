"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ZCAuthRegister, ZTAuthRegister } from "@/types/zod/auth";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signUp, isSigningUp } = useAuth();

  const form = useForm<ZTAuthRegister>({
    resolver: zodResolver(ZCAuthRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ZTAuthRegister) => {
    try {
      signUp(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleSocialLogin = (provider: "google" | "facebook") => {
    toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} registration will be available soon`);
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] lg:max-w-[480px] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-3xl p-2 sm:p-4 transition-all duration-300">
        <CardHeader className="space-y-3 pb-6 pt-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600/20 to-red-500/10 border border-red-500/30 shadow-[0_0_20px_rgba(229,9,20,0.2)]">
            <Sparkles className="h-7 w-7 text-red-500" />
          </div>

          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Create Account
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1">
              Join BlackTree TV for limitless entertainment.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...form.register("name")}
                  type="text"
                  placeholder="e.g. Asif Ahmed"
                  className="h-12 pl-10 pr-4 rounded-xl border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
              </div>
              {form.formState.errors.name && (
                <p className="text-xs text-red-400 mt-1 font-medium">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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

            {/* Terms notice */}
            <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/terms-conditions" className="text-zinc-300 underline hover:text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-zinc-300 underline hover:text-white">
                Privacy Policy
              </Link>.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSigningUp}
              className="h-12 w-full mt-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Free Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="grow border-t border-white/10" />
            <span className="mx-4 shrink text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Or sign up with
            </span>
            <div className="grow border-t border-white/10" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="h-11 rounded-xl border-white/10 bg-zinc-900/40 text-xs font-medium text-zinc-300 hover:bg-zinc-800/80 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("facebook")}
              className="h-11 rounded-xl border-white/10 bg-zinc-900/40 text-xs font-medium text-zinc-300 hover:bg-zinc-800/80 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              <svg className="mr-2 h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-zinc-400 pt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-red-500 hover:text-red-400 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
