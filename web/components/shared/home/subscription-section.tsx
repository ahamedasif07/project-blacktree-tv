import React from "react";
import {
  Monitor,
  Volume2,
  HardDriveDownload,
  Infinity,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { PLANS } from "@/constants/subcriptions";

const SubscriptionSection = () => {
  const premiumPlan = PLANS.find((p) => p.id === "plan_premium") || PLANS[1];

  return (
    <div className="text-foreground flex items-center py-10 md:py-20 px-4">
      <div className="container mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-popover p-6 md:p-12 lg:p-16 rounded-[30px] md:rounded-[40px] border border-foreground/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="space-y-6 lg:space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight text-popover-foreground">
              Experience the Future of Cinema with <br />
              <span className="text-primary uppercase tracking-wide">
                Aether Pro+
              </span>
            </h2>
            <p className="text-muted-foreground  max-w-lg leading-relaxed">
              Unlock the highest fidelity viewing experience with 8K resolution,
              zero latency streaming, and exclusive access to Lumina Cinematic
              Originals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-6 lg:gap-y-10 pt-2">
            <div className="flex gap-3 lg:gap-4">
              <Monitor className="text-primary shrink-0 w-5 h-5 lg:w-7 lg:h-7" />
              <div>
                <h4 className="font-bold text-sm lg:text-lg text-popover-foreground">
                  Ultra 8K Resolution
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Detail in every frame.
                </p>
              </div>
            </div>

            <div className="flex gap-3 lg:gap-4">
              <Volume2 className="text-primary shrink-0 w-5 h-5 lg:w-7 lg:h-7" />
              <div>
                <h4 className="font-bold text-sm lg:text-lg text-popover-foreground">
                  Spatial 3D Audio
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Immersive soundscapes.
                </p>
              </div>
            </div>

            <div className="flex gap-3 lg:gap-4">
              <Infinity className="text-primary shrink-0 w-5 h-5 lg:w-7 lg:h-7" />
              <div>
                <h4 className="font-bold text-sm lg:text-lg text-popover-foreground">
                  Infinite Devices
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Stream on all screens.
                </p>
              </div>
            </div>

            <div className="flex gap-3 lg:gap-4">
              <HardDriveDownload className="text-primary shrink-0 w-5 h-5 lg:w-7 lg:h-7" />
              <div>
                <h4 className="font-bold text-sm lg:text-lg text-popover-foreground">
                  Unlimited Offline
                </h4>
                <p className="text-muted-foreground text-xs lg:text-sm">
                  Download any journey.
                </p>
              </div>
            </div>
          </div>

          <Link href="/subscription">
            <Button className="w-full sm:w-auto bg-primary hover:opacity-90 transition-opacity text-primary-foreground font-medium px-8 py-6 rounded-xl text-md lg:text-lg">
              Upgrade to Pro + Now
            </Button>
          </Link>
        </div>

        {/* right side card */}
        <div className="flex justify-center md:justify-end w-full">
          <div className="relative group w-full md:max-w-md">
            <div className="absolute -inset-16 bg-primary/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>

            <div className="absolute -inset-4 bg-linear-to-br from-primary/30 to-transparent blur-3xl rounded-[50px] opacity-40"></div>

            <Card
              className="relative bg-foreground/2 backdrop-blur-3xl rounded-[30px] shadow-2xl overflow-hidden border border-foreground/10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 10% 10%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
              }}
            >
              <CardContent className="p-6 sm:p-10 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/60 font-bold tracking-widest text-[10px] lg:text-sm uppercase flex items-center gap-1.5">
                    {premiumPlan.name} Plan
                  </span>
                  <span className="bg-primary/20 text-primary text-[9px] lg:text-[10px] font-bold px-2 lg:px-3 py-1 rounded-full border border-primary/30 uppercase">
                    Most Popular
                  </span>
                </div>

                <div className="mb-6 lg:mb-10">
                  <div className="flex items-baseline">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                      ${premiumPlan.price}
                    </span>
                    <span className="text-foreground/40 ml-2 text-sm lg:text-base">
                      / month
                    </span>
                  </div>
                </div>

                {/* Dynamic Features List */}
                <ul className="space-y-4 lg:space-y-6 mb-8 lg:mb-12">
                  {premiumPlan.features.map((feature, index) => {
                    const IconComponent =
                      feature.icon || (feature.included ? Check : X);
                    return (
                      <li
                        key={index}
                        className={`flex items-center gap-3 text-sm lg:text-base ${
                          feature.included ? "" : "opacity-40 line-through"
                        }`}
                      >
                        <div className="bg-primary rounded-full p-0.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center shrink-0">
                          <IconComponent
                            size={12}
                            className="text-foreground lg:w-3.5"
                            strokeWidth={4}
                          />
                        </div>
                        <span className="text-foreground/80">
                          {feature.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Dynamic Route Checkout Button */}
                <Link href={`/checkout/${premiumPlan.slug}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 py-6 rounded-xl text-foreground font-bold uppercase tracking-widest text-[10px] lg:text-sm bg-primary/5 hover:bg-primary hover:text-foreground hover:border-primary transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
                  >
                    Start 7-Day Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
