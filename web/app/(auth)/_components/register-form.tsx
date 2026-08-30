"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
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
    signUp(data);
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "http://localhost:3000",
      });
    } catch (error) {
      toast("Registration Failed", {
        position: "bottom-right",
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full md:max-w-[440px] lg:max-w-[500px] xl:max-w-[586px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl  px-2 md:px-4">
        <CardHeader className="space-y-3 pb-6 pt-8">
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Start Your Cinematic <br /> Journey
          </CardTitle>
          <CardDescription className="text-center text-sm text-zinc-400">
            Experience premium cultural storytelling.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FieldGroup className="space-y-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="reg-name"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="reg-name"
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="reg-email"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="reg-email"
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
                      htmlFor="reg-password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
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

            <Button
              type="submit"
              disabled={isSigningUp}
              className="mt-2 h-12 w-full rounded-lg bg-primary text-sm font-semibold text-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-101 hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#FFFFFF0D]"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#141414] px-3 text-zinc-500 font-bold">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-[#FFFFFF1A] hover:bg-white/5 text-white h-11 cursor-pointer transition-all duration-300 ease-in-out hover:scale-101"
                onClick={() => handleSocialLogin("google")}
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z"
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
                className="bg-transparent border-[#FFFFFF1A] hover:bg-white/5 text-white h-11 transition-all duration-300 ease-in-out hover:scale-101"
                onClick={() => handleSocialLogin("facebook")}
              >
                <svg className="mr-2 h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.04 2.13-3.4 2.13-1.33 0-1.77-.83-3.32-.83-1.57 0-2.06.81-3.32.81-1.32 0-2.43-1.15-3.42-2.15-1.99-1.99-3.52-5.63-3.52-8.87 0-5.11 3.2-7.81 6.23-7.81 1.58 0 2.92.93 3.82.93.9 0 2.45-1.09 4.33-1.09.79 0 3.03.29 4.49 2.43-.12.07-2.68 1.56-2.68 4.67 0 3.73 3.23 5.04 3.29 5.06-.02.07-.51 1.76-1.5 3.32zM12.03 4.22c-.08-1.9 1.53-3.55 3.33-3.69.19 2.18-2.07 3.96-3.33 3.69z" />
                </svg>
                Facebook
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          <p className="text-center text-sm text-zinc-400">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-medium text-[#E50914] transition-colors hover:text-[#ff2d37]"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
