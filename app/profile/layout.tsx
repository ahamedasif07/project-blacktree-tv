"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfileStore } from "@/store/public/use-user-profile-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Sparkles,
  User,
  History,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useUserProfileStore();
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-neutral-500 tracking-wider">
            Verifying secure session...
          </span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-neutral-500 tracking-wider">
            Acquiring cloud profile records...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans selection:bg-primary selection:text-white flex flex-col">
      {/* Premium Header/Navbar */}
      <header className="sticky top-0 z-100 w-full border-b bg-background/80 backdrop-blur-md py-0 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 flex h-16 md:h-20 items-center justify-between relative">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-xl bg-card/50 shadow-sm">
              <Image
                src="/assets/images/BTTV New Logo2 2.png"
                alt="Logo"
                fill
                className="object-cover p-1"
                priority
              />
            </div>
          </Link>

          {/* User Profile Dropdown on Right */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-0.5 md:p-1 sm:px-3 sm:py-1.5 border border-white/20 sm:border-transparent hover:border-primary/50 sm:hover:border-neutral-800 rounded-full sm:rounded-xl cursor-pointer text-left transition-all duration-200 hover:scale-105 sm:hover:scale-100 active:scale-95 sm:active:scale-100 outline-none select-none bg-black/10 sm:bg-neutral-950/40 backdrop-blur-sm sm:backdrop-blur-none shadow-sm">
                <div className="hidden sm:grid text-right text-[11px] leading-tight min-w-0 pr-1">
                  <span className="truncate font-semibold text-white">
                    {user?.name || "User"}
                  </span>
                  <span className="truncate text-[10px] text-neutral-400">
                    {user?.email}
                  </span>
                </div>
                <Avatar className="h-8 w-8 md:h-9 md:w-9 shrink-0 shadow-sm">
                  <AvatarImage
                    src={user?.image}
                    alt={user?.name || "User Avatar"}
                  />
                  <AvatarFallback className="text-white font-bold text-xs bg-neutral-800">
                    {user?.name?.slice(0, 2).toUpperCase() ||
                      user?.email?.slice(0, 2).toUpperCase() ||
                      "US"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-58 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-200 p-1.5 animate-in fade-in-50 slide-in-from-top-4 shadow-2xl"
              side="bottom"
              align="center"
              sideOffset={16}
              collisionPadding={16}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2.5 py-2 text-left text-xs">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      src={user?.image}
                      alt={user?.name || "User Avatar"}
                      className="border-none object-cover"
                    />
                    <AvatarFallback className="rounded-full text-white font-bold text-xs">
                      {user?.name?.slice(0, 2).toUpperCase() ||
                        user?.email?.slice(0, 2).toUpperCase() ||
                        "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                    <span className="truncate font-semibold text-white">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-[10px] text-neutral-400">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-900 my-1.5" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  asChild
                  className="focus:bg-neutral-900 focus:text-white cursor-pointer gap-2 text-xs py-2.5 px-3 rounded-lg"
                >
                  <Link
                    href="/subscription"
                    className="flex items-center gap-2 focus:bg-neutral-900 focus:text-white cursor-pointer w-full text-xs py-2.5 px-3 rounded-lg"
                  >
                    <Sparkles size={14} className="text-yellow-500" />
                    <span>Upgrade to Pro</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-neutral-900 my-1.5" />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 focus:bg-neutral-900 focus:text-white cursor-pointer w-full text-xs py-2.5 px-3 rounded-lg"
                  >
                    <User size={14} />
                    <span>Account Overview</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile/history"
                    className="flex items-center gap-2 focus:bg-neutral-900 focus:text-white cursor-pointer w-full text-xs py-2.5 px-3 rounded-lg"
                  >
                    <History size={14} />
                    <span>Watch History</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-neutral-900 my-1.5" />
              <DropdownMenuItem
                onClick={() => logout()}
                className="focus:bg-red-500/10 focus:text-red-500 text-red-500 gap-2 cursor-pointer text-xs py-2.5 px-3 rounded-lg"
              >
                <LogOut size={14} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-6 md:pt-10 overflow-y-auto custom-scrollbar pb-16">
        <div className="w-full container mx-auto px-4 md:px-0 border-neutral-900/60 rounded-xl shadow-sm min-h-[500px]">

          {children}
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
