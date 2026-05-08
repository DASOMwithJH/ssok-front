import Link from "next/link"
import Image from "next/image"

function IconBell({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

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

        <div className="mt-4 mr-1">
          <button
            type="button"
            className="flex items-center justify-center rounded-xl p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <IconBell size={22} />
            <span className="sr-only">알림</span>
          </button>
        </div>
      </div>
    </header>
  )
}
