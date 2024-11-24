import { getSession } from 'next-auth/react'

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const session = await getSession()
  
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`
  
  const headers = {
    'Content-Type': 'application/json',
    ...(session?.accessToken ? { 'Authorization': `Bearer ${session.accessToken}` } : {}),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
} 