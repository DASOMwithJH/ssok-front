"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"

const artists = [
  {
    id: 1,
    name: "오후셋",
    image: "/artists/iu.jpg",
    verified: true,
    goodsCount: 12,
    color: "from-orange-100 to-amber-100",
  },
  {
    id: 2,
    name: "세컨드플로어",
    image: "/artists/bts.jpg",
    verified: true,
    goodsCount: 8,
    color: "from-violet-100 to-purple-100",
  },
  {
    id: 3,
    name: "블루시그널",
    image: "/artists/newjeans.jpg",
    verified: true,
    goodsCount: 15,
    color: "from-cyan-100 to-blue-100",
  },
  {
    id: 4,
    name: "라스트버스",
    image: "/artists/aespa.jpg",
    verified: true,
    goodsCount: 21,
    color: "from-slate-100 to-blue-100",
  },
  {
    id: 5,
    name: "슬로우먼데이",
    image: "/artists/seventeen.jpg",
    verified: true,
    goodsCount: 9,
    color: "from-rose-100 to-orange-100",
  },
  {
    id: 6,
    name: "노웨어스테이지",
    image: "/artists/straykids.jpg",
    verified: false,
    goodsCount: 4,
    color: "from-green-100 to-teal-100",
  },
]

export function FeaturedArtists() {
  return (
    <section className="py-5">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">인기 아티스트</h2>
        <Link href="/artists" className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary">
          전체보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      
      {/* Horizontal scrolling */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.id}`}
            className="group flex min-w-[100px] flex-shrink-0 flex-col items-center"
          >
            {/* Avatar with gradient background */}
            <div className={`relative mb-2 rounded-2xl bg-gradient-to-br ${artist.color} p-1 transition-all group-hover:scale-105 group-active:scale-95`}>
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              {artist.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
                  <CheckCircle className="h-4 w-4 fill-primary text-white" />
                </div>
              )}
            </div>
            
            {/* Name & count */}
            <span className="text-xs font-semibold text-foreground">{artist.name}</span>
            <span className="text-[10px] text-muted-foreground">굿즈 {artist.goodsCount}개</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
