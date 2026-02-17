"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, List, Map, Settings, Plus, Pause, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/calls", icon: List, label: "History" },
  { href: "/paths", icon: Map, label: "Paths" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Pause className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">OnHoldBot</span>
          </Link>
        </div>

        {/* New call button */}
        <div className="p-4">
          <Link href="/calls/new">
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              New Call
            </Button>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm mb-1",
                pathname === href || pathname.startsWith(href + "/")
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Free plan</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Pause className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">OnHoldBot</span>
          </Link>
          <Link href="/calls/new">
            <Button size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              New
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t safe-area-bottom z-40">
        <div className="grid grid-cols-4">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-xs transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-violet-600 font-medium"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16 md:pt-0">{children}</main>
    </div>
  );
}
