"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CalendarDays, CheckCircle, ClipboardPlus, ImagePlus, Package, Plus, Truck } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const priceTiers = [
  { range: "30~49개", price: "18,000원" },
  { range: "50~99개", price: "15,000원" },
  { range: "100개 이상", price: "12,000원" },
]

export default function FundingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="px-4 py-4">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">펀딩 등록하기</h1>
            <p className="text-xs text-muted-foreground">업체가 승락한 제작 조건으로 굿즈 펀딩을 등록하세요</p>
          </div>
        </div>

        <section className="mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ClipboardPlus className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">등록 전 확인</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white p-3 ring-1 ring-border/60">
              <Package className="mx-auto mb-1 h-4 w-4 text-primary" />
              <p className="text-[10px] font-semibold text-foreground">디자인 확정</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-border/60">
              <CheckCircle className="mx-auto mb-1 h-4 w-4 text-primary" />
              <p className="text-[10px] font-semibold text-foreground">업체 승락</p>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-border/60">
              <Truck className="mx-auto mb-1 h-4 w-4 text-primary" />
              <p className="text-[10px] font-semibold text-foreground">배송비 확인</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-border/60">
            <h2 className="mb-3 text-sm font-bold text-foreground">펀딩 기본 정보</h2>
            <div className="space-y-3">
              <Input placeholder="펀딩 제목" defaultValue="인디밴드 콘서트 기념 머그컵" className="rounded-xl bg-secondary/50" />
              <Textarea
                placeholder="굿즈 소개"
                defaultValue="공연의 분위기와 밴드의 공식 이미지를 바탕으로 제작한 한정 굿즈입니다."
                className="min-h-24 rounded-xl bg-secondary/50"
              />
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-secondary/40 px-4 py-5 text-center">
                <ImagePlus className="mb-2 h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-foreground">대표 이미지 등록</span>
                <span className="mt-1 text-[11px] text-muted-foreground">생성된 굿즈 이미지나 목업을 올려주세요</span>
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-border/60">
            <h2 className="mb-3 text-sm font-bold text-foreground">제작 조건</h2>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="최소 수량" defaultValue="30개" className="rounded-xl bg-secondary/50" />
              <Input placeholder="최대 수량" defaultValue="200개" className="rounded-xl bg-secondary/50" />
              <Input placeholder="배송비" defaultValue="3,000원" className="rounded-xl bg-secondary/50" />
              <Input placeholder="마감일" defaultValue="14일 후" className="rounded-xl bg-secondary/50" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-border/60">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">수량별 금액</h2>
              <button type="button" className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-[11px] font-semibold text-foreground">
                <Plus className="h-3 w-3" />
                추가
              </button>
            </div>
            <div className="space-y-2">
              {priceTiers.map((tier) => (
                <div key={tier.range} className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2">
                  <span className="text-xs font-medium text-muted-foreground">{tier.range}</span>
                  <span className="text-sm font-bold text-foreground">{tier.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
              처음 결제 금액은 최대 금액으로 안내하고, 확정 수량에 따라 차액 환불이 진행됩니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-border/60">
            <h2 className="mb-3 text-sm font-bold text-foreground">펀딩 일정</h2>
            <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">등록 후 심사 완료 시 공개</p>
                <p className="text-[11px] text-muted-foreground">업체 조건, 이미지, 아티스트 자료 사용 여부를 확인합니다</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 active:scale-[0.98]"
          >
            펀딩 등록 요청하기
          </button>
        </section>
      </main>

      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-white px-5 py-6 text-center shadow-2xl">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="text-lg font-bold text-foreground">펀딩 등록 요청을 보냈어요!</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">심사가 완료되면 펀딩 페이지가 공개됩니다.</p>
            <Link
              href="/"
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-white"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
