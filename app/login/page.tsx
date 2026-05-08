"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    localStorage.setItem("ssok:isLoggedIn", "true")
    localStorage.setItem("ssok:userEmail", email)

    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-5">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-sm flex-col">
        <Link
          href="/"
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-muted-foreground shadow-sm ring-1 ring-border/60"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">뒤로가기</span>
        </Link>

        <div className="mb-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-bold text-white shadow-md">
            쏙
          </div>
          <h1 className="text-2xl font-bold leading-tight text-foreground">로그인</h1>
          <p className="mt-2 max-w-[18rem] break-keep text-sm leading-6 text-muted-foreground">
            ssok 계정으로 굿즈 제작과 공동구매를 이어가세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/60">
          <div className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm leading-none">이메일</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 min-w-0 rounded-xl pl-9 pr-3 text-sm leading-none"
                  placeholder="user@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm leading-none">비밀번호</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 min-w-0 rounded-xl pl-9 pr-3 text-sm leading-none"
                  placeholder="비밀번호 입력"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="h-12 w-full rounded-xl text-sm font-semibold" disabled={isSubmitting}>
              {isSubmitting ? "로그인 중..." : "로그인하기"}
            </Button>
          </div>
        </form>

        <p className="mx-auto mt-4 max-w-[18rem] break-keep text-center text-xs leading-5 text-muted-foreground">
          테스트용 화면이라 아무 비밀번호나 입력해도 로그인됩니다.
        </p>
      </div>
    </main>
  )
}
