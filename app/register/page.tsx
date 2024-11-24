'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Snowfall from '../components/Snowfall'
import Logo02 from '../components/Logo02'

export default function Register() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    number: '',
    password: '',
    birthDate: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Users/addUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          last_name: formData.last_name,  // Changed from last_name to last_name
          email: formData.email,
          number: formData.number,
          password: formData.password,
          birth_date: formData.birthDate  // Changed from birthDate to birth_date
        })
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const data = await res.json()
        setError(data.message || 'Registration failed')
      }
    } catch (error) {
      setError('An error occurred during registration')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-red-900 relative overflow-hidden p-4 sm:p-10">
      <Snowfall />
      
      <div className="max-w-md w-full space-y-8 p-4 sm:p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo02 size={100} />
          </div>
          <h2 className="text-3xl font-extrabold text-green-800">
            Join Us! 🎄
          </h2>
          <p className="text-red-700">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="First Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="tel"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Phone Number"
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <input
                type="date"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-red-700 hover:text-green-700 transition-colors duration-300">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 