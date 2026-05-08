"use client"

import { Sparkles, Send, Users, Package } from "lucide-react"

const steps = [
  {
    icon: Sparkles,
    title: "AI로 디자인",
    description: "원하는 컨셉으로 AI가 디자인",
    color: "bg-orange-50 text-orange-500",
    number: "01",
  },
  {
    icon: Send,
    title: "업체 선택",
    description: "제작 업체에 제안 보내기",
    color: "bg-blue-50 text-blue-500",
    number: "02",
  },
  {
    icon: Users,
    title: "공동구매",
    description: "함께하면 더 저렴하게",
    color: "bg-green-50 text-green-500",
    number: "03",
  },
  {
    icon: Package,
    title: "배송 완료",
    description: "제작 후 개별 배송",
    color: "bg-purple-50 text-purple-500",
    number: "04",
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-6 mb-16">
      <div className="rounded-3xl bg-secondary p-5">
        <div className="mb-5 text-center">
          <h2 className="mb-1 text-base font-bold text-foreground">이용 방법</h2>
          <p className="text-xs text-muted-foreground">쏙과 함께 나만의 굿즈를 만들어보세요</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`relative mb-2 flex h-12 w-12 items-center justify-center rounded-2xl ${step.color}`}>
                <step.icon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mb-0.5 text-[11px] font-semibold text-foreground">{step.title}</h3>
              <p className="text-[9px] leading-tight text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
