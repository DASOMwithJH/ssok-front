"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const trendingGoods = [
  {
    id: 1,
    title: "IU 콘서트 기념 머그컵",
    artist: "IU",
    image: "/goods/mug-1.jpg",
    currentParticipants: 45,
    targetParticipants: 50,
    originalPrice: 18000,
    currentPrice: 12000,
    daysLeft: 3,
  },
  {
    id: 2,
    title: "BTS 아크릴 키링 세트",
    artist: "BTS",
    image: "/goods/keyring-1.jpg",
    currentParticipants: 120,
    targetParticipants: 150,
    originalPrice: 15000,
    currentPrice: 8000,
    daysLeft: 5,
  },
  {
    id: 3,
    title: "NewJeans 미니 포스터",
    artist: "NewJeans",
    image: "/goods/poster-1.jpg",
    currentParticipants: 78,
    targetParticipants: 100,
    originalPrice: 9000,
    currentPrice: 5000,
    daysLeft: 7,
  },
  {
    id: 4,
    title: "aespa 폰케이스",
    artist: "aespa",
    image: "/goods/phonecase-1.jpg",
    currentParticipants: 32,
    targetParticipants: 80,
    originalPrice: 25000,
    currentPrice: 15000,
    daysLeft: 10,
  },
]

export function TrendingGoods() {
  return (
    <section className="py-5">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">인기 공동구매</h2>
          <span className="flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <Clock className="h-3 w-3" />
            마감임박
          </span>
        </div>
        <Link href="/goods" className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary">
          더보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      
      {/* Horizontal scrolling cards */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {trendingGoods.map((goods) => {
          const progress = (goods.currentParticipants / goods.targetParticipants) * 100
          const discount = Math.round((1 - goods.currentPrice / goods.originalPrice) * 100)
          
          return (
            <Link 
              key={goods.id} 
              href={`/goods/${goods.id}`}
              className="group min-w-[160px] flex-shrink-0"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/50 transition-all group-hover:shadow-md group-active:scale-[0.98]">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={goods.image}
                    alt={goods.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {/* D-day badge */}
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-foreground/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    D-{goods.daysLeft}
                  </div>
                  {/* Discount badge */}
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
    </section>
  )
}
