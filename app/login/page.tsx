"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { LockKeyhole, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <main className="min-h-screen bg-white px-4 py-5">
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
          <h1 className="text-2xl font-bold text-foreground">로그인</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            소소하게 시작해서 마음에 쏙 드는 굿즈를 만들어요.
            <br />
            인디밴드 굿즈 생성부터 생산 연결까지 함께합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/60">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                이메일
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 rounded-xl bg-secondary/40 pl-9"
                  placeholder="fan@ssok.kr"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                비밀번호
              </Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 rounded-xl bg-secondary/40 pl-9"
                  placeholder="비밀번호 입력"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="h-12 w-full rounded-xl text-sm font-bold" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                "로그인하고 홈으로 가기"
              )}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
          계정이 없다면 <span className="underline underline-offset-2">회원가입하러가기</span>
        </p>
      </div>
    </main>
  )
}
