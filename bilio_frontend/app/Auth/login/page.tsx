"use client"

import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function Page() {
  return (
    <AuthCard title="Welcome back" description="Sign in to continue to Bilio">
      <LoginForm />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/Auth/signup" className="text-primary underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </AuthCard>
  )
}


