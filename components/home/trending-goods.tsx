"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const trendingGoods = [
  {
    id: 1,
    title: "오후셋 콘서트 기념 머그컵",
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
    title: "블루시그널 미니 포스터",
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
    title: "슬로우먼데이 폰케이스",
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

function IconClose() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  )
}

function GoodsModal({ goods, onClose }: { goods: Goods; onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const progress = (goods.currentParticipants / goods.targetParticipants) * 100
  const discount = Math.round((1 - goods.currentPrice / goods.originalPrice) * 100)
  const artistFee = Math.round(goods.currentPrice * 0.03)
  const totalPrice = goods.currentPrice + 3000 + artistFee

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-5 transition-all duration-280",
        visible ? "bg-black/40" : "bg-black/0"
      )}
      onClick={handleClose}
    >
      {/* 모달 카드 — 중앙에서 확대 */}
      <div
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-out",
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-all hover:bg-black/20"
        >
          <IconClose />
        </button>

        {/* 상단 이미지 — 비율 축소해서 텍스트 공간 확보 */}
        <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16/9" }}>
          <Image src={goods.image} alt={goods.title} fill className="object-cover" />
          {/* 이미지 위 그라디언트 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* 배지들 */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-foreground">
              <IconClock />
              <span className="ml-0.5">D-{goods.daysLeft}</span>
            </span>
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-white">
              {discount}% 할인
            </span>
          </div>
        </div>

        {/* 본문 — 텍스트 중심 */}
        <div className="px-5 pb-5 pt-4">

          {/* 아티스트 태그 + 제목 */}
          <div className="mb-4">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
              {goods.artist}
            </span>
            <h2 className="text-lg font-bold leading-snug text-foreground">{goods.title}</h2>
          </div>

          <div className="mb-4 h-px bg-border" />

          {/* 가격 */}
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="mb-0.5 text-[11px] text-muted-foreground">현재 가격</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{goods.currentPrice.toLocaleString()}원</span>
                <span className="text-sm text-muted-foreground line-through">{goods.originalPrice.toLocaleString()}원</span>
              </div>
            </div>
            <span className="rounded-2xl bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
              {discount}% off
            </span>
          </div>

          {/* 가격 세부 */}
          <div className="mb-4 space-y-1.5 rounded-2xl bg-secondary/50 px-4 py-3 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>배송비</span>
              <span className="font-medium text-foreground">3,000원</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>아티스트 수수료 3%</span>
              <span className="font-medium text-primary">{artistFee.toLocaleString()}원</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
              <span>합계</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mb-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <IconUsers />
                <span className="ml-0.5">
                  <strong className="text-foreground">{goods.currentParticipants}명</strong> 참여중
                </span>
              </div>
              <span className="font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-[11px] text-muted-foreground">
              목표 {goods.targetParticipants}명 달성 시 제작이 확정됩니다
            </p>
          </div>

          {/* CTA */}
          <Link
            href={`/goods/${goods.id}`}
            onClick={handleClose}
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
          >
            참여하기 · {totalPrice.toLocaleString()}원
          </Link>
        </div>
      </div>
    </div>
  )
}

export function TrendingGoods() {
  const [selectedGoods, setSelectedGoods] = useState<Goods | null>(null)

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
            <button
              key={goods.id}
              type="button"
              onClick={() => setSelectedGoods(goods)}
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
            </button>
          )
        })}
      </div>

      {selectedGoods && (
        <GoodsModal goods={selectedGoods} onClose={() => setSelectedGoods(null)} />
      )}
    </section>
  )
}
