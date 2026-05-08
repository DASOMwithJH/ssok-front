"use client"

import Link from "next/link"
import { Coffee, Smartphone, ShoppingBag, Image as ImageIcon, Shirt, KeyRound } from "lucide-react"

const categories = [
  { id: "mug",       name: "머그컵",  icon: Coffee },
  { id: "phonecase", name: "폰케이스", icon: Smartphone },
  { id: "bag",       name: "에코백",  icon: ShoppingBag },
  { id: "poster",    name: "포스터",  icon: ImageIcon },
  { id: "apparel",   name: "의류",    icon: Shirt },
  { id: "keyring",   name: "키링",    icon: KeyRound },
]

export function CategoriesSection() {
  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-foreground">카테고리</h2>
        <Link href="/goods" className="text-xs text-muted-foreground hover:text-primary">
          전체보기
        </Link>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/goods?category=${category.id}`}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-border transition-all group-hover:ring-primary/40 group-hover:bg-primary/5 group-active:scale-95">
              <category.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[11px] font-medium text-foreground">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
