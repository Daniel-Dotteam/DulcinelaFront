'use client'

import { useRouter } from 'next/navigation'
import Logo02 from './Logo02'
import { useLocale } from 'next-intl'
import { colors } from '../utils/theme'

const AuthHeader = () => {
    const router = useRouter()
    const locale = useLocale()

    const handleLanguageChange = (newLocale: string) => {
        const newPath = window.location.pathname.replace(`/${locale}/`, `/${newLocale}/`)
        router.push(newPath)
    }

    return (
        <header className="shadow-lg bg-[#e7f7f5]">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Logo02 size={120} />
                </div>
                

                <div className="flex items-center gap-2">
                    <select
                        value={locale}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="px-4 py-2 text-sm rounded-lg
                            bg-gradient-to-r from-green-light/90 to-green-main/90
                            text-text-primary font-medium
                            border-2 border-green-dark/20
                            hover:border-green-dark/40
                            focus:outline-none focus:border-green-dark
                            focus:ring-2 focus:ring-green-dark/20
                            cursor-pointer appearance-none
                            transition-all duration-300
                            pr-8 relative
                            bg-no-repeat bg-[length:16px] bg-[center_right_0.75rem]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
                        }}
                    >
                        <option value="ro">Română</option>
                        <option value="ru">Русский</option>
                    </select>
                </div>
            </div>
        </header>
    )
}

export default AuthHeader
