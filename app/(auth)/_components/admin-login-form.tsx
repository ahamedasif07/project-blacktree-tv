"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, ShieldAlert, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/auth/use-auth-store";

export const AdminLoginForm = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn, isSigningIn, logout } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      toast.error("Please enter both username/email and password");
      return;
    }

    try {
      const success = await signIn({ identifier: identifier.trim(), password });
      if (success) {
        const loggedUser = useAuthStore.getState().user;
        const role = loggedUser?.role;

        if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "MODERATOR") {
          toast.success(`Welcome ${loggedUser?.name || "Admin"}! Access Granted.`);
          router.push("/admin");
        } else {
          toast.error("Access Denied: You do not have administrator privileges.");
          await logout();
        }
      }
    } catch {
      // Error handled in store toast
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[460px] lg:max-w-[490px] border border-red-500/20 bg-zinc-950/90 backdrop-blur-2xl text-white shadow-[0_0_60px_-15px_rgba(229,9,20,0.3)] rounded-3xl p-3 sm:p-6 transition-all duration-300 relative overflow-hidden">
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        <CardHeader className="space-y-3 pb-6 pt-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600/30 to-amber-500/10 border border-red-500/40 shadow-[0_0_25px_rgba(229,9,20,0.3)]">
            <ShieldAlert className="h-8 w-8 text-red-500 animate-pulse" />
          </div>

          <div>
            <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400">
              Restricted Area
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-zinc-400 mt-1">
              Sign in with your Super Admin username or email.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username or Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Username or Email</span>
                
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter admin username or email"
                  required
                  autoComplete="username"
                  className="h-12 pl-10 pr-4 rounded-xl border-white/10 bg-zinc-900/70 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Admin Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoComplete="current-password"
                  className="h-12 pl-10 pr-11 rounded-xl border-white/10 bg-zinc-900/70 text-sm text-white placeholder:text-zinc-600 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 transition-all"
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
              className="h-12 w-full mt-2 rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-amber-700 hover:from-red-500 hover:to-amber-600 text-white font-bold shadow-[0_0_30px_rgba(229,9,20,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating Admin...</span>
                </>
              ) : (
                "Authenticate & Access Dashboard"
              )}
            </Button>
          </form>

          {/* Return to user site */}
          <div className="pt-2 text-center border-t border-white/5">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to User Login</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
