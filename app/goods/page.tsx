"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Progress } from "@/components/ui/progress"
import { Users, SlidersHorizontal, ChevronLeft, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "전체", emoji: "🎁" },
  { id: "mug", name: "머그컵", emoji: "☕" },
  { id: "phonecase", name: "폰케이스", emoji: "📱" },
  { id: "bag", name: "에코백", emoji: "👜" },
  { id: "poster", name: "포스터", emoji: "🖼️" },
  { id: "apparel", name: "의류", emoji: "👕" },
  { id: "keyring", name: "키링", emoji: "🔑" },
]

const goodsList = [
  {
    id: 1,
    title: "IU 콘서트 기념 머그컵",
    artist: "IU",
    category: "mug",
    image: "/goods/mug-1.jpg",
    currentParticipants: 45,
    targetParticipants: 50,
    originalPrice: 18000,
    currentPrice: 12000,
    daysLeft: 3,
    status: "ongoing",
  },
  {
    id: 2,
    title: "BTS 아크릴 키링 세트",
    artist: "BTS",
    category: "keyring",
    image: "/goods/keyring-1.jpg",
    currentParticipants: 120,
    targetParticipants: 150,
    originalPrice: 15000,
    currentPrice: 8000,
    daysLeft: 5,
    status: "ongoing",
  },
  {
    id: 3,
    title: "NewJeans 미니 포스터",
    artist: "NewJeans",
    category: "poster",
    image: "/goods/poster-1.jpg",
    currentParticipants: 78,
    targetParticipants: 100,
    originalPrice: 9000,
    currentPrice: 5000,
    daysLeft: 7,
    status: "ongoing",
  },
  {
    id: 4,
    title: "aespa 폰케이스",
    artist: "aespa",
    category: "phonecase",
    image: "/goods/phonecase-1.jpg",
    currentParticipants: 32,
    targetParticipants: 80,
    originalPrice: 25000,
    currentPrice: 15000,
    daysLeft: 10,
    status: "ongoing",
  },
  {
    id: 5,
    title: "SEVENTEEN 에코백",
    artist: "SEVENTEEN",
    category: "bag",
    image: "/goods/bag-1.jpg",
    currentParticipants: 200,
    targetParticipants: 200,
    originalPrice: 28000,
    currentPrice: 18000,
    daysLeft: 0,
    status: "completed",
  },
  {
    id: 6,
    title: "Stray Kids 후드티",
    artist: "Stray Kids",
    category: "apparel",
    image: "/goods/hoodie-1.jpg",
    currentParticipants: 55,
    targetParticipants: 100,
    originalPrice: 55000,
    currentPrice: 42000,
    daysLeft: 14,
    status: "ongoing",
  },
]

export default function GoodsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredGoods = selectedCategory === "all" 
    ? goodsList 
    : goodsList.filter(g => g.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      {/* Page Header */}
      <div className="sticky top-14 z-40 bg-background">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-bold text-foreground">공동구매</h1>
          </div>
          <button className="flex h-9 items-center gap-1.5 rounded-xl bg-secondary px-3 text-xs font-medium text-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            필터
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all",
                selectedCategory === category.id 
                  ? "bg-primary text-white shadow-md shadow-primary/25" 
                  : "bg-secondary text-foreground"
              )}
            >
              <span>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Goods Grid */}
      <main className="px-4 pt-2">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            총 <span className="font-semibold text-foreground">{filteredGoods.length}</span>개의 굿즈
          </p>
          <button className="text-xs text-muted-foreground">
            최신순
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredGoods.map((goods) => {
            const progress = (goods.currentParticipants / goods.targetParticipants) * 100
            const discount = Math.round((1 - goods.currentPrice / goods.originalPrice) * 100)
            
            return (
              <Link key={goods.id} href={`/goods/${goods.id}`}>
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/50 transition-all active:scale-[0.98]">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <Image
                      src={goods.image}
                      alt={goods.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Status Badge */}
                    {goods.status === "completed" ? (
                      <div className="absolute left-2 top-2 rounded-lg bg-green-500 px-2 py-1 text-[10px] font-bold text-white">
                        모집완료
                      </div>
                    ) : (
                      <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-lg bg-foreground/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <Clock className="h-3 w-3" />
                        D-{goods.daysLeft}
                      </div>
                    )}
                    {/* Discount Badge */}
                    <div className="absolute right-2 top-2 rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white">
                      {discount}%
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3">
                    <p className="mb-0.5 text-[10px] font-medium text-primary">{goods.artist}</p>
                    <h3 className="mb-2 line-clamp-2 text-xs font-semibold leading-tight text-foreground">{goods.title}</h3>
                    
                    {/* Price */}
                    <div className="mb-2 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-foreground">
                        {goods.currentPrice.toLocaleString()}원
                      </span>
                      <span className="text-[10px] text-muted-foreground line-through">
                        {goods.originalPrice.toLocaleString()}원
                      </span>
                    </div>
                    <p className="mb-2 break-keep text-[10px] leading-4 text-muted-foreground">
                      아티스트 수수료 3% 별도
                    </p>
                    
                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-0.5 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{goods.currentParticipants}명</span>
                        </div>
                        <span className="font-semibold text-primary">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
      
      <BottomNav />
    </div>
  )
}
