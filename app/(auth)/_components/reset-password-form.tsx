"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
    <div className="w-full flex flex-col items-center justify-center px-4 gap-8">
      <Card className="w-full md:max-w-[440px] lg:max-w-[500px] xl:max-w-[586px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl px-2 md:px-4">
        <CardHeader className="space-y-3 pb-6 pt-10 flex flex-col items-center">
          <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-1">
            <Lock className="h-7 w-7 text-red-500" />
          </div>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Security Verification
          </CardTitle>
          <CardDescription className="text-center text-sm text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
            Enter the new password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="new-password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      New Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className="h-12 rounded-lg border bg-transparent! border-[#FFFFFF1A] px-4 pr-12 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
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

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="confirm-password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Re-enter password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className="h-12 rounded-lg border bg-transparent! border-[#FFFFFF1A] px-4 pr-12 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
                      >
                        {showConfirmPassword ? (
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
              disabled={isResettingPassword}
              className="h-12 w-full rounded-lg bg-primary text-sm font-bold text-white cursor-pointer mt-2 hover:scale-101 duration-300 ease-in-out hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)] flex items-center justify-center gap-2"
            >
              {isResettingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Link
        href="/login"
        className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest transition-all hover:text-white group cursor-pointer"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>
    </div>
  );
};
