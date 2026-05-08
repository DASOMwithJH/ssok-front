"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ClipboardPlus, ShoppingBag, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const banners = [
  {
    id: 1,
    title: "AI 굿즈 만들기",
    subtitle: "처음 아이디어부터",
    description: "좋아하는 아티스트의 분위기를 담아 굿즈 디자인을 만들어보세요",
    gradient: "from-primary/90 to-accent",
    link: "/create",
  },
  {
    id: 2,
    title: "펀딩 등록 시작",
    subtitle: "제작 조건 확정",
    description: "승락된 디자인과 제작 단가로 굿즈 펀딩을 등록하세요",
    gradient: "from-accent to-primary/80",
    link: "/funding",
  },
  {
    id: 3,
    title: "진행 중인 공동구매",
    subtitle: "마감 임박",
    description: "팬들이 함께 만든 굿즈를 둘러보고 참여해보세요",
    gradient: "from-primary to-accent/90",
    link: "/goods",
  },
]

export function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  return (
    <section className="px-4 pb-2 pt-3">
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className={cn("relative min-w-full bg-gradient-to-r p-6 pb-8", banner.gradient)}
            >
              <div className="relative z-10">
                <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  {banner.subtitle}
                </div>
                <h2 className="mb-1 text-2xl font-bold text-white">{banner.title}</h2>
                <p className="text-sm leading-5 text-white/90">{banner.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            prevBanner()
          }}
          className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-md backdrop-blur-sm transition-all hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            nextBanner()
          }}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-foreground shadow-md backdrop-blur-sm transition-all hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.preventDefault()
                setCurrentBanner(index)
              }}
              className={cn("h-1.5 rounded-full transition-all", currentBanner === index ? "w-4 bg-white" : "w-1.5 bg-white/50")}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link
          href="/create"
          className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl bg-primary px-2 py-3 text-center text-xs font-semibold leading-tight text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4" />
          AI로 굿즈 만들기
        </Link>
        <Link
          href="/funding"
          className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl bg-primary px-2 py-3 text-center text-xs font-semibold leading-tight text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
        >
          <ClipboardPlus className="h-4 w-4" />
          펀딩 등록하기
        </Link>
        <Link
          href="/goods"
          className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl bg-primary px-2 py-3 text-center text-xs font-semibold leading-tight text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          공동구매 참여하기
        </Link>
      </div>
    </section>
  )
}
