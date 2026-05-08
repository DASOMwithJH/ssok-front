import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
            <span className="text-lg font-bold text-white">쏙</span>
          </div>
          <span className="text-xl font-bold text-foreground">ssok</span>
        </Link>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">검색</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">알림</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
