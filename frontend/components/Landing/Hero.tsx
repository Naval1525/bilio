'use client'

import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { joinWaitlist } from '@/lib/api/waitlist'

const isValidEmail = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

const Hero = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.')
      setSuccessMessage(null)
      return
    }

    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const response = await joinWaitlist(email.trim())
      setSuccessMessage(response.message ?? 'Thanks for joining the waitlist!')
      setEmail('')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center px-4 py-8 bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
        Simplify Your Billing. Amplify Your Business.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bilio is a single workspace to create branded invoices, track payments, record expenses, and generate tax summaries for agencies and freelancers.
        </p>
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-8"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
            className="w-full sm:flex-1 h-12 px-4 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full sm:w-auto h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? 'Joining...' : 'Join the waitlist'}
          </Button>
        </form>
        {successMessage ? (
          <p className="text-sm text-green-600">{successMessage}</p>
        ) : errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  )
}

export default Hero
