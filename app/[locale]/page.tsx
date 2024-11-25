'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AdventCalendar from '../components/AdventCalendar'
import Snowfall from '../components/Snowfall'
import { useTranslations } from 'next-intl'
import { colors } from '../utils/theme'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('HomePage')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${locale}/login`)
    }
  }, [status, router, locale])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bce3de] to-[#faedcb] relative overflow-hidden">
        <div className="text-lg font-medium" style={{ color: colors.text.primary }}>
          Loading...
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#bce3de] to-[#faedcb] relative">
      <Snowfall />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div>
          <h2 
            className="text-4xl font-extrabold text-center"
            style={{ color: '#b4947c' }}
          >
            {t('title')}
          </h2>
          <div className="relative z-10">
            <AdventCalendar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
