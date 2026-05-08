import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: 'ssok (쏙) - AI 굿즈 공동구매 플랫폼',
  description: '좋아하는 아티스트의 AI 굿즈를 만들고, 함께 구매하세요. 팬들이 직접 만드는 특별한 굿즈 플랫폼',
  generator: 'v0.app',
  keywords: ['AI 굿즈', '공동구매', 'K-pop', '팬굿즈', '아티스트 굿즈'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ssok',
  },
}

export const viewport: Viewport = {
  themeColor: '#F4845F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
