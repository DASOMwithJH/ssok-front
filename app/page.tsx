import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrendingGoods } from "@/components/home/trending-goods"
import { GoodsSection } from "@/components/home/goods-section"

export default function HomePage() {
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
