'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Snowfall from '../../components/Snowfall'
import Logo02 from '../../components/Logo02'
import AuthHeader from '../../components/AuthHeader'

import { DatePicker } from 'rsuite'
import 'rsuite/dist/rsuite-no-reset.min.css';

import { useFormik } from 'formik'

import createValidationSchema from '../../schema/form1.schema';
import {useTranslations} from 'next-intl';
import { colors } from '../../utils/theme'

const initialValues = {
  name: "",
  last_name: "",
  email: "",
  number: "",
  password: "",
  birth_date: null,
  marketingConsent: false,
};

export default function Register({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('RegisterPage');

  const formik = useFormik({
    initialValues,
    validationSchema: createValidationSchema((key: string) => t(key)),
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Users/addUser`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            last_name: values.last_name,
            email: values.email,
            number: values.number,
            password: values.password,
            birth_date: values.birth_date ? new Date(values.birth_date).toISOString().split('T')[0] : null,
            // marketingConsent: values.marketingConsent
          })
        })

        if (res.ok) {
          setError(null)
          router.push(`/${locale}/login?registered=true`)
        } else {
          const data = await res.json()
          setError(data.message || t('errors.registrationFailed'))
        }
      } catch (error) {
        setError(t('errors.generalError'))
      }
    }
  });

  return (
    <>
      <AuthHeader />
    
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-[#bce3de] to-[#faedcb] overflow-hidden p-4 sm:p-10">
      <Snowfall />
      
      <div className="max-w-md w-full space-y-8 p-4 sm:p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20">
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
            {error}
          </div>
        )}


        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            
            <div>
              <input
                type="text"
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  formik.touched.name && formik.errors.name 
                    ? `border-[${colors.red.main}]` 
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[${colors.green.main}] focus:border-[${colors.green.main}]`}
                placeholder={t('formFields.firstName')}
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: colors.red.main }} className="text-sm mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  formik.touched.last_name && formik.errors.last_name 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                placeholder={t('formFields.lastName')}
                {...formik.getFieldProps('last_name')}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.last_name}</div>
              )}
            </div>
            <div>
              <input
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
              <input
                type="tel"
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  formik.touched.number && formik.errors.number 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                placeholder={t('formFields.phoneNumber')}
                {...formik.getFieldProps('number')}
              />
              {formik.touched.number && formik.errors.number && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.number}</div>
              )}
            </div>
            <div>
              <input
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
            <div>
              <DatePicker 
                value={formik.values.birth_date}
                onChange={(date) => formik.setFieldValue('birth_date', date)}
                onBlur={() => formik.setFieldTouched('birth_date', true)}
                format="dd-MM-yyyy"
                placeholder={t('formFields.birthDate')}
                style={{ width: '100%' }}
                placement="topStart"
                className={`appearance-none rounded-lg relative block border ${
                  formik.touched.birth_date && formik.errors.birth_date 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500`}
              />
              {formik.touched.birth_date && formik.errors.birth_date && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.birth_date}</div>
              )}
            </div>
            <div className="flex items-start space-x-2 mt-4">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                onChange={(e) => formik.setFieldValue('marketingConsent', e.target.checked)}
                onBlur={formik.handleBlur}
                checked={formik.values.marketingConsent}
                className="mt-1"
              />
              <label htmlFor="marketingConsent" className="text-sm text-gray-700">
                <span>{t('formFields.marketingConsent')}</span>
                {' '}
                <a 
                  href="https://dulcinella.md/ro/termenii-si-conditiile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[${colors.green.main}] hover:text-[${colors.green.dark}] underline`}
                >
                  {t('formFields.termsLink')}
                </a>
              </label>
            </div>
            {formik.touched.marketingConsent && formik.errors.marketingConsent && (
              <div className="text-[#d04a53] text-sm mt-1">{formik.errors.marketingConsent}</div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-300 bg-[#327a71] hover:bg-[#d04a53]`}
            >
              {formik.isSubmitting ? t('buttons.registering') : t('buttons.register')}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link 
            href={`/${locale}/login`} 
            className={`text-[${colors.red.main}] hover:text-[${colors.green.main}]`}
          >
            {t('loginLink')}
          </Link>
        </div>
      </div>
    </div>
    </>
  )
} 