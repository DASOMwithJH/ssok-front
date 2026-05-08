"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="20" height="16" rx="3" />
      <polyline points="1,1 11,10 21,1" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="10" width="16" height="11" rx="3" />
      <path d="M6 10V6a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    localStorage.setItem("ssok:isLoggedIn", "true")
    localStorage.setItem("ssok:userEmail", email)
    setTimeout(() => {
      router.replace("/home")
    }, 400)
  }

  return (
    <main className="flex min-h-screen flex-col bg-background px-5 pt-44 pb-10">

      {/* 상단 로고 + 마스코트 */}
      <div className="mb-10 flex flex-col items-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-3xl shadow-lg shadow-primary/20 ring-1 ring-border/60">
          <Image
            src="/nk.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-4 text-center text-sm leading-6 text-muted-foreground">
          좋아하는 아티스트의 굿즈를<br />함께 만들어보세요
        </p>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* 이메일 */}
        <div className="space-y-3">
          <label htmlFor="email" className="text-xs font-semibold text-foreground">이메일</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted-foreground">
              <IconMail />
            </span>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="fan@ssok.kr"
              className="h-13 w-full rounded-2xl border border-primary/40 bg-white pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              style={{ height: "52px" }}
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="space-y-3">
          <label htmlFor="password" className="text-xs font-semibold text-foreground">비밀번호</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted-foreground">
              <IconLock />
            </span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
              className="w-full rounded-2xl border border-primary/40 bg-white pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              style={{ height: "52px" }}
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-md shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 회원가입 */}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        계정이 없으신가요?{" "}
        <span className="font-semibold text-primary underline underline-offset-2">회원가입</span>
      </p>

    </main>
  )
}
