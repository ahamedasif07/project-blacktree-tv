"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
      toast.success("Verification OTP sent to your email!");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&flow=reset-password`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full md:max-w-[440px] lg:max-w-[500px] xl:max-w-[586px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl px-2 md:px-4">
        <CardHeader className="space-y-4 pb-6 pt-10">
          <CardTitle className="text-center text-3xl md:text-4xl font-bold tracking-tight">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-center text-sm md:text-base text-zinc-400 max-w-[280px] md:max-w-[340px] mx-auto leading-relaxed">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-3"
                  >
                    <FieldLabel
                      htmlFor="forgot-email"
                      className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest"
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="forgot-email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="h-12 md:h-14 rounded-lg border bg-transparent! border-[#FFFFFF1A] px-4 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A] text-sm md:text-base"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={isForgotPasswordPending}
              className="h-12 md:h-14 w-full rounded-lg bg-primary text-sm md:text-base font-bold text-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-101 hover:bg-primary/90 shadow-lg flex items-center justify-center gap-2"
            >
              {isForgotPasswordPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-10 pt-4">
          <Link
            href="/login"
            className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest cursor-pointer transition-colors hover:text-white group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
