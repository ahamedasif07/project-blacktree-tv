"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa6";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

import { ZCAuthLogin, ZTAuthLogin } from "@/types/zod/auth";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  
  const { signInInitiate, isSigningInInitiate } = useAuth();

  const form = useForm<ZTAuthLogin>({
    resolver: zodResolver(ZCAuthLogin),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: ZTAuthLogin) => {
    try {
      const { email, password, rememberMe } = data;
      const res = await signInInitiate({ email, password });
      if (res?.success && res?.data?.requireOTP) {
        sessionStorage.setItem(
          "temp_login_credentials",
          JSON.stringify({ email, password, rememberMe })
        );
        toast.success("OTP code sent to your email!");
        router.push(`/verify-otp?email=${encodeURIComponent(email)}&flow=login`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: window.location.origin,
      });
    } catch (error) {
      toast.error("Social login failed");
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] lg:max-w-[500px] xl:max-w-[586px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl">
        <CardHeader className="space-y-3 pb-6 pt-8">
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Sign In
          </CardTitle>

          <CardDescription className="text-center text-sm text-zinc-400">
            Experience premium cultural storytelling.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FieldGroup className="space-y-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-email"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Email Address
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="h-12 rounded-lg border bg-transparent! border-[#FFFFFF1A] px-4 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A]"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id="form-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        className={`h-12 rounded-lg border border-[#FFFFFF1A] bg-transparent! px-4 pr-12 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A] ${
                          !showPassword && field.value
                            ? "font-mono tracking-[0.25em]"
                            : ""
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="form-rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-zinc-600 data-[state=checked]:border-[#E50914] data-[state=checked]:bg-[#E50914]"
                      />

                      <label
                        htmlFor="form-rememberMe"
                        className="cursor-pointer text-sm text-zinc-300"
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />

                <Link
                  href="/forgot-password"
                  className="text-sm text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSigningInInitiate}
                className="mt-2 h-12 w-full cursor-pointer rounded-lg bg-[#E50914] text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:scale-101 hover:bg-[#c40812] flex items-center justify-center gap-2"
              >
                {isSigningInInitiate ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </FieldGroup>

            {/* Social Login Divider */}
            <div className="relative flex items-center py-2">
              <div className="grow border-t border-[#FFFFFF1A]"></div>
              <span className="mx-4 shrink text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Or continue with
              </span>
              <div className="grow border-t border-[#FFFFFF1A]"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                className="h-12 w-full cursor-pointer rounded-lg border-[#FFFFFF1A] bg-transparent text-sm font-medium text-white transition-all hover:scale-101 duration-300 ease-in-out hover:bg-[#FFFFFF0D] hover:text-white"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
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
                className="h-12 w-full cursor-pointer rounded-lg border-[#FFFFFF1A] bg-transparent text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-101 hover:bg-[#FFFFFF0D] hover:text-white"
              >
                <FaFacebook />
                Facebook
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="ml-1 font-medium text-[#E50914] transition-colors hover:text-[#ff2d37]"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
