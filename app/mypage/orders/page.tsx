"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "all", label: "전체" },
  { id: "recruiting", label: "모집중" },
  { id: "producing", label: "제작중" },
  { id: "shipping", label: "배송중" },
  { id: "completed", label: "완료" },
]

const orders = [
  {
    id: 1,
    title: "IU 콘서트 기념 머그컵",
    artist: "IU",
    image: "/goods/mug-1.jpg",
    status: "producing",
    statusLabel: "제작중",
    statusColor: "bg-blue-500",
    price: "13,500원",
    date: "2024.02.10",
    progress: {
      current: 2,
      total: 4,
      steps: ["주문 접수", "제작 중", "제작 완료", "배송 중"],
    }
  },
  {
    id: 2,
    title: "BTS 아크릴 키링 세트",
    artist: "BTS",
    image: "/goods/keyring-1.jpg",
    status: "shipping",
    statusLabel: "배송중",
    statusColor: "bg-orange-500",
    price: "9,000원",
    date: "2024.02.05",
    trackingNumber: "1234567890",
    progress: {
      current: 4,
      total: 4,
      steps: ["주문 접수", "제작 중", "제작 완료", "배송 중"],
    }
  },
  {
    id: 3,
    title: "NewJeans 미니 포스터",
    artist: "NewJeans",
    image: "/goods/poster-1.jpg",
    status: "recruiting",
    statusLabel: "모집중",
    statusColor: "bg-primary",
    price: "6,500원",
    date: "2024.02.12",
    recruiting: {
      current: 78,
      target: 100,
      daysLeft: 7,
    }
  },
  {
    id: 4,
    title: "SEVENTEEN 에코백",
    artist: "SEVENTEEN",
    image: "/goods/bag-1.jpg",
    status: "completed",
    statusLabel: "배송 완료",
    statusColor: "bg-green-500",
    price: "18,000원",
    date: "2024.01.20",
    completedDate: "2024.02.08",
  },
]

const statusIcons = {
  recruiting: Clock,
  producing: Package,
  shipping: Truck,
  completed: CheckCircle,
}

export default function OrdersPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredOrders = selectedTab === "all" 
    ? orders 
    : orders.filter(o => o.status === selectedTab)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="container px-4 py-6">
        {/* Back Button & Title */}
        <div className="mb-6 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">주문 현황</h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTab(tab.id)}
              className="shrink-0"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">해당하는 주문이 없습니다</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge className={`${order.statusColor} text-white`}>
                          {order.statusLabel}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {order.date}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        주문번호: {order.id.toString().padStart(8, '0')}
                      </span>
                    </div>

                    {/* Order Content */}
                    <div className="p-4">
                      <Link href={`/goods/${order.id}`} className="flex gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={order.image}
                            alt={order.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-primary">{order.artist}</p>
                          <h3 className="line-clamp-1 font-semibold text-foreground">{order.title}</h3>
                          <p className="mt-1 text-lg font-bold text-foreground">{order.price}</p>
                        </div>
                      </Link>

                      {/* Recruiting Progress */}
                      {order.recruiting && (
                        <div className="mt-4 rounded-lg bg-secondary p-3">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-foreground">모집 현황</span>
                            </div>
                            <span className="font-medium text-primary">
                              D-{order.recruiting.daysLeft}
                            </span>
                          </div>
                          <Progress 
                            value={(order.recruiting.current / order.recruiting.target) * 100} 
                            className="h-2"
                          />
                          <p className="mt-2 text-xs text-muted-foreground">
                            {order.recruiting.current}명 / {order.recruiting.target}명 
                            ({Math.round((order.recruiting.current / order.recruiting.target) * 100)}%)
                          </p>
                        </div>
                      )}

                      {/* Production Progress */}
                      {order.progress && order.status !== "recruiting" && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            {order.progress.steps.map((step, index) => {
                              const isCompleted = index < order.progress!.current
                              const isCurrent = index === order.progress!.current - 1
                              
                              return (
                                <div key={step} className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium",
                                      isCompleted
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground"
                                    )}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle className="h-4 w-4" />
                                    ) : (
                                      index + 1
                                    )}
                                  </div>
                                  <span className={cn(
                                    "mt-1 text-[10px]",
                                    isCurrent ? "font-medium text-primary" : "text-muted-foreground"
                                  )}>
                                    {step}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                          <div className="relative mt-2">
                            <div className="absolute top-0 h-0.5 w-full bg-muted" />
                            <div 
                              className="absolute top-0 h-0.5 bg-primary transition-all"
                              style={{ 
                                width: `${((order.progress.current - 1) / (order.progress.total - 1)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Tracking Number */}
                      {order.trackingNumber && (
                        <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary p-3">
                          <div>
                            <p className="text-xs text-muted-foreground">운송장 번호</p>
                            <p className="font-medium text-foreground">{order.trackingNumber}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            배송 조회
                          </Button>
                        </div>
                      )}

                      {/* Completed */}
                      {order.completedDate && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>{order.completedDate} 배송 완료</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
