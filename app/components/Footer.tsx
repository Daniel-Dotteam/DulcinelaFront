import { colors } from '@/app/utils/theme';
import Link from 'next/link';
import Image from 'next/image';
import Logo02 from './Logo02';
import { useTranslations } from 'next-intl';

const Footer = () => {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#d04a53] text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info Column */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <div>
                            <Logo02 size={120} />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-white/90">{t('address.street')}</p>
                            <p className="text-white/90">{t('address.city')}</p>
                            <p className="text-white/90">{t('address.email1')}</p>
                            <p className="text-white/90">{t('address.email2')}</p>
                            {/* <p className="text-white/90">{t('address.email3')}</p>
                            <p className="text-white/90">{t('address.email4')}</p>
                            <p className="text-white/90">{t('address.email5')}</p> */}
                        </div>
                    </div>

                    {/* Social Links Column */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-semibold mb-4 text-lg">{t('social.title')}</h3>
                        <div className="space-y-2">
                            <Link 
                                href="https://www.instagram.com/dulcinella.md/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-white/90 no-underline hover:text-[#bce3de] transition-colors"
                            >
                                {t('social.instagram')}
                            </Link>
                            <Link 
                                href="https://www.facebook.com/dulcinella.md/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-white/90 no-underline hover:text-[#bce3de] transition-colors"
                            >
                                {t('social.facebook')}
                            </Link>
                        </div>
                    </div>

                    {/* Legal Links Column */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-semibold mb-4 text-lg">{t('legal.title')}</h3>
                        <div className="space-y-2 text-center md:text-left">
                            <Link 
                                href="https://dulcinella.md/ro/termenii-si-conditiile" 
                                className="block text-white/90 no-underline hover:text-[#bce3de] transition-colors"
                            >
                                {t('legal.terms')}
                            </Link>
                            {/* <Link 
                                href="/privacy" 
                                className="block text-white/90 no-underline hover:text-[#bce3de] transition-colors"
                            >
                                {t('legal.privacy')}
                            </Link> */}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-white/20 text-center">
                    <p className="text-white/80">
                        {t('copyright.rights', { year: currentYear })}
                    </p>
                    <p>
                        {t('copyright.poweredBy')}{' '}
                        <a 
                            className='text-white/90 no-underline hover:text-[#bce3de]' 
                            href="https://dotteam.md/" 
                            target='_blank'
                        >
                            DotTeam
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;