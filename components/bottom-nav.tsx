"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Sparkles, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/home", icon: Home, label: "홈" },
  { href: "/create", icon: Sparkles, label: "만들기" },
  { href: "/goods", icon: ShoppingBag, label: "둘러보기" },
  { href: "/mypage", icon: User, label: "MY" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background pb-safe md:hidden">
      <div className="mx-3 mb-2 flex h-16 items-center justify-around rounded-2xl bg-white shadow-lg ring-1 ring-border/50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-2 transition-all",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl transition-all", isActive && "bg-primary/10")}>
                <item.icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} />
              </div>
              <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
