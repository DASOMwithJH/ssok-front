"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace("/login")
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [router])

  return (
    <>
      <style>{`
        @keyframes splash-pop {
          0%   { opacity: 0; transform: scale(0.5) translateY(30px); }
          60%  { opacity: 1; transform: scale(1.08) translateY(-6px); }
          80%  { transform: scale(0.96) translateY(2px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes splash-fade {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .splash-logo {
          animation: splash-pop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
        .splash-sub {
          animation: splash-fade 0.8s ease-out 1.1s both;
        }
      `}</style>

      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
        <div className="splash-logo">
          <Image
            src="/logo-primary.png"
            alt="ssok"
            width={160}
            height={52}
            className="object-contain"
            priority
          />
        </div>
        <p className="splash-sub text-xl font-semibold text-muted-foreground">AI 굿즈 공동제작 플랫폼</p>
      </div>
    </>
  )
}
