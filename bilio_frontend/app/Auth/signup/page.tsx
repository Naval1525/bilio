"use client"

import AuthCard from '@/components/auth/AuthCard'
import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'

export default function Page() {
  return (
    <AuthCard title="Create your account" description="Join Bilio and set up your workspace">
      <SignupForm />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/Auth/login" className="text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}


