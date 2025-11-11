"use client"

import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

const page = () => {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Only redirect if we've finished loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace('/Auth/login?callback=%2FDashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Show nothing while loading or if not authenticated (will redirect)
  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div>
      Dashboard
    </div>
  )
}

export default page
