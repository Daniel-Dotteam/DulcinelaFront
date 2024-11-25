'use client'

import { useRouter } from 'next/navigation'
import Logo02 from './Logo02'
import { useLocale } from 'next-intl'

const AuthHeader = () => {
    const router = useRouter()
    const locale = useLocale()

    const handleLanguageChange = (newLocale: string) => {
        // Replace the current locale in the URL with the new one
        const newPath = window.location.pathname.replace(`/${locale}/`, `/${newLocale}/`)
        router.push(newPath)
    }

    return (
        <header className="bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo on the left */}
                <div className="flex items-center">
                    <Logo02 size={80} />
                </div>

                {/* Language selector on the right */}
                <div className="flex items-center gap-2">
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
                </div>
            </div>
        </header>
    )
}

export default AuthHeader
