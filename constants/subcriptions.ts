import { Star } from "lucide-react";

export const PLANS = [
  {
    id: "plan_basic",
    slug: "basic-plan",
    name: "Basic",
    price: "8.99",
    features: [
      { text: "720p Resolution", included: true },
      { text: "1 Screen at a time", included: true },
      { text: "Ad-free streaming", included: true },
      { text: "No 4K + HDR support", included: false },
    ],
    buttonText: "Select Plan",
    isCurrent: false,
  },
  {
    id: "plan_premium",
    slug: "premium-4k-hdr",
    name: "Premium 4K + HDR",
    price: "19.99",
    features: [
      { text: "4K + HDR Quality", included: true, icon: Star },
      { text: "4 Screens at a time", included: true },
      { text: "Dolby Atmos Audio", included: true },
      { text: "Priority Support", included: true },
      { text: "Offline Viewing", included: true },
    ],
    buttonText: "Keep Current",
    isCurrent: true,
  },
  {
    id: "plan_standard",
    slug: "standard-plan",
    name: "Standard",
    price: "13.99",
    features: [
      { text: "1080p Resolution", included: true },
      { text: "2 Screens at a time", included: true },
      { text: "Unlimited downloads", included: true },
      { text: "Ad-free streaming", included: true },
    ],
    buttonText: "Select Plan",
    isCurrent: false,
  },
];
