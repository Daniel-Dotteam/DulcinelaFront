'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import Logo02 from './Logo02'

const Header = () => {
    const { data: session } = useSession()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const router = useRouter()
    const locale = useLocale()

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' })
    }

    const handleLanguageChange = (newLocale: string) => {
        const currentPath = window.location.pathname
        const segments = currentPath.split('/')
        segments[1] = newLocale  // Replace the locale segment
        const newPath = segments.join('/')
        router.replace(newPath, { scroll: false })
    }

    return (
        <header className="bg-white text-black py-4 px-6 shadow-lg relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Logo02 size={100} />
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={locale}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-white/80 border border-gray-300 rounded-lg px-3 py-1.5 text-sm 
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                            transition-all duration-300"
                    >
                        <option value="ro">Romana</option>
                        <option value="ru">Rusa</option>
                    </select>

                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        <span>Account</span>
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
                        <div className="absolute top-full right-6 mt-2 w-72 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl z-50 text-gray-800 border border-white/20">
                            <div className="p-4 border-b border-white/20">
                                <h3 className="font-bold text-lg text-green-800">Profile</h3>
                                <p className="text-sm text-red-700">Manage your account</p>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="font-medium">{session?.user?.name}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{session?.user?.email}</p>
                                </div>
                                {session?.user?.last_name && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500">Last Name</p>
                                        <p className="font-medium">{session.user.last_name}</p>
                                    </div>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full mt-4 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white py-2 px-4 rounded-lg transition-all duration-300"
                                >
                                    Logout
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
