"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn, isSigningIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    try {
      await signIn({ email, password });
    } catch {
      // Error handled in hook toast
    }
  };

  // Quick 1-click fill Super Admin demo credentials
  const handleQuickFillAdmin = () => {
    setEmail("rxasif31@gmail.com");
    setPassword("RXasif@100");
    toast.info("Super Admin credentials filled!");
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
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-1">
              Sign in to stream premium movies and shows.
            </CardDescription>
          </div>

          {/* Quick Demo Super Admin Badge */}
          <button
            type="button"
            onClick={handleQuickFillAdmin}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer mx-auto"
          >
            <Sparkles className="h-3.5 w-3.5 text-red-400 animate-pulse" />
            <span>Super Admin: <b>rxasif31@gmail.com</b></span>
          </button>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rxasif31@gmail.com"
                  required
                  className="h-12 pl-10 pr-4 rounded-xl border-white/10 bg-zinc-900/60 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSigningIn}
              className="h-12 w-full mt-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold shadow-[0_0_25px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-zinc-400 pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-red-500 hover:text-red-400 hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
