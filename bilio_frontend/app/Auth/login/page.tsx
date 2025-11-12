"use client"

import { Suspense } from 'react'
import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

function LoginFormWrapper() {
  return (
    <Suspense fallback={
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

export default function Page() {
  return (
    <AuthCard title="Welcome back" description="Sign in to continue to Bilio">
      <LoginFormWrapper />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/Auth/signup" className="text-primary underline-offset-4 hover:underline">
          Create one
        </Link>
      </p>
    </AuthCard>
  )
}


