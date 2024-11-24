'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import AdventCalendar from './components/AdventCalendar'
import Snowfall from './components/Snowfall'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-red-900">
        <div className="text-lg text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-900 to-red-900 relative">
      <Snowfall />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Christmas Advent Calendar 🎄
        </h2>
        <AdventCalendar />
      </main>

      <Footer />
    </div>
  )
}
