'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import Logo02 from './Logo02'
import { useTranslations } from 'next-intl'

const Header = () => {
    const { data: session } = useSession()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations('Header')

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: `/${locale}/login` })
    }

    const handleLanguageChange = (newLocale: string) => {
        const currentPath = window.location.pathname
        const segments = currentPath.split('/')
        segments[1] = newLocale  // Replace the locale segment
        const newPath = segments.join('/')
        router.replace(newPath, { scroll: false })
    }

    return (
        <header className="bg-white text-black py-4 px-6 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Logo02 size={120} />
                </div>
                <div className="flex items-center gap-4 relative">
                    <select
                        value={locale}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="px-4 py-2 text-sm rounded-lg
                          bg-white/90 backdrop-blur-sm
                          text-gray-800 font-medium
                          border border-white/20
                          hover:bg-white/80
                          focus:outline-none
                          focus:ring-2 focus:ring-green-500
                          cursor-pointer
                          transition-all duration-300
                          shadow-lg"
                    >
                        <option value="ro">Română</option>
                        <option value="ru">Русский</option>
                    </select>

                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="shadow-lg flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        <span>{t('account')}</span>
                        <svg
                            className={`w-5 h-5 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl z-50 text-gray-800 border border-white/20">
                            <div className="p-4 bg-[#d04a53] rounded-t-lg">
                                <h3 className="font-bold text-lg text-white">{t('profile.title')}</h3>
                                <p className="text-sm text-[#bce3de]">{t('profile.subtitle')}</p>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="space-y-2">
                                    <p className="text-sm text-[#666666]">{t('profile.name')}</p>
                                    <p className="font-medium text-[#333333]">{session?.user?.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-[#666666]">{t('profile.email')}</p>
                                    <p className="font-medium text-[#333333]">{session?.user?.email}</p>
                                </div>
                                {session?.user?.last_name && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-[#666666]">{t('profile.lastName')}</p>
                                        <p className="font-medium text-[#333333]">{session.user.last_name}</p>
                                    </div>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full mt-4 bg-[#d04a53] hover:bg-[#bb424a] text-white py-2 px-4 rounded-lg transition-all duration-300"
                                >
                                    {t('profile.logout')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
