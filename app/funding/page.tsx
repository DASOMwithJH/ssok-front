"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { api, FundingProject, ProjectStatus } from "@/lib/api"

const dummyProject: FundingProject = {
  projectId: -1,
  title: "오후셋 단독공연 기념 머그컵",
  description: "",
  aiImageUrl: "/goods/mug-1.jpg",
  status: "RECRUITING",
  artistId: 0,
  artistProfileImg: "",
  artistBio: "",
  vendorId: 0,
  companyName: "오후셋",
  shippingFee: 3000,
  categoryName: "머그컵",
  minOrderQuantity: 30,
  weeklyMaxCapacity: 100,
  priceTiers: [],
  targetCount: 80,
  currentCount: 45,
  maxUnitPrice: 15000,
  achievementRate: 56,
  targetDate: "",
  createdAt: "2024-02-10T00:00:00",
}

const tabs = [
  { id: "all", label: "전체" },
  { id: "RECRUITING", label: "진행중" },
  { id: "PENDING_VENDOR", label: "심사중" },
  { id: "done", label: "완료" },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING_VENDOR: { label: "심사중", color: "bg-amber-100 text-amber-600" },
  RECRUITING: { label: "진행중", color: "bg-primary/10 text-primary" },
  CONFIRMED: { label: "모집완료", color: "bg-green-100 text-green-600" },
  PRODUCING: { label: "제작중", color: "bg-blue-100 text-blue-600" },
  DONE: { label: "완료", color: "bg-green-100 text-green-600" },
  CANCELLED: { label: "취소", color: "bg-gray-100 text-gray-500" },
}

const doneStatuses: ProjectStatus[] = ["CONFIRMED", "PRODUCING", "DONE", "CANCELLED"]

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

interface PendingProject {
  title: string
  description: string
  imageUrl: string | null
  vendorName: string
  createdAt: string
}

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [projects, setProjects] = useState<FundingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingProject, setPendingProject] = useState<PendingProject | null>(null)

  useEffect(() => {
    api.getProjects()
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))

    try {
      const raw = localStorage.getItem("ssok:pendingProject")
      if (raw) setPendingProject(JSON.parse(raw))
    } catch {}
  }, [])

  const allProjects = [dummyProject, ...projects]

  const filtered = activeTab === "all"
    ? allProjects
    : activeTab === "done"
      ? allProjects.filter(p => doneStatuses.includes(p.status))
      : allProjects.filter(p => p.status === activeTab)

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="px-4 py-4">
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-muted-foreground">불러오는 중...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 수락 대기중 카드 */}
            {pendingProject && (activeTab === "all" || activeTab === "RECRUITING") && (
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-primary/30">
                <div className="flex gap-3 p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    {pendingProject.imageUrl
                      ? <img src={pendingProject.imageUrl} alt={pendingProject.title} className="h-full w-full object-cover" />
                      : <div className="h-full w-full bg-secondary" />
                    }
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-500">수락 대기중</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(pendingProject.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, "")}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-primary">{pendingProject.vendorName}</p>
                      <h3 className="line-clamp-1 text-sm font-bold text-foreground">{pendingProject.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground">업체 수락 후 모집이 시작돼요</p>
                  </div>
                </div>
              </div>
            )}

            {filtered.length === 0 && !pendingProject ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-3 text-4xl">📭</div>
                <p className="text-sm font-medium text-foreground">등록된 펀딩이 없어요</p>
                <p className="mt-1 text-xs text-muted-foreground">새 펀딩을 등록해보세요</p>
              </div>
            ) : null}

            {filtered.map((funding) => {
              const progress = funding.targetCount > 0
                ? Math.min((funding.currentCount / funding.targetCount) * 100, 100)
                : 0
              const status = statusConfig[funding.status]
              const isRecruiting = funding.status === "RECRUITING"
              const isPending = funding.status === "PENDING_VENDOR"
              const createdAt = new Date(funding.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric", month: "2-digit", day: "2-digit"
              }).replace(/\. /g, ".").replace(/\.$/, "")

              return (
                <div
                  key={funding.projectId}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/50"
                >
                  <div className="flex gap-3 p-3">
                    {/* 썸네일 */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      {funding.aiImageUrl
                        ? <img src={funding.aiImageUrl} alt={funding.title} className="h-full w-full object-cover" />
                        : <div className="h-full w-full bg-secondary" />
                      }
                    </div>

                    {/* 정보 */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", status.color)}>
                            {status.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{createdAt}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-primary">{funding.categoryName}</p>
                        <h3 className="line-clamp-1 text-sm font-bold text-foreground">{funding.title}</h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">{funding.maxUnitPrice.toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>

                  {/* 진행률 — 진행중/완료 */}
                  {isRecruiting && (
                    <div className="border-t border-border/50 px-3 py-2.5">
                      <div className="mb-1.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <IconUsers />
                          <span>
                            <strong className="text-foreground">{funding.currentCount}명</strong> / {funding.targetCount}명
                          </span>
                        </div>
                        <span className="font-bold text-primary">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  )}

                  {/* 심사중 메시지 */}
                  {isPending && (
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
