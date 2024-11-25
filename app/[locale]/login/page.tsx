'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Snowfall from '../../components/Snowfall'
import Logo02 from '../../components/Logo02'
import { useFormik } from 'formik'
import LoginSchema from '../../schema/login.schema'
import { useTranslations } from 'next-intl'
import AuthHeader from '../../components/AuthHeader'

const initialValues = {
  email: '',
  password: ''
}

export default function Login({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('LoginPage');

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-red-900 relative overflow-hidden p-4 sm:p-10">
        <Snowfall />
        
        <div className="max-w-md w-full space-y-8 p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Logo02 size={100} />
            </div>
            <h2 className="text-3xl font-extrabold text-green-800">
              {t('title')}
            </h2>
            <p className="text-red-700">{t('subtitle')}</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {formik.isSubmitting ? t('buttons.loggingIn') : t('buttons.login')}
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link href={`/${locale}/register`} className="text-red-700 hover:text-green-700 transition-colors duration-300">
              {t('registerLink')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
