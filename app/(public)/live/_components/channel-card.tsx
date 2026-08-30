"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Globe,
  Gamepad2,
  UtensilsCrossed,
  LucideIcon,
} from "lucide-react";

export type ChannelIconType = "music" | "globe" | "gamepad" | "utensils";

export interface Channel {
  id: string | number;
  title: string;
  subtitle: string;
  image: string;
  icon: ChannelIconType;
  is1080p: boolean;
  viewers: string;
  progress?: number;
}

const IconMap: Record<ChannelIconType, LucideIcon> = {
  music: Music,
  globe: Globe,
  gamepad: Gamepad2,
  utensils: UtensilsCrossed,
};

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard = ({ channel }: ChannelCardProps) => {
  const Icon = IconMap[channel.icon] || Globe;

  return (
    <div className="group cursor-pointer flex flex-col gap-4">
      {/* Thumbnail Container */}
      <div className="relative aspect-[14/10] w-full overflow-hidden rounded-xl bg-background border-white/5">
        <Image
          src={channel.image}
          alt={channel.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary hover:bg-primary text-white border-none rounded-md px-1.5 py-0.5 text-[10px] font-bold">
            LIVE
          </Badge>
          {channel.is1080p && (
            <Badge className="bg-black/60 backdrop-blur-md text-zinc-300 border-none rounded-md px-1.5 py-0.5 text-[10px]">
              1080p
            </Badge>
          )}
        </div>

        {/* Red Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-800">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${channel.progress ?? 65}%` }}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-white font-semibold text-sm truncate leading-tight">
            {channel.title}
          </h3>
          <p className="text-zinc-500 text-xs mt-1 truncate">
            {channel.subtitle}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider">
              {channel.viewers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
