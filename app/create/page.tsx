"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Search,
  CheckCircle,
  Wand2,
  ChevronLeft,
  Star,
  ImagePlus,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "아티스트", icon: "🎤" },
  { id: 2, title: "굿즈 종류", icon: "🎁" },
  { id: 3, title: "AI 생성", icon: "✨" },
  { id: 4, title: "업체 선택", icon: "🏭" },
]

const artists = [
  { id: 1, name: "IU", image: "/artists/iu.jpg", verified: true, color: "from-purple-100 to-pink-100" },
  { id: 2, name: "BTS", image: "/artists/bts.jpg", verified: true, color: "from-violet-100 to-purple-100" },
  { id: 3, name: "NewJeans", image: "/artists/newjeans.jpg", verified: true, color: "from-cyan-100 to-blue-100" },
  { id: 4, name: "aespa", image: "/artists/aespa.jpg", verified: true, color: "from-fuchsia-100 to-pink-100" },
  { id: 5, name: "SEVENTEEN", image: "/artists/seventeen.jpg", verified: true, color: "from-rose-100 to-orange-100" },
  { id: 6, name: "Stray Kids", image: "/artists/straykids.jpg", verified: true, color: "from-red-100 to-rose-100" },
]

const goodsTypes = [
  { id: "mug", name: "머그컵", icon: "☕", description: "세라믹 머그컵", color: "bg-orange-50" },
  { id: "phonecase", name: "폰케이스", icon: "📱", description: "하드/투명 케이스", color: "bg-blue-50" },
  { id: "keyring", name: "키링", icon: "🔑", description: "아크릴 키링", color: "bg-amber-50" },
  { id: "poster", name: "포스터", icon: "🖼️", description: "A3/A4 포스터", color: "bg-purple-50" },
  { id: "ecobag", name: "에코백", icon: "👜", description: "캔버스 에코백", color: "bg-green-50" },
  { id: "tshirt", name: "티셔츠", icon: "👕", description: "면 100% 티셔츠", color: "bg-pink-50" },
]

const generatedDesigns = [
  { id: 1, image: "/generated/design-1.jpg" },
  { id: 2, image: "/generated/design-2.jpg" },
  { id: 3, image: "/generated/design-3.jpg" },
  { id: 4, image: "/generated/design-4.jpg" },
]

const vendors = [
  {
    id: 1,
    name: "굿즈메이커",
    rating: 4.8,
    completedOrders: 127,
    minQuantity: 30,
    maxQuantity: 200,
    priceRange: "12,000원 ~ 18,000원",
    deliveryDays: 7,
  },
  {
    id: 2,
    name: "프리메이드 코리아",
    rating: 4.6,
    completedOrders: 89,
    minQuantity: 50,
    maxQuantity: 500,
    priceRange: "10,000원 ~ 15,000원",
    deliveryDays: 10,
  },
  {
    id: 3,
    name: "아이돌굿즈",
    rating: 4.9,
    completedOrders: 256,
    minQuantity: 20,
    maxQuantity: 100,
    priceRange: "15,000원 ~ 22,000원",
    deliveryDays: 5,
  },
]

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [selectedGoodsType, setSelectedGoodsType] = useState<string | null>(null)
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null)
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [artistSearch, setArtistSearch] = useState("")
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [referencePreview, setReferencePreview] = useState<string | null>(null)
  const [proposalSent, setProposalSent] = useState(false)
  const [showGeneratedDesigns, setShowGeneratedDesigns] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredArtists = artistSearch
    ? artists.filter((artist) => artist.name.toLowerCase().includes(artistSearch.toLowerCase()))
    : artists

  useEffect(() => {
    if (!referenceImage) {
      setReferencePreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(referenceImage)
    setReferencePreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [referenceImage])

  const handleReferenceImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setReferenceImage(file)
  }

  const removeReferenceImage = () => {
    setReferenceImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleGenerate = () => {
    setSelectedDesign(null)
    setShowGeneratedDesigns(false)
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowGeneratedDesigns(true)
    }, 2000)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSendProposal = () => {
    if (!canProceed()) return
    setProposalSent(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedArtist !== null
      case 2:
        return selectedGoodsType !== null
      case 3:
        return selectedDesign !== null
      case 4:
        return selectedVendor !== null
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />

      <div className="sticky top-14 z-40 bg-background px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all",
                    currentStep > step.id
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : currentStep === step.id
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-md shadow-primary/30"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  <span
                    className={cn(
                      "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold",
                      currentStep >= step.id ? "bg-foreground text-white" : "bg-white text-muted-foreground ring-1 ring-border",
                    )}
                  >
                    {step.id}
                  </span>
                </div>
                <span
                  className={cn(
                    "mt-1.5 text-center text-[10px] font-medium leading-tight",
                    currentStep === step.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
            </div>
          ))}
        </div>
      </div>

      <main className="px-4 pt-4">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold text-foreground">아티스트 선택</h1>
              <p className="text-xs text-muted-foreground">굿즈를 만들 아티스트를 선택해주세요</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="아티스트 검색..."
                value={artistSearch}
                onChange={(event) => setArtistSearch(event.target.value)}
                className="rounded-xl border-border/50 bg-secondary pl-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredArtists.map((artist) => (
                <button
                  key={artist.id}
                  type="button"
                  onClick={() => setSelectedArtist(artist.id)}
                  className={cn(
                    "relative flex flex-col items-center rounded-2xl p-4 transition-all active:scale-95",
                    selectedArtist === artist.id
                      ? "bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-primary"
                      : "bg-white ring-1 ring-border/50",
                  )}
                >
                  <div className={`relative mb-2 rounded-2xl bg-gradient-to-br ${artist.color} p-1`}>
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                      <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                    </div>
                    {artist.verified && (
                      <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
                        <CheckCircle className="h-4 w-4 fill-primary text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{artist.name}</span>
                  {selectedArtist === artist.id && (
                    <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold text-foreground">굿즈 종류 선택</h1>
              <p className="text-xs text-muted-foreground">제작할 굿즈 종류를 선택해주세요</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {goodsTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedGoodsType(type.id)}
                  className={cn(
                    "relative flex flex-col items-center rounded-2xl p-5 transition-all active:scale-95",
                    selectedGoodsType === type.id
                      ? "bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-primary"
                      : "bg-white ring-1 ring-border/50",
                  )}
                >
                  <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-2xl ${type.color}`}>
                    <span className="text-2xl">{type.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{type.name}</span>
                  <span className="text-[10px] text-muted-foreground">{type.description}</span>
                  {selectedGoodsType === type.id && (
                    <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold text-foreground">AI 디자인 생성</h1>
              <p className="text-xs text-muted-foreground">프롬프트와 참고 이미지를 바탕으로 디자인을 만들어보세요</p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">디자인 프롬프트</span>
              </div>
              <Input
                placeholder="예: 콘서트 무대, 화려한 조명, 따뜻한 분위기로..."
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="mb-3 rounded-xl border-0 bg-white"
              />

              <div className="mb-3">
                <input
                  ref={fileInputRef}
                  id="reference-image"
                  type="file"
                  accept="image/*"
                  onChange={handleReferenceImageChange}
                  className="sr-only"
                />
                {referencePreview ? (
                  <div className="relative overflow-hidden rounded-xl bg-white ring-1 ring-border/70">
                    <div className="relative aspect-[16/10] w-full">
                      <Image src={referencePreview} alt="참고 이미지 미리보기" fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">{referenceImage?.name}</p>
                        <p className="text-[10px] text-muted-foreground">참고 이미지로 함께 반영됩니다</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeReferenceImage}
                        aria-label="참고 이미지 삭제"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="reference-image"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-white px-4 py-5 text-center transition-colors hover:bg-secondary/50"
                  >
                    <ImagePlus className="mb-2 h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold text-foreground">참고 이미지 추가</span>
                    <span className="mt-1 text-[11px] text-muted-foreground">원하는 분위기, 색감, 구도를 이미지로 전달하세요</span>
                  </label>
                )}
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isGenerating ? "잠시만 기다려주세요..." : "디자인 생성하기"}
              </button>
            </div>

            {isGenerating && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary/50 py-10">
                <div className="relative mb-3 h-28 w-28">
                  <Image src="/mascot/sleep.png" alt="생성 중" fill className="object-contain" />
                </div>
                <p className="text-sm font-semibold text-foreground">AI가 디자인을 만들고 있어요</p>
                <p className="mt-1 text-xs text-muted-foreground">잠깐 기다리면 곧 나와요 🐾</p>
              </div>
            )}

            {showGeneratedDesigns && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">생성된 디자인</h3>
              <div className="grid grid-cols-2 gap-3">
                {generatedDesigns.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design.id)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-2xl transition-all active:scale-95",
                      selectedDesign === design.id ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-border/50",
                    )}
                  >
                    <Image src={design.image} alt={`디자인 ${design.id}`} fill className="object-cover" />
                    {selectedDesign === design.id && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary p-1 shadow-md">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold text-foreground">업체 선택</h1>
              <p className="text-xs text-muted-foreground">제작 조건에 맞는 업체를 선택해주세요</p>
            </div>

            <div className="space-y-3">
              {vendors.map((vendor) => (
                <button
                  key={vendor.id}
                  type="button"
                  onClick={() => setSelectedVendor(vendor.id)}
                  className={cn(
                    "w-full rounded-2xl p-4 text-left transition-all active:scale-[0.99]",
                    selectedVendor === vendor.id
                      ? "bg-gradient-to-br from-primary/10 to-accent/10 ring-2 ring-primary"
                      : "bg-white ring-1 ring-border/50",
                  )}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{vendor.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {vendor.rating}
                        </span>
                        <span className="text-[10px] text-muted-foreground">제작 {vendor.completedOrders}건</span>
                      </div>
                    </div>
                    {selectedVendor === vendor.id && (
                      <div className="rounded-full bg-primary p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-secondary/50 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">수량</p>
                      <p className="text-[10px] font-semibold text-foreground">
                        {vendor.minQuantity}~{vendor.maxQuantity}개
                      </p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">예상 가격</p>
                      <p className="text-[10px] font-semibold text-foreground">{vendor.priceRange.split(" ~ ")[0]}</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-2 text-center">
                      <p className="text-[9px] text-muted-foreground">제작 기간</p>
                      <p className="text-[10px] font-semibold text-foreground">{vendor.deliveryDays}일</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-20 left-0 right-0 z-40 flex gap-2 px-4 pb-2 md:bottom-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-all active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            다음 단계로
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSendProposal}
            disabled={!canProceed()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            제안 보내기
          </button>
        )}
      </div>

      {proposalSent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-white px-5 py-6 text-center shadow-2xl">
            <div className="relative mx-auto mb-5 aspect-square w-56 overflow-hidden rounded-2xl bg-secondary ring-1 ring-border/70">
              <Image src="/icon.png" alt="제안 완료 아이콘" fill className="object-contain p-3" />
            </div>
            <h2 className="text-lg font-bold text-foreground">업체에게 제안을 보냈어요!</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">연락이 오면 알려드릴게요!</p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/"
              }}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-bold text-white transition-all active:scale-[0.98]"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
