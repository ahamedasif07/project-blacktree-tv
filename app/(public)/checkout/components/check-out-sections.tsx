/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Loader2,
  Check,
  X,
  LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  CheckoutPayload,
  useCheckoutStore,
} from "@/store/public/use-checkout-store";
import { PLANS } from "@/constants/subcriptions";

interface PlanFeature {
  text: string;
  included: boolean;
  icon?: LucideIcon;
}

export default function CheckoutSection() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : undefined;

  const { isSubmitting, submitSubscription } = useCheckoutStore();

  const currentPlan = PLANS.find((p) => p.slug === slug) || PLANS[1];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutPayload>({
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<CheckoutPayload> = async (data) => {
    try {
      await submitSubscription(data);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const onError = (formErrors: typeof errors) => {
    console.log("Form validation failed:", formErrors);
  };

  return (
    <section className="bg-[#0a0a0a] my-20 md:my-24 text-[#f5f5f5] flex items-center justify-center p-4 antialiased font-sans">
      <Card className="w-full max-w-5xl rounded-xl border border-neutral-800/60 overflow-hidden bg-[#121212] shadow-2xl flex flex-col md:flex-row items-stretch md:min-h-[640px]">
        {/* Left Column: Dynamic Plan Summary Based on Slug */}
        <div className="w-full md:w-[50%] p-8 lg:p-12 border-b md:border-b-0 md:border-r border-neutral-800/60 flex flex-col justify-between relative overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/checkout-bg.png')]">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-[#121212]/90 to-[#121212] z-0" />
          <div className="absolute inset-0 bg-[#121212]/40 backdrop-blur-[2px] z-0" />

          <div className="space-y-8 z-10 relative">
            <div>
              <Badge className="bg-primary text-fontground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-none mb-5 pointer-events-none shadow-sm shadow-primary/20">
                Selected Option
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight text-fontground">
                {currentPlan.name}
              </h2>
              <p className="text-sm text-neutral-400 mt-2 font-normal leading-relaxed max-w-xs">
                Elevate your home cinema experience with peak fidelity.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-1">
              <span className="text-5xl font-black text-fontground tracking-tight">
                ${currentPlan.price}
              </span>
              <span className="text-sm text-neutral-400 font-medium">
                / month
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {currentPlan.features.map((feature: PlanFeature, idx: number) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 ${feature.included ? "text-neutral-200" : "text-neutral-600 line-through"}`}
                >
                  {feature.icon ? (
                    <feature.icon className="w-5 h-5 text-primary shrink-0" />
                  ) : feature.included ? (
                    <Check className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-neutral-600 shrink-0" />
                  )}
                  <span className="text-sm font-medium tracking-wide">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800/40 mt-12 md:mt-0 z-10 relative">
            <p className="text-[11px] text-neutral-500 font-medium leading-normal tracking-wide">
              Next billing date: November 24, 2025. Cancel anytime with one
              click.
            </p>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <CardContent className="flex-1 p-8 lg:p-12 bg-[#121212] flex flex-col justify-between border-none">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-lg font-bold tracking-wide text-fontground">
                Secure Checkout
              </h3>
              <div className="flex items-center gap-2.5 text-neutral-500">
                <CreditCard className="w-5 h-5" />
                <div className="w-5 h-5 border-2 border-neutral-500 rounded-md flex items-center justify-center text-[9px] font-black tracking-tighter">
                  ID
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="cardholderName"
                  className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase"
                >
                  Cardholder Name
                </Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="John Wick"
                  className={`w-full bg-[#1a1a1a] border-neutral-800 rounded-md px-4 py-6 text-sm text-fontground placeholder:text-neutral-600 focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-0 ${
                    errors.cardholderName
                      ? "border-primary focus-visible:ring-primary"
                      : ""
                  }`}
                  {...register("cardholderName", {
                    required: "Name is required",
                  })}
                />
                {errors.cardholderName && (
                  <p className="text-xs text-primary mt-1">
                    {errors.cardholderName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="cardNumber"
                  className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase"
                >
                  Card Number
                </Label>
                <div className="relative">
                  <Controller
                    name="cardNumber"
                    control={control}
                    rules={{
                      required: "Card number is required",
                      minLength: {
                        value: 19,
                        message: "Card number must be 16 digits",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="cardNumber"
                        type="text"
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        className={`w-full bg-[#1a1a1a] border-neutral-800 rounded-md px-4 py-6 text-sm text-fontground placeholder:text-neutral-600 tracking-widest focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-0 ${
                          errors.cardNumber
                            ? "border-primary focus-visible:ring-primary"
                            : ""
                        }`}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim();
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-25">
                    <div className="w-7 h-4.5 bg-neutral-400 rounded-sm" />
                    <div className="w-7 h-4.5 bg-neutral-200 rounded-sm" />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-xs text-primary mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="expiryDate"
                    className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase"
                  >
                    Expiry Date
                  </Label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    rules={{
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: "Format must be MM/YY",
                      },
                      validate: (value) => {
                        if (!value) return false;
                        const [monthStr, yearStr] = value.split("/");
                        const month = parseInt(monthStr, 10);
                        const year = parseInt(`20${yearStr}`, 10);

                        const now = new Date();
                        const currentYear = now.getFullYear();
                        const currentMonth = now.getMonth() + 1;

                        if (
                          year < currentYear ||
                          (year === currentYear && month < currentMonth)
                        ) {
                          return "Card is expired";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="expiryDate"
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        className={`w-full bg-[#1a1a1a] border-neutral-800 rounded-md px-4 py-6 text-sm text-fontground placeholder:text-neutral-600 text-center tracking-wider focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-0 ${
                          errors.expiryDate
                            ? "border-primary focus-visible:ring-primary"
                            : ""
                        }`}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 2) {
                            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                          }
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  {errors.expiryDate && (
                    <p className="text-xs text-primary mt-1">
                      {errors.expiryDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cvc"
                    className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase"
                  >
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    type="password"
                    maxLength={4}
                    placeholder="•••"
                    className={`w-full bg-[#1a1a1a] border-neutral-800 rounded-md px-4 py-6 text-sm text-fontground placeholder:text-neutral-600 text-center tracking-widest focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:ring-offset-0 ${
                      errors.cvc
                        ? "border-primary focus-visible:ring-primary"
                        : ""
                    }`}
                    {...register("cvc", {
                      required: "CVC is required",
                      minLength: { value: 3, message: "Min 3 digits" },
                    })}
                  />
                  {errors.cvc && (
                    <p className="text-xs text-primary mt-1">
                      {errors.cvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-fontground hover:bg-[#b80710] font-bold text-sm h-auto py-4 rounded-md shadow-lg shadow-primary/10 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Transaction...
                </>
              ) : (
                "Start Subscription"
              )}
            </Button>
          </form>

          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-center gap-5 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-neutral-600" /> SSL Secured
              </span>
              <span>Powered by Stripe</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-neutral-600" /> PCI
                Compliant
              </span>
            </div>

            <p className="text-[10px] text-neutral-600 text-center max-w-sm mx-auto leading-relaxed tracking-wide">
              By clicking "Start Subscription", you agree to our Terms of
              Service and Privacy Policy. CineLuxe uses industry-standard
              encryption protocols to safeguard your transactional data.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
