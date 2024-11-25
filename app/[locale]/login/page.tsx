'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Snowfall from '../../components/Snowfall'
import Logo02 from '../../components/Logo02'
import { useFormik } from 'formik'
import createLoginSchema from '../../schema/login.schema'
import { useTranslations } from 'next-intl'
import AuthHeader from '../../components/AuthHeader'
import { colors } from '../../utils/theme'
import { useEffect } from 'react'

const initialValues = {
  email: '',
  password: ''
}

export default function Login({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const t = useTranslations('LoginPage');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setShowSuccessModal(true)
    }
  }, [searchParams])

  const formik = useFormik({
    initialValues,
    validationSchema: createLoginSchema((key: string) => t(key)),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
        } else {
          router.push('/')
          router.refresh()
        }
      } catch (error) {
        setError('An error occurred during login')
      } finally {
        setSubmitting(false)
      }
    }
  });

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#bce3de] to-[#faedcb] relative overflow-hidden p-4 sm:p-10">
        <Snowfall />
        
        <div className="max-w-md w-full space-y-8 p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Logo02 size={100} />
            </div>
            <h2 className="text-3xl font-extrabold" style={{ color: colors.green.dark }}>
              {t('title')}
            </h2>
            <p style={{ color: colors.red.main }}>{t('subtitle')}</p>
          </div>
          
          {error && (
            <div className="border rounded px-4 py-3" 
              style={{ 
                backgroundColor: `${colors.red.light}20`, 
                borderColor: colors.red.main,
                color: colors.red.main 
              }}>
              {error === 'CredentialsSignin' ? t('errors.invalidCredentials') : t('errors.generalError')}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">{t('formFields.email')}</label>
                <input
                  id="email"
                  type="email"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder={t('formFields.email')}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">{t('formFields.password')}</label>
                <input
                  id="password"
                  type="password"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    formik.touched.password && formik.errors.password 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder={t('formFields.password')}
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-300 bg-[${colors.green.light}] hover:bg-[${colors.red.main}] ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {formik.isSubmitting ? t('buttons.loggingIn') : t('buttons.login')}
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link 
              href={`/${locale}/register`} 
              className={`text-[${colors.red.main}] hover:text-[${colors.green.main}]`}
            >
              {t('registerLink')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4">
            <div className="text-center">
              <div className="mb-4" style={{ color: colors.green.main }}>
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: colors.text.primary }}>
                {t('registrationSuccess.title')}
              </h3>
              <p className="text-sm mb-4" style={{ color: colors.text.secondary }}>
                {t('registrationSuccess.message')}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-opacity duration-200"
                style={{ 
                  backgroundColor: colors.green.main,
                  borderColor: colors.green.dark
                }}
              >
                {t('registrationSuccess.continue')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
