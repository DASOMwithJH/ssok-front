"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FundingProject } from "@/lib/api"

function IconClose() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
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

export function GoodsModal({ goods, onClose }: { goods: FundingProject; onClose: () => void }) {
  const [visible, setVisible] = useState(false)
  const progress = goods.targetCount > 0 ? (goods.currentCount / goods.targetCount) * 100 : 0
  const artistFee = Math.round(goods.maxUnitPrice * 0.03)
  const totalPrice = goods.maxUnitPrice + (goods.shippingFee ?? 3000) + artistFee
  const isCompleted = goods.status !== "RECRUITING"

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
      <div
        className={cn(
          "relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-out",
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-sm transition-all hover:bg-black/20"
        >
          <IconClose />
        </button>

        <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16/9" }}>
          {goods.aiImageUrl
            ? <img src={goods.aiImageUrl} alt={goods.title} className="h-full w-full object-cover" />
            : <div className="h-full w-full bg-secondary" />
          }
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3">
            {isCompleted ? (
              <span className="rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-bold text-white">
                모집완료
              </span>
            ) : (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-foreground">
                {goods.categoryName}
              </span>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <div className="mb-4">
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
              {goods.companyName}
            </span>
            <h2 className="text-lg font-bold leading-snug text-foreground">{goods.title}</h2>
          </div>

          <div className="mb-4 h-px bg-border" />

          <div className="mb-4">
            <p className="mb-0.5 text-[11px] text-muted-foreground">현재 가격</p>
            <span className="text-2xl font-bold text-foreground">{goods.maxUnitPrice.toLocaleString()}원</span>
          </div>

          <div className="mb-4 space-y-1.5 rounded-2xl bg-secondary/50 px-4 py-3 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>배송비</span>
              <span className="font-medium text-foreground">{(goods.shippingFee ?? 3000).toLocaleString()}원</span>
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

          <div className="mb-5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <IconUsers />
                <span className="ml-0.5">
                  <strong className="text-foreground">{goods.currentCount}명</strong> 참여중
                </span>
              </div>
              <span className="font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-[11px] text-muted-foreground">
              목표 {goods.targetCount}명 달성 시 제작이 확정됩니다
            </p>
          </div>

          <Link
            href={`/goods/${goods.projectId}`}
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
