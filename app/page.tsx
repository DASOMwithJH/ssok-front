import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrendingGoods } from "@/components/home/trending-goods"
import { GoodsSection } from "@/components/home/goods-section"

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
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <TrendingGoods />
        <GoodsSection />
      </main>
      <BottomNav />
    </div>
  )
}
