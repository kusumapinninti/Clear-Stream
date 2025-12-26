"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Upload, 
  Library, 
  Users, 
  Settings, 
  Shield, 
  ChevronRight,
  LogOut,
  Search,
  Bell,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload", href: "/dashboard/upload", icon: Upload },
  { name: "Library", href: "/dashboard/library", icon: Library },
];

const adminItems = [
  { name: "Users", href: "/dashboard/users", icon: Users, admin: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const isAdmin = true; // Simulation

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-all duration-300">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">SensiStream</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Main
        </div>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              pathname === item.href
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            )}
          >
            <item.icon className={cn(
              "mr-3 h-4 w-4 shrink-0 transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
            )} />
            {item.name}
          </Link>
        ))}

        <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          Management
        </div>
        {adminItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              pathname === item.href
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
              item.admin && !isAdmin && "pointer-events-none opacity-50"
            )}
          >
            <item.icon className={cn(
              "mr-3 h-4 w-4 shrink-0 transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
            )} />
            {item.name}
            {item.admin && <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">Admin</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-semibold">John Doe</span>
            <span className="truncate text-xs text-muted-foreground">Admin</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/80 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search videos, users..."
            className="w-full rounded-md border bg-muted/50 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
        </Button>
      </div>
    </header>
  );
}
