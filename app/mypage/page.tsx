"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Progress } from "@/components/ui/progress"
import { 
  Settings, 
  ChevronRight, 
  Package, 
  Heart, 
  History,
  CreditCard,
  HelpCircle,
  Sparkles,
  Users,
  Bell,
  LogOut
} from "lucide-react"

const user = {
  name: "uaena_01",
  email: "user@example.com",
  image: "/users/user-1.jpg",
  stats: {
    participated: 12,
    created: 3,
    liked: 28,
  }
}

const recentOrders = [
  {
    id: 1,
    title: "IU 콘서트 기념 머그컵",
    artist: "IU",
    image: "/goods/mug-1.jpg",
    status: "제작중",
    statusColor: "bg-blue-500",
    price: 13500,
    date: "2024.02.10",
  },
  {
    id: 2,
    title: "BTS 아크릴 키링 세트",
    artist: "BTS",
    image: "/goods/keyring-1.jpg",
    status: "배송중",
    statusColor: "bg-orange-500",
    price: 9000,
    date: "2024.02.05",
  },
  {
    id: 3,
    title: "NewJeans 미니 포스터",
    artist: "NewJeans",
    image: "/goods/poster-1.jpg",
    status: "모집중",
    statusColor: "bg-primary",
    price: 6500,
    progress: 78,
    target: 100,
    date: "2024.02.12",
  },
]

const menuItems = [
  { icon: Package, label: "주문 현황", href: "/mypage/orders", badge: "3", color: "bg-blue-50 text-blue-500" },
  { icon: Heart, label: "찜 목록", href: "/mypage/likes", badge: "28", color: "bg-red-50 text-red-500" },
  { icon: Sparkles, label: "내가 만든 굿즈", href: "/mypage/created", color: "bg-purple-50 text-purple-500" },
  { icon: History, label: "참여 내역", href: "/mypage/history", color: "bg-green-50 text-green-500" },
]

const settingsItems = [
  { icon: CreditCard, label: "결제 수단", href: "/mypage/payment" },
  { icon: Bell, label: "알림 설정", href: "/mypage/notifications" },
  { icon: HelpCircle, label: "고객센터", href: "/mypage/help" },
  { icon: Settings, label: "설정", href: "/mypage/settings" },
]

export default function MyPage() {
  return (
    <div className="min-h-screen bg-secondary/30 pb-24">
      <Header />
      
      <main className="px-4 py-5">
        {/* Profile Section */}
        <div className="mb-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border/50">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-0.5">
              <div className="h-full w-full overflow-hidden rounded-[14px] bg-white">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Link 
              href="/mypage/settings"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
          
          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 text-center">
              <p className="text-xl font-bold text-primary">{user.stats.participated}</p>
              <p className="text-[10px] text-muted-foreground">참여한 굿즈</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 p-3 text-center">
              <p className="text-xl font-bold text-accent-foreground">{user.stats.created}</p>
              <p className="text-[10px] text-muted-foreground">생성한 굿즈</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 p-3 text-center">
              <p className="text-xl font-bold text-pink-600">{user.stats.liked}</p>
              <p className="text-[10px] text-muted-foreground">찜한 굿즈</p>
            </div>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="mb-5 grid grid-cols-4 gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-border/50 transition-all active:scale-95"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium text-foreground">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground">최근 주문</h2>
            <Link href="/mypage/orders" className="flex items-center gap-0.5 text-xs text-muted-foreground">
              전체보기
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <Link key={order.id} href={`/mypage/orders/${order.id}`}>
                <div className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-border/50 transition-all active:scale-[0.99]">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={order.image}
                      alt={order.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white ${order.statusColor}`}>
                        {order.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{order.date}</span>
                    </div>
                    <p className="text-[10px] text-primary">{order.artist}</p>
                    <h3 className="line-clamp-1 text-xs font-semibold text-foreground">{order.title}</h3>
                    <p className="mt-0.5 text-xs font-bold text-foreground">{order.price.toLocaleString()}원</p>
                    
                    {order.progress && (
                      <div className="mt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="flex items-center gap-0.5 text-muted-foreground">
                            <Users className="h-3 w-3" />
                            모집중
                          </span>
                          <span className="font-semibold text-primary">
                            {order.progress}/{order.target}명
                          </span>
                        </div>
                        <Progress value={(order.progress / order.target) * 100} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Settings Menu */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-border/50">
          {settingsItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-secondary/50 ${
                index !== settingsItems.length - 1 ? 'border-b border-border/50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-medium text-muted-foreground shadow-sm ring-1 ring-border/50 transition-colors hover:bg-secondary/50">
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
