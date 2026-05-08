"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const myFundings = [
  {
    id: 1,
    title: "인디밴드 콘서트 기념 머그컵",
    artist: "인디밴드 A",
    image: "/goods/mug-1.jpg",
    status: "ongoing",
    currentParticipants: 45,
    targetParticipants: 80,
    currentPrice: 15000,
    daysLeft: 8,
    createdAt: "2024.02.10",
  },
  {
    id: 2,
    title: "K-pop 페스티벌 기념 에코백",
    artist: "페스티벌 공식",
    image: "/goods/bag-1.jpg",
    status: "review",
    currentParticipants: 0,
    targetParticipants: 50,
    currentPrice: 18000,
    daysLeft: null,
    createdAt: "2024.02.12",
  },
  {
    id: 3,
    title: "NewJeans 팬미팅 아크릴 키링",
    artist: "NewJeans",
    image: "/goods/keyring-1.jpg",
    status: "completed",
    currentParticipants: 120,
    targetParticipants: 100,
    currentPrice: 8000,
    daysLeft: 0,
    createdAt: "2024.01.20",
  },
]

const tabs = [
  { id: "all", label: "전체" },
  { id: "ongoing", label: "진행중" },
  { id: "review", label: "심사중" },
  { id: "completed", label: "완료" },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  ongoing: { label: "진행중", color: "bg-primary/10 text-primary" },
  review: { label: "심사중", color: "bg-amber-100 text-amber-600" },
  completed: { label: "모집완료", color: "bg-green-100 text-green-600" },
}

function IconPlus() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="11" y1="4" x2="11" y2="18" />
      <line x1="4" y1="11" x2="18" y2="11" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4" r="2.5" />
      <path d="M1 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="12" cy="4.5" r="2" />
      <path d="M14.5 13c0-2-1.3-3.7-3-4.4" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5.5" />
      <polyline points="7,3.5 7,7 9.5,8.5" />
    </svg>
  )
}

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered = activeTab === "all"
    ? myFundings
    : myFundings.filter(f => f.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="px-4 py-4">
        {/* 타이틀 */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-foreground">내 펀딩</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">내가 등록한 굿즈 펀딩 현황이에요</p>
        </div>

        {/* 탭 */}
        <div className="mb-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm shadow-primary/25"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 펀딩 목록 */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 text-4xl">📭</div>
            <p className="text-sm font-medium text-foreground">등록된 펀딩이 없어요</p>
            <p className="mt-1 text-xs text-muted-foreground">새 펀딩을 등록해보세요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((funding) => {
              const progress = Math.min((funding.currentParticipants / funding.targetParticipants) * 100, 100)
              const status = statusConfig[funding.status]

              return (
                <div
                  key={funding.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/50"
                >
                  <div className="flex gap-3 p-3">
                    {/* 썸네일 */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <Image src={funding.image} alt={funding.title} fill className="object-cover" />
                    </div>

                    {/* 정보 */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", status.color)}>
                            {status.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{funding.createdAt}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-primary">{funding.artist}</p>
                        <h3 className="line-clamp-1 text-sm font-bold text-foreground">{funding.title}</h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">{funding.currentPrice.toLocaleString()}원</span>
                        {funding.status === "ongoing" && funding.daysLeft !== null && (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <IconClock />
                            D-{funding.daysLeft}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 진행률 — 진행중/완료만 */}
                  {(funding.status === "ongoing" || funding.status === "completed") && (
                    <div className="border-t border-border/50 px-3 py-2.5">
                      <div className="mb-1.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IconUsers />
                          <span>
                            <strong className="text-foreground">{funding.currentParticipants}명</strong> / {funding.targetParticipants}명
                          </span>
                        </div>
                        <span className="font-bold text-primary">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  )}

                  {/* 심사중 메시지 */}
                  {funding.status === "review" && (
                    <div className="border-t border-border/50 bg-amber-50/60 px-3 py-2.5">
                      <p className="text-[11px] text-amber-600">
                        업체 조건 및 이미지 심사 중입니다. 완료되면 알려드릴게요.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

<BottomNav />
    </div>
  )
}
