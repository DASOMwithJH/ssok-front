"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [isSplashVisible, setIsSplashVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.replace("/login")
      setIsSplashVisible(false)
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [router])

  if (isSplashVisible) {
    return <SplashScreen />
  }

  return <SplashScreen />
}

function SplashScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8 text-center text-primary">
      <div className="relative mb-7 flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-primary shadow-2xl shadow-primary/25">
        <Image src="/nk.png" alt="ssok character" fill priority className="translate-y-2 object-contain p-3" />
      </div>
      <div className="relative h-14 w-44">
        <Image src="/SSOK.png" alt="SSOK" fill priority className="object-contain" />
      </div>
      <div className="relative mt-4 h-32 w-32">
        <Image src="/sok.png" alt="ssok logo" fill priority className="object-contain" />
      </div>
      <p className="mt-3 break-keep text-sm font-semibold leading-6 text-primary">
        소소하게 시작해서 마음에 쏙 드는 굿즈를 만들어요
      </p>
      <div className="mt-10 flex gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:240ms]" />
      </div>
    </main>
  )
}
