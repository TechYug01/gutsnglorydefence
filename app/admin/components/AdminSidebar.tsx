"use client";

import Link from "next/link";
import { LayoutDashboard, BookCopy, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <LayoutDashboard size={18} />
    ),
  },
  {
    label: "Courses",
    href: "/courses",
    icon: (
      <BookCopy size={18} />
    ),
  },
  {
    label: "Blogs",
    href: "/blogs",
    icon: (
      <Settings size={18} />
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[var(--bg-card)] border-r border-edge flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-edge flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gutsnglorylogo.jpeg"
          alt="Logo"
          className="w-9 h-9 rounded-full object-cover shadow-[0_0_12px_rgba(200,169,81,0.35)]"
        />
        <div className="flex flex-col items-stretch leading-none w-max mt-0.5">
          <div className="font-heading font-extrabold text-sm text-gold tracking-wide text-center">GUTS N GLORY</div>
          <div className="font-subheading text-[0.55rem] font-semibold text-muted uppercase flex justify-between w-full mt-[1px] px-[1.5px]">
            {"ADMIN PANEL".split("").map((l, i) => <span key={i}>{l === " " ? "\u00A0" : l}</span>)}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                active
                  ? "bg-[rgba(200,169,81,0.12)] text-gold"
                  : "text-secondary hover:bg-edge hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-edge flex items-center gap-3">
        <UserButton />
        <span className="text-sm text-muted">Account</span>
      </div>
    </aside>
  );
}
