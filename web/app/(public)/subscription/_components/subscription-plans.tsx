"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLANS } from "@/constants/subcriptions";

export default function SubscriptionPlans() {
  const router = useRouter();

  return (
    <section className="bg-black text-frontground py-24 px-4 font-sans overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Heading Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4 px-4">
          <div className="border border-primary/30 rounded-full px-6 py-2">
            <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium">
              Experience Excellence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-frontground">
            Upgrade to Premium
          </h2>
          <p className="text-zinc-400 max-w-2xl text-[15px] leading-relaxed">
            Elevate your cinematic journey with crystal-clear 4K, zero
            interruptions, and exclusive access to worldwide film festival
            premieres.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center px-4 md:px-0">
          {PLANS.map((plan) => {
            const isPremium = plan.isCurrent;

            return (
              <div
                key={plan.id || plan.slug || plan.name}
                className="relative flex h-full group"
              >
                {isPremium && (
                  <div className="absolute -top-[25px] left-1/2 -translate-x-1/2 z-40">
                    <div className="bg-primary text-frontground px-4 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#ff313b]">
                      Current Plan
                    </div>
                  </div>
                )}

                <Card
                  className={cn(
                    "relative w-full flex flex-col transition-all duration-500 rounded-[24px] overflow-hidden border",
                    isPremium
                      ? "bg-gradient-to-b from-[#1a0505] to-[#0f0f0f] border-primary shadow-[0_0_50px_rgba(229,9,20,0.4)] scale-[1.02] md:scale-105 z-20"
                      : "bg-[#0f0f0f] border-zinc-800 shadow-none z-10",
                  )}
                >
                  {/* Subtle radial overlay for the premium "glow" look */}
                  {isPremium && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,9,20,0.15),transparent_70%)] pointer-events-none" />
                  )}

                  <CardHeader className="pt-10 px-10 pb-2">
                    <CardTitle
                      className={cn(
                        "text-2xl font-bold tracking-tight mb-1",
                        isPremium ? "text-primary" : "text-zinc-100",
                      )}
                    >
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[34px] font-bold text-frontground tracking-tight">
                        ${plan.price}
                      </span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow px-10 py-6 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <div className="relative flex items-center justify-center">
                              <div className="w-[18px] h-[18px] rounded-full border border-primary/50 flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary stroke-[3px]" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-[18px] h-[18px] rounded-full border border-zinc-800 flex items-center justify-center">
                              <Ban className="w-3 h-3 text-zinc-700" />
                            </div>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[15px] tracking-tight",
                            feature.included
                              ? "text-zinc-300"
                              : "text-zinc-600",
                          )}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="px-10 pb-10">
                    <Button
                      onClick={() => router.push(`/checkout/${plan.slug}`)}
                      className={cn(
                        "w-full h-[56px] rounded-xl font-bold text-[16px] transition-all duration-300 cursor-pointer",
                        isPremium
                          ? "bg-primary hover:bg-[#ff1f29] text-frontground shadow-lg"
                          : "bg-[#1f1f1f] hover:bg-primary hover:text-frontground text-zinc-300 border border-zinc-800 hover:border-primary",
                      )}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
