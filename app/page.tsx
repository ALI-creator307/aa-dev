import { Header } from '@/components/header'
import { Landing } from '@/components/landing'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full overflow-hidden bg-background">
      <Header />
      <Landing />
      <Footer />
    </main>
  )
}