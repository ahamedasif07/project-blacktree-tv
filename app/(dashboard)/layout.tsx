import Link from "next/link";
import { LayoutDashboard, Film, Users, Settings, UserCog, ShieldCheck } from "lucide-react";

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
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white dark:bg-zinc-900 md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="font-bold text-lg tracking-tight">
            BLACK TREE <span className="text-primary text-xs ml-1">ADMIN</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col gap-4 py-4">
          <nav className="grid gap-1 px-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-zinc-900 px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Trigger could go here */}
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Control Panel</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
