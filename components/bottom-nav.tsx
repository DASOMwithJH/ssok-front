"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

function IconHome() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <rect x="8" y="13" width="6" height="7" rx="1" />
    </svg>
  )
}

function IconSparkles() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2v3M11 17v3M2 11h3M17 11h3" />
      <path d="M11 6c0 0 1.5 2 1.5 5S11 16 11 16s-1.5-2-1.5-5S11 6 11 6z" />
      <circle cx="11" cy="11" r="2.5" />
    </svg>
  )
}

function IconFunding() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="4" height="8" rx="1" />
      <rect x="9" y="7" width="4" height="12" rx="1" />
      <rect x="15" y="3" width="4" height="16" rx="1" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="7" r="4" />
      <path d="M2 20c0-4.4 4-8 9-8s9 3.6 9 8" />
    </svg>
  )
}

const navItems = [
  { href: "/", Icon: IconHome, label: "홈" },
  { href: "/create", Icon: IconSparkles, label: "굿즈 제작" },
  { href: "/funding", Icon: IconFunding, label: "펀딩" },
  { href: "/mypage", Icon: IconUser, label: "MY" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background pb-safe md:hidden">
      <div className="mx-3 mb-2 flex h-16 items-center justify-around rounded-2xl bg-white shadow-lg ring-1 ring-border/50">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-2 transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                isActive && "bg-primary/10"
              )}>
                <item.Icon />
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
