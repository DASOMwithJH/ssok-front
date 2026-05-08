import Link from "next/link"
import Image from "next/image"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-primary.png"
            alt="ssok"
            width={80}
            height={26}
            className="object-contain mt-4 ml-1"
            priority
          />
        </Link>
        
        <div className="flex items-center gap-1 mt-4">
<Button variant="ghost" size="icon" className="relative h-16 w-16 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Bell className="h-14 w-14" />
<span className="sr-only">알림</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
