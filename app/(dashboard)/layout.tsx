"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Users,
  Settings,
  UserCog,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import useAuthStore from "@/store/auth/use-auth-store";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/movies", label: "Movies", icon: Film },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/moderators", label: "Moderators", icon: ShieldCheck },
  { href: "/admin/actors", label: "Actors", icon: UserCog },
  { href: "/admin/subscriptions", label: "Billing", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/admin-login");
      } else if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.role !== "MODERATOR") {
        router.push("/admin-login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.role !== "MODERATOR")) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-zinc-500 tracking-wider">
            Verifying administrative access...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md md:flex">
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/80 px-6">
          <Link href="/admin" className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <span>BLACK TREE</span>
            <span className="text-red-500 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20">
              {user.role === "SUPER_ADMIN" ? "SUPER ADMIN" : "ADMIN"}
            </span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-between py-4">
          <nav className="grid gap-1 px-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-red-600 text-white font-semibold shadow-[0_0_15px_rgba(229,9,20,0.3)]"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-zinc-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer User Info & Logout */}
          <div className="px-4 border-t border-zinc-800/80 pt-4 mt-auto">
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center text-xs font-bold text-white shadow-[0_0_12px_rgba(229,9,20,0.3)]">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="grid flex-1 min-w-0">
                <span className="truncate text-xs font-bold text-white flex items-center gap-1">
                  {user.name}
                  {user.role === "SUPER_ADMIN" && <Sparkles className="h-3 w-3 text-amber-400 inline" />}
                </span>
                <span className="truncate text-[10px] text-zinc-400">{user.email}</span>
              </div>
            </div>

            <Button
              onClick={() => logout()}
              variant="ghost"
              className="w-full justify-start gap-2.5 h-10 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Admin Control Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{user.name}</p>
              <p className="text-[10px] text-zinc-400">{user.email}</p>
            </div>
            <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-400">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
