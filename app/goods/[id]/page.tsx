"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav } from "@/components/bottom-nav"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  Users, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Share2,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"

const goodsData = {
  id: 1,
  title: "IU 콘서트 기념 머그컵",
  artist: "IU",
  artistImage: "/artists/iu.jpg",
  images: ["/goods/mug-1.jpg"],
  description: "IU의 콘서트 'The Golden Hour'를 기념하여 제작된 특별한 머그컵입니다. AI가 콘서트의 분위기를 담아 디자인했으며, 고급 세라믹 소재로 제작됩니다.",
  currentParticipants: 45,
  targetParticipants: 50,
  daysLeft: 3,
  endDate: "2024.02.15",
  status: "ongoing",
  priceTiers: [
    { min: 1, max: 30, price: 18000 },
    { min: 31, max: 50, price: 15000 },
    { min: 51, max: 100, price: 13500 },
    { min: 101, max: 200, price: 12000 },
  ],
  currentPrice: 13500,
  originalPrice: 18000,
  shippingFee: 3000,
  vendor: {
    name: "굿즈메이커",
    rating: 4.8,
    completedOrders: 127,
  },
  createdBy: {
    name: "uaena_01",
    image: "/users/user-1.jpg",
  },
}

export default function GoodsDetailPage() {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [showPriceTiers, setShowPriceTiers] = useState(false)

  const progress = (goodsData.currentParticipants / goodsData.targetParticipants) * 100
  const discount = Math.round((1 - goodsData.currentPrice / goodsData.originalPrice) * 100)
  const artistFeeRate = 0.03
  const artistFee = Math.round(goodsData.currentPrice * artistFeeRate)
  const totalPrice = goodsData.currentPrice + goodsData.shippingFee + artistFee

  const getCurrentTier = () => {
    const count = goodsData.currentParticipants
    return goodsData.priceTiers.find(tier => count >= tier.min && count <= tier.max)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-4 py-3 backdrop-blur">
        <button 
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl hover:bg-secondary",
              isLiked ? "text-red-500" : "text-foreground"
            )}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground hover:bg-secondary">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <main>
        {/* Image */}
        <div className="relative aspect-square bg-secondary">
          <Image
            src={goodsData.images[0]}
            alt={goodsData.title}
            fill
            className="object-cover"
          />
          {/* Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-xl bg-foreground/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5" />
            D-{goodsData.daysLeft}
          </div>
          <div className="absolute right-3 top-3 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white">
            {discount}% OFF
          </div>
        </div>

        <div className="space-y-4 px-4 py-5">
          {/* Artist & Title */}
          <div>
            <Link 
              href="/artists/1"
              className="mb-1.5 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              <div className="relative h-5 w-5 overflow-hidden rounded-full bg-muted">
                <Image
                  src={goodsData.artistImage}
                  alt={goodsData.artist}
                  fill
                  className="object-cover"
                />
              </div>
              {goodsData.artist}
            </Link>
            <h1 className="text-xl font-bold text-foreground">{goodsData.title}</h1>
          </div>

          {/* Price Card */}
          <div className="rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 p-4">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {goodsData.currentPrice.toLocaleString()}원
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {goodsData.originalPrice.toLocaleString()}원
              </span>
              <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {discount}% 할인
              </span>
            </div>

            <div className="mb-3 rounded-xl bg-white p-3 text-xs shadow-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-muted-foreground">상품 금액</span>
                <span className="font-semibold text-foreground">{goodsData.currentPrice.toLocaleString()}원</span>
              </div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-muted-foreground">배송비</span>
                <span className="font-semibold text-foreground">{goodsData.shippingFee.toLocaleString()}원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">아티스트 수수료 3%</span>
                <span className="font-semibold text-primary">{artistFee.toLocaleString()}원</span>
              </div>
              <p className="mt-2 break-keep text-[11px] leading-5 text-muted-foreground">
                아티스트 수수료는 창작 활동을 응원하기 위해 아티스트에게 전달되는 금액입니다.
              </p>
            </div>

            {/* Progress */}
            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span><strong className="text-foreground">{goodsData.currentParticipants}명</strong> 참여중</span>
                </div>
                <span className="font-semibold text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-[11px] text-muted-foreground">
                목표 {goodsData.targetParticipants}명 달성 시 제작이 확정됩니다
              </p>
            </div>

            {/* Price Tiers Toggle */}
            <button
              onClick={() => setShowPriceTiers(!showPriceTiers)}
              className="flex w-full items-center justify-between rounded-xl bg-white p-3 text-sm shadow-sm"
            >
              <span className="font-medium text-foreground">수량별 가격 보기</span>
              {showPriceTiers ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            
            {showPriceTiers && (
              <div className="mt-3 space-y-2">
                {goodsData.priceTiers.map((tier, index) => {
                  const isCurrentTier = getCurrentTier() === tier
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between rounded-xl p-3 text-sm",
                        isCurrentTier 
                          ? "bg-primary/10 ring-1 ring-primary/30" 
                          : "bg-white"
                      )}
                    >
                      <span className="text-foreground">
                        {tier.min} ~ {tier.max}명
                        {isCurrentTier && (
                          <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                            현재
                          </span>
                        )}
                      </span>
                      <span className={cn(
                        "font-semibold",
                        isCurrentTier ? "text-primary" : "text-foreground"
                      )}>
                        {tier.price.toLocaleString()}원
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-2xl bg-orange-50 p-3 text-center">
              <Clock className="mb-1 h-5 w-5 text-orange-500" />
              <span className="text-[10px] text-muted-foreground">마감까지</span>
              <span className="text-xs font-bold text-foreground">D-{goodsData.daysLeft}</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-blue-50 p-3 text-center">
              <Truck className="mb-1 h-5 w-5 text-blue-500" />
              <span className="text-[10px] text-muted-foreground">배송비</span>
              <span className="text-xs font-bold text-foreground">{goodsData.shippingFee.toLocaleString()}원</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl bg-green-50 p-3 text-center">
              <ShieldCheck className="mb-1 h-5 w-5 text-green-500" />
              <span className="text-[10px] text-muted-foreground">제작 업체</span>
              <span className="text-xs font-bold text-foreground">{goodsData.vendor.name}</span>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border/50">
            <h3 className="mb-2 text-sm font-bold text-foreground">상품 설명</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {goodsData.description}
            </p>
          </div>

          {/* Creator */}
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-border/50">
            <h3 className="mb-3 text-sm font-bold text-foreground">생성자</h3>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={goodsData.createdBy.image}
                  alt={goodsData.createdBy.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{goodsData.createdBy.name}</p>
                <p className="text-[11px] text-muted-foreground">이 굿즈를 디자인했어요</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pb-2 md:bottom-4">
        <button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent py-4 text-center text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
          참여하기 · {totalPrice.toLocaleString()}원
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
