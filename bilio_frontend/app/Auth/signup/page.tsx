"use client"

import { Suspense } from 'react'
import AuthCard from '@/components/auth/AuthCard'
import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'

function SignupFormWrapper() {
  return (
    <Suspense fallback={
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  )
}

export default function Page() {
  return (
    <AuthCard title="Create your account" description="Join Bilio and set up your workspace">
      <SignupFormWrapper />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/Auth/login" className="text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}


