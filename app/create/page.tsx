"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

type Screen = "input" | "generating" | "result" | "vendors"

const vendors = [
  { id: 1, name: "굿즈메이커", initial: "굿", color: "bg-orange-100 text-orange-500", tag: "빠른제작", rating: 4.8, orders: 127, minQty: 30, maxQty: 200, price: "12,000원~", days: 7, categories: ["mug", "keyring", "phonecase"] },
  { id: 2, name: "프리메이드 코리아", initial: "프", color: "bg-blue-100 text-blue-500", tag: "대량할인", rating: 4.6, orders: 89, minQty: 50, maxQty: 500, price: "10,000원~", days: 10, categories: ["bag", "tshirt", "poster"] },
  { id: 3, name: "아이돌굿즈", initial: "아", color: "bg-pink-100 text-pink-500", tag: "팬굿즈 전문", rating: 4.9, orders: 256, minQty: 20, maxQty: 100, price: "15,000원~", days: 5, categories: ["keyring", "poster", "phonecase", "mug"] },
  { id: 4, name: "크리에이티브랩", initial: "크", color: "bg-violet-100 text-violet-500", tag: "고퀄리티", rating: 4.7, orders: 64, minQty: 30, maxQty: 150, price: "18,000원~", days: 8, categories: ["tshirt", "bag", "mug"] },
]

const goodsCategories = [
  { id: "mug", name: "머그컵", icon: "☕" },
  { id: "keyring", name: "키링", icon: "🔑" },
  { id: "poster", name: "포스터", icon: "🖼️" },
  { id: "phonecase", name: "폰케이스", icon: "📱" },
  { id: "bag", name: "에코백", icon: "👜" },
  { id: "tshirt", name: "티셔츠", icon: "👕" },
]

const artists = [
  { id: 1, name: "오후셋", desc: "느린 오후의 감성을 노래하는 4인조 밴드" },
  { id: 2, name: "세컨드플로어", desc: "소극장 기반의 인디 록 밴드" },
  { id: 3, name: "블루시그널", desc: "도시적인 감성 록 밴드" },
  { id: 4, name: "라스트버스", desc: "막차와 밤거리를 노래하는 밴드" },
  { id: 5, name: "슬로우먼데이", desc: "무기력한 월요일의 감성을 담은 밴드" },
  { id: 6, name: "노웨어스테이지", desc: "아직 더 많은 무대가 필요한 신인 밴드" },
  { id: 7, name: "플레인무드", desc: "과하지 않은 미니멀 밴드 사운드" },
  { id: 8, name: "애프터노이즈", desc: "거칠지만 감정적인 기타 중심 밴드" },
]

const generatedDesigns = [
  { id: 1, image: "/generated/design-1.jpg" },
  { id: 2, image: "/generated/design-2.jpg" },
  { id: 3, image: "/generated/design-3.jpg" },
  { id: 4, image: "/generated/design-4.jpg" },
]

function IconClose() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,7 5.5,10.5 12,3" />
    </svg>
  )
}

export default function CreatePage() {
  const [screen, setScreen] = useState<Screen>("input")
  const [animating, setAnimating] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [referencePreview, setReferencePreview] = useState<string | null>(null)
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null)
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [fundingTitle, setFundingTitle] = useState("")
  const [fundingDesc, setFundingDesc] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const transition = (next: Screen, delay = 0) => {
    setAnimating(true)
    setTimeout(() => {
      setScreen(next)
      setAnimating(false)
    }, delay)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setReferenceImage(file)
    setReferencePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setReferenceImage(null)
    setReferencePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = () => {
    if (!prompt.trim()) return
    transition("generating")
    setTimeout(() => transition("result"), 2800)
  }

  return (
    <div className="min-h-screen bg-white pb-28">
      <style>{`
        @keyframes screen-in {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50%       { opacity: 1; transform: scale(1); }
        }
        .screen-in  { animation: screen-in 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) both; }
        .screen-out { opacity: 0; transform: translateY(-16px) scale(0.97); transition: all 0.22s ease-in; }
        .float      { animation: float 3.2s ease-in-out infinite; }
        .mascot     { mix-blend-mode: multiply; }
      `}</style>

      <Header />

      {/* 입력 화면 */}
      {screen === "input" && (
        <main className={cn("px-5 pt-2", animating ? "screen-out" : "screen-in")}>

          <div className="flex flex-col items-center pt-2 pb-7">
            <div className="float relative h-44 w-44 mb-2">
              <Image
                src="/mascot/dog_wave.png"
                alt=""
                fill
                className="mascot object-contain"
                priority
              />
            </div>

            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">for every fan</p>
            <h1 className="text-center text-xl font-bold leading-snug text-foreground">
              좋아하는 마음을<br />굿즈로 표현해보세요
            </h1>
            <p className="mt-3 text-center text-sm leading-6 text-muted-foreground">
              팬의 진심은 언제나 특별해요<br />ssok이 그 마음을 담아 만들어드릴게요
            </p>
          </div>

          <div className="space-y-4">
            {/* 내 아티스트 선택 — 가로 스크롤 4개 */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-2.5">
                내 아티스트 <span className="font-normal">· 찜한 목록</span>
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {artists.slice(0, 4).map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedArtist(selectedArtist === a.id ? null : a.id)}
                    className={cn(
                      "shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-4 py-2.5 text-center transition-all",
                      selectedArtist === a.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    <span className="text-xs font-bold whitespace-nowrap">{a.name}</span>
                    <span className={cn("text-[9px] leading-tight max-w-[72px] line-clamp-1",
                      selectedArtist === a.id ? "text-white/80" : "text-muted-foreground/70"
                    )}>{a.desc.split(" ").slice(0, 3).join(" ")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 굿즈 카테고리 선택 */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-2.5">굿즈 종류</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {goodsCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={cn(
                      "shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                      selectedCategory === cat.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 텍스트 입력 */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={"추가로 원하는 분위기나 스타일을 알려주세요\n\n예) 봄 느낌의 따뜻한 색감,\n아기자기한 일러스트 스타일로..."}
              rows={4}
              className="w-full resize-none rounded-3xl border-2 border-border/50 bg-secondary/20 px-5 py-4 text-sm leading-7 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-white focus:ring-0 transition-all"
            />

            {/* 이미지 첨부 + 버튼 한 줄 */}
            <input ref={fileInputRef} id="ref-img" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />

            {referencePreview ? (
              <div className="overflow-hidden rounded-2xl ring-1 ring-border/50">
                <div className="relative aspect-[16/9] w-full">
                  <Image src={referencePreview} alt="참고 이미지" fill className="object-cover" unoptimized />
                </div>
                <div className="flex items-center justify-between bg-secondary/30 px-4 py-2.5">
                  <p className="truncate text-xs font-medium text-muted-foreground">{referenceImage?.name}</p>
                  <button type="button" onClick={removeImage} className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    <IconClose />
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="ref-img" className="flex cursor-pointer items-center gap-2.5 self-start rounded-2xl border border-border/60 bg-white px-4 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary w-full justify-center">
                <span className="text-base">📎</span>
                참고 이미지 첨부 <span className="text-xs text-muted-foreground/60">(선택)</span>
              </label>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-35"
            >
              굿즈 만들러 가기
            </button>
          </div>
        </main>
      )}

      {/* 생성 중 화면 */}
      {screen === "generating" && (
        <main className={cn("flex flex-col items-center justify-center px-5 pt-32", animating ? "screen-out" : "screen-in")}>
          <div className="float relative mb-1 h-48 w-48 translate-x-4">
            <Image src="/mascot/dog_sleep.png" alt="" fill className="mascot object-contain" priority />
          </div>

          <h2 className="text-[1.75rem] font-bold text-foreground text-center leading-snug">
            만드는 중이에요
          </h2>
          <p className="mt-3 text-center text-sm leading-7 text-muted-foreground">
            덕심이 가득한 굿즈를 완성하기 위해<br />열심히 작업하고 있어요 🐾<br />조금만 기다려주세요!
          </p>

          <div className="mt-10 flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2.5 w-2.5 rounded-full bg-primary"
                style={{ animation: `blink-dot 1.4s ease-in-out ${i * 0.22}s infinite` }}
              />
            ))}
          </div>
        </main>
      )}

      {/* 결과 화면 */}
      {screen === "result" && !done && (
        <main className={cn("px-5 pt-4 space-y-5", animating ? "screen-out" : "screen-in")}>
          <div className="flex items-center gap-3 pb-1">
            <div className="relative h-20 w-20 shrink-0">
              <Image src="/mascot/dog_peace.png" alt="" fill className="mascot object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary mb-0.5">완성됐어요!</p>
              <h1 className="text-base font-bold text-foreground">디자인이 도착했어요</h1>
            </div>
          </div>

          {/* 디자인 1장 */}
          <div className="relative w-full aspect-square overflow-hidden rounded-3xl bg-secondary/30 shadow-sm ring-1 ring-border/40">
            <Image src={generatedDesigns[0].image} alt="생성된 디자인" fill className="object-cover" />
          </div>

          {/* 피드백 */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">수정하고 싶은 부분이 있나요?</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={"예) 색감을 더 따뜻하게,\n강아지 캐릭터 추가해줘..."}
              rows={3}
              className="w-full resize-none rounded-2xl border border-border/50 bg-secondary/20 px-4 py-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-white transition-all"
            />
            <button
              type="button"
              disabled={!feedback.trim()}
              onClick={() => { setFeedback(""); transition("generating"); setTimeout(() => transition("result"), 2800) }}
              className="w-full rounded-2xl border border-primary/40 py-3 text-sm font-semibold text-primary transition-all active:scale-[0.98] disabled:opacity-35"
            >
              피드백 반영해서 다시 만들기
            </button>
          </div>

          <button
            type="button"
            onClick={() => transition("vendors")}
            className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            이 디자인으로 제작 신청하기
          </button>
        </main>
      )}

      {/* 펀딩 정보 입력 모달 */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 px-5 py-6">
          <div className="screen-in w-full max-w-sm mx-auto rounded-3xl bg-white px-5 pt-6 pb-8 shadow-2xl">

            <div className="mb-5">
              <p className="text-xs font-semibold text-primary mb-1">거의 다 왔어요!</p>
              <h2 className="text-lg font-bold text-foreground">함께할 팬들에게<br />한마디 남겨주세요</h2>
              <p className="mt-1.5 text-xs text-muted-foreground">펀딩 페이지에 표시되는 제목과 설명이에요</p>
            </div>

            <div className="space-y-3">
              {/* 제목 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">펀딩 제목</label>
                <input
                  type="text"
                  value={fundingTitle}
                  onChange={(e) => setFundingTitle(e.target.value)}
                  placeholder="오후셋 콘서트 기념 머그컵 같이 만들어요!"
                  maxLength={40}
                  className="w-full rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-white transition-all"
                />
                <p className="text-right text-[10px] text-muted-foreground">{fundingTitle.length}/40</p>
              </div>

              {/* 설명 */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">펀딩 설명</label>
                <textarea
                  value={fundingDesc}
                  onChange={(e) => setFundingDesc(e.target.value)}
                  placeholder={"일요일 공연에 같이 들고 가요~\n함께 만들면 더 저렴하게 살 수 있어요 🎶"}
                  rows={3}
                  maxLength={120}
                  className="w-full resize-none rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:bg-white transition-all"
                />
                <p className="text-right text-[10px] text-muted-foreground">{fundingDesc.length}/120</p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 rounded-2xl border border-border/60 py-3.5 text-sm font-semibold text-muted-foreground transition-all active:scale-[0.98]"
                >
                  돌아가기
                </button>
                <button
                  type="button"
                  disabled={!fundingTitle.trim()}
                  onClick={() => { setShowRequestModal(false); setDone(true) }}
                  className="flex-[2] rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-35"
                >
                  의뢰 확정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 완료 모달 */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5">
          <div className="screen-in w-full max-w-sm rounded-3xl bg-white px-6 py-8 text-center shadow-2xl">
            <div className="relative mx-auto mb-3 h-32 w-32">
              <Image src="/mascot/dog_heart.png" alt="" fill className="mascot object-contain" />
            </div>
            <h2 className="text-xl font-bold text-foreground">신청 완료!</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              팬의 마음을 담은 굿즈가<br />곧 현실이 될 거예요 🎉
            </p>
            <button
              type="button"
              onClick={() => { window.location.href = "/funding" }}
              className="mt-6 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white transition-all active:scale-[0.98]"
            >
              내 펀딩 보러가기
            </button>
          </div>
        </div>
      )}

      {/* 업체 선택 화면 */}
      {screen === "vendors" && !done && (
        <main className={cn("px-5 pt-5 pb-10 space-y-4", animating ? "screen-out" : "screen-in")}>
          <div>
            <button type="button" onClick={() => transition("result")} className="mb-3 text-xs font-semibold text-muted-foreground">← 디자인으로 돌아가기</button>
            <h1 className="text-base font-bold text-foreground">어디서 만들까요?</h1>
            <p className="text-xs text-muted-foreground mt-0.5">마음에 드는 공방을 선택해주세요</p>
          </div>

          {selectedCategory && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {goodsCategories.find(c => c.id === selectedCategory)?.icon}{" "}
                <strong className="text-foreground">{goodsCategories.find(c => c.id === selectedCategory)?.name}</strong> 제작 가능 업체만 보여드려요
              </span>
            </div>
          )}

          <div className="space-y-3">
            {(selectedCategory
              ? vendors.filter(v => v.categories.includes(selectedCategory))
              : vendors
            ).map((vendor) => (
              <button
                key={vendor.id}
                type="button"
                onClick={() => setSelectedVendor(vendor.id)}
                className={cn(
                  "w-full rounded-2xl p-4 text-left transition-all active:scale-[0.99]",
                  selectedVendor === vendor.id ? "bg-primary/5 ring-2 ring-primary" : "bg-white ring-1 ring-border/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-sm font-bold", vendor.color)}>
                      {vendor.initial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground">{vendor.name}</span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">{vendor.tag}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>⭐ {vendor.rating}</span>
                        <span>· 제작 {vendor.orders}건</span>
                      </div>
                    </div>
                  </div>
                  {selectedVendor === vendor.id && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shrink-0">
                      <IconCheck />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "수량", value: `${vendor.minQty}~${vendor.maxQty}개` },
                    { label: "단가", value: vendor.price },
                    { label: "기간", value: `${vendor.days}일` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-secondary/50 py-1.5 text-center">
                      <p className="text-[9px] text-muted-foreground">{item.label}</p>
                      <p className="text-[11px] font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={!selectedVendor}
            onClick={() => setShowRequestModal(true)}
            className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-35"
          >
            이 공방에 의뢰하기
          </button>
        </main>
      )}

      <BottomNav />
    </div>
  )
}
