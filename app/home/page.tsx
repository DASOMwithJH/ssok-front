"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrendingGoods } from "@/components/home/trending-goods"
import { GoodsSection } from "@/components/home/goods-section"

export default function HomeContentPage() {
  const router = useRouter()
  const [canShowHome, setCanShowHome] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("ssok:isLoggedIn") !== "true") {
      router.replace("/login")
      return
    }
    setCanShowHome(true)
  }, [router])

  if (!canShowHome) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm font-semibold text-muted-foreground">
        로그인 화면으로 이동 중...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <TrendingGoods />
        <GoodsSection />
      </main>
      <BottomNav />
    </div>
  )
}
