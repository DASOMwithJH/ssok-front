"use client"

import { useState } from "react"
import Link from "next/link"

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9.5" cy="9.5" r="6.5" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
    </svg>
  )
}

function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="11" x2="18" y2="11" />
      <polyline points="12,5 18,11 12,17" />
    </svg>
  )
}

export function HeroSection() {
  const [query, setQuery] = useState("")

  return (
    <section className="px-4 pb-2 pt-3 space-y-3">

      {/* 검색창 */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted-foreground">
          <IconSearch />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="아티스트, 굿즈 이름으로 검색해보세요"
          className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-muted-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        )}
      </div>

      {/* 내 아티스트 굿즈 카드 */}
      <Link
        href="/goods?filter=my-artists"
        className="relative flex items-center justify-between overflow-hidden rounded-3xl bg-gradient-to-r from-[#E8713F] to-[#F4A070] p-6 pb-8 active:opacity-90 transition-opacity"
      >
        <div className="relative z-10">
          <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            내 아티스트
          </div>
          <h2 className="mb-1 text-2xl font-bold text-white">관련 굿즈 보기</h2>
          <p className="text-sm leading-5 text-white/90">팔로우한 아티스트의 굿즈만 모아봤어요</p>
        </div>
        <div className="relative z-10 ml-4 shrink-0 text-white/80">
          <IconArrowRight />
        </div>
      </Link>
    </section>
  )
}
