"use client"

import Link from "next/link"
import { 
  Coffee, 
  Smartphone, 
  ShoppingBag, 
  Image as ImageIcon,
  Shirt,
  KeyRound
} from "lucide-react"

const categories = [
  { id: "mug", name: "머그컵", icon: Coffee, bgColor: "bg-orange-50", iconColor: "text-orange-500" },
  { id: "phonecase", name: "폰케이스", icon: Smartphone, bgColor: "bg-blue-50", iconColor: "text-blue-500" },
  { id: "bag", name: "에코백", icon: ShoppingBag, bgColor: "bg-green-50", iconColor: "text-green-500" },
  { id: "poster", name: "포스터", icon: ImageIcon, bgColor: "bg-purple-50", iconColor: "text-purple-500" },
  { id: "apparel", name: "의류", icon: Shirt, bgColor: "bg-pink-50", iconColor: "text-pink-500" },
  { id: "keyring", name: "키링", icon: KeyRound, bgColor: "bg-amber-50", iconColor: "text-amber-500" },
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
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.bgColor} transition-all group-hover:scale-105 group-active:scale-95`}>
              <category.icon className={`h-5 w-5 ${category.iconColor}`} />
            </div>
            <span className="text-[11px] font-medium text-foreground">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
