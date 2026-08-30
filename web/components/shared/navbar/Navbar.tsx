"use client";

import { cn } from "@/lib/utils";
import { History, LogOut, Menu, Search, Sparkles, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAVIGATION_ITEMS } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { useNavbar } from "@/store/public/use-navbar-store";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { isSearchOpen, setSearch, isMobileMenuOpen, setMobileMenu } =
    useNavbar();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Monitor window scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Automatically close the mobile sidebar menu if the screen resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileMenu]);

  // 3. Focus search input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      const timeout = setTimeout(() => searchInputRef.current?.focus(), 400);
      return () => clearTimeout(timeout);
    }
  }, [isSearchOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-100 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/80 backdrop-blur-md py-0 shadow-sm"
          : "bg-transparent border-transparent py-2",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 overflow-hidden flex h-16 md:h-20 items-center justify-between relative">
        {/* LEFT: LOGO */}
        <div
          className={cn(
            "shrink-0 flex items-center transition-all duration-500 z-130",
            // Removed layout scaling/opacity on desktop for search status
            isSearchOpen
              ? "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
              : "opacity-100",
          )}
        >
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
        </div>

        {/* MIDDLE: DESKTOP MENU */}
        <nav
          className={cn(
            "hidden lg:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 transition-all duration-500 w-full max-w-[45%] lg:max-w-[55%]",
            isSearchOpen
              ? "opacity-0 pointer-events-none scale-95"
              : "opacity-100",
          )}
        >
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-3 lg:px-4 py-2 text-sm font-medium transition-all hover:text-primary relative whitespace-nowrap",
                pathname === item.href
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* RIGHT: ACTIONS */}
        <div
          className={cn(
            "flex items-center gap-3 lg:gap-4 shrink-0 relative z-130 transition-all duration-500",
            isSearchOpen
              ? "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
              : "opacity-100",
          )}
        >
          {!isSearchOpen && (
            <div className="p-0.5 md:p-1 border rounded-full border-white/20 hover:border-primary/50 transition-all duration-200 hover:scale-105 active:scale-95 bg-black/10 backdrop-blur-sm shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearch(true)}
                className="rounded-full h-8 w-8 md:h-9 md:w-9 cursor-pointer hover:bg-transparent"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
              </Button>
            </div>
          )}

          {!isLoading && user && user.role?.toLowerCase() === "user" ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-0.5 md:p-1 lg:px-3 lg:py-1.5 border border-white/20 lg:border-transparent hover:border-primary/50 lg:hover:border-neutral-800 rounded-full lg:rounded-xl cursor-pointer text-left transition-all duration-200 hover:scale-105 lg:hover:scale-100 active:scale-95 lg:active:scale-100 outline-none select-none bg-black/10 lg:bg-neutral-950/40 backdrop-blur-sm lg:backdrop-blur-none shadow-sm">
                  <div className="hidden lg:grid text-right text-[11px] leading-tight min-w-0 pr-1">
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
          ) : (
            !isLoading && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.push("/subscription")}
                  className="hidden sm:inline-flex px-5 py-5 rounded-lg hover:scale-105 hover:bg-primary/90 duration-300 ease-in-out transition-colors text-white backdrop-blur-sm cursor-pointer"
                >
                  Subscribe Now
                </Button>
                <Button
                  onClick={() => router.push("/login")}
                  className="rounded-lg px-4 py-4 md:px-5 md:py-5 bg-cyan-700 hover:scale-105 duration-300 ease-in-out hover:bg-cyan-800/80 transition-colors text-white backdrop-blur-sm cursor-pointer text-xs md:text-sm"
                >
                  LogIn
                </Button>
              </div>
            )
          )}
          {/* Mobile and Tablet Menu Trigger Container */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenu}>
              <div className="p-0.5 md:p-1 border rounded-full border-white/20 hover:border-primary/50 transition-all duration-200 hover:scale-105 active:scale-95 bg-black/10 backdrop-blur-sm shadow-sm">
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 md:h-9 md:w-9 cursor-pointer hover:bg-transparent"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    ) : (
                      <Menu className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
                    )}
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-[85vw] p-0 z-150 border-l border-white/10 flex flex-col h-full bg-background"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access navigation links and user account settings.
                </SheetDescription>

                {/* Mobile Header Bar */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-neutral-950/20 min-h-[80px]">
                  {user && user.role?.toLowerCase() === "user" ? (
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 shrink-0 shadow-sm border border-white/10">
                        <AvatarImage
                          src={user?.image}
                          alt={user?.name || "User Avatar"}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-white font-bold text-sm bg-neutral-800">
                          {user?.name?.slice(0, 2).toUpperCase() ||
                            user?.email?.slice(0, 2).toUpperCase() ||
                            "US"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate text-sm">
                          {user?.name || "User"}
                        </span>
                        <span className="text-[11px] text-neutral-400 truncate">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-base">
                        Menu
                      </span>
                    </div>
                  )}

                  <SheetClose asChild>
                    <div className="p-0.5 border rounded-full border-white/20 hover:border-primary/50 transition-all duration-200 hover:scale-105 active:scale-95 bg-black/10 backdrop-blur-sm shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8 cursor-pointer hover:bg-transparent"
                      >
                        <X className="h-4 w-4 text-primary" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </div>
                  </SheetClose>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenu(false)}
                      className={cn(
                        "py-3 text-sm font-medium border-b border-border/40 transition-colors",
                        pathname === item.href
                          ? "text-primary font-bold"
                          : "text-foreground hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-6 border-t border-white/10 bg-background/50 backdrop-blur-md">
                  {user && user.role?.toLowerCase() === "user" ? (
                    <Button
                      onClick={() => {
                        setMobileMenu(false);
                        logout();
                      }}
                      variant="destructive"
                      className="w-full py-5 font-semibold text-xs tracking-wider uppercase rounded-xl cursor-pointer"
                    >
                      Log Out
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => {
                          setMobileMenu(false);
                          router.push("/subscription");
                        }}
                        className="w-full py-5 font-semibold text-white rounded-xl cursor-pointer"
                      >
                        Subscribe Now
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileMenu(false);
                          router.push("/login");
                        }}
                        className="w-full py-5 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl cursor-pointer"
                      >
                        LogIn
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* DYNAMIC SEARCH BAR OVERLAY */}
        <div
          className={cn(
            // On mobile, it covers the whole row. On desktop (lg), it sits exactly where the nav links were.
            "absolute inset-y-0 z-140 flex items-center justify-center transition-all duration-500",
            "inset-x-4 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-[45%]",
            isSearchOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none",
          )}
        >
          <div className="w-full flex items-center gap-3 bg-background border border-primary/40 rounded-full px-4 h-11 shadow-lg overflow-hidden">
            <Search className="h-5 w-5 text-primary shrink-0" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 h-full p-0"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearch(false)}
              className="h-8 w-8 rounded-full hover:bg-primary/10 shrink-0 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
