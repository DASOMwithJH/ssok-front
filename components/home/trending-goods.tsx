"use client"

import Image from "next/image"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const trendingGoods = [
  {
    id: 1,
    title: "오후셋 단독공연 기념 머그컵",
    artist: "오후셋",
    image: "/goods/mug-1.jpg",
    currentParticipants: 45,
    targetParticipants: 50,
    originalPrice: 18000,
    currentPrice: 12000,
    daysLeft: 3,
  },
  {
    id: 2,
    title: "라스트버스 아크릴 키링 세트",
    artist: "라스트버스",
    image: "/goods/keyring-1.jpg",
    currentParticipants: 120,
    targetParticipants: 150,
    originalPrice: 15000,
    currentPrice: 8000,
    daysLeft: 5,
  },
  {
    id: 3,
    title: "블루시그널 도시 감성 미니 포스터",
    artist: "블루시그널",
    image: "/goods/poster-1.jpg",
    currentParticipants: 78,
    targetParticipants: 100,
    originalPrice: 9000,
    currentPrice: 5000,
    daysLeft: 7,
  },
  {
    id: 4,
    title: "슬로우먼데이 감성 폰케이스",
    artist: "슬로우먼데이",
    image: "/goods/phonecase-1.jpg",
    currentParticipants: 32,
    targetParticipants: 80,
    originalPrice: 25000,
    currentPrice: 15000,
    daysLeft: 10,
  },
]

type Goods = typeof trendingGoods[number]

function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5.5" />
      <polyline points="7,3.5 7,7 9.5,8.5" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4" r="2.5" />
      <path d="M1 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="12" cy="4.5" r="2" />
      <path d="M14.5 13c0-2-1.3-3.7-3-4.4" />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="7" x2="12" y2="7" />
      <polyline points="8,3 12,7 8,11" />
    </svg>
  )
}

export function TrendingGoods() {
  return (
    <section className="py-5">
      <div className="px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">인기 공동제작</h2>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
            <IconClock />
            마감임박
          </span>
        </div>
        <Link href="/goods" className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary">
          더보기
          <IconArrowRight />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {trendingGoods.map((goods) => {
          const progress = (goods.currentParticipants / goods.targetParticipants) * 100
          const discount = Math.round((1 - goods.currentPrice / goods.originalPrice) * 100)

          return (
            <div
              key={goods.id}
              className="group min-w-[160px] flex-shrink-0 text-left"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/50 transition-all group-hover:shadow-md group-active:scale-[0.97]">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={goods.image}
                    alt={goods.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                    <IconClock />
                    D-{goods.daysLeft}
                  </div>
                  <div className="absolute right-2 top-2 rounded-lg bg-primary px-2 py-1 text-[10px] font-bold text-white">
                    {discount}%
                  </div>
                </div>

                <div className="p-3">
                  <p className="mb-0.5 text-[10px] font-semibold text-primary">{goods.artist}</p>
                  <h3 className="mb-2 line-clamp-2 text-xs font-semibold leading-tight text-foreground">{goods.title}</h3>
                  <div className="mb-1 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-foreground">{goods.currentPrice.toLocaleString()}원</span>
                    <span className="text-[10px] text-muted-foreground line-through">{goods.originalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-0.5 text-muted-foreground">
                        <IconUsers />
                        <span>{goods.currentParticipants}명</span>
                      </div>
                      <span className="font-semibold text-primary">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
