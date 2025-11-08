'use client'

import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import type { FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormState = {
  name: string
  email: string
  company: string
  message: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
}

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
}

const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const isConfigured = useMemo(
    () => Object.values(emailConfig).every((value) => value.trim().length > 0),
    []
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isConfigured) {
      setFeedback({
        type: 'error',
        message: 'Email configuration is incomplete. Please try again later.',
      })
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)
    setFeedback(null)

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          company: formState.company,
          message: formState.message,
        },
        emailConfig.publicKey
      )

      setFeedback({
        type: 'success',
        message: 'Thanks for reaching out. We will get back to you within one business day.',
      })
      setFormState(initialFormState)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong while sending your message.'
      setFeedback({
        type: 'error',
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formState.name}
            onChange={handleChange}
            autoComplete="name"
            required
            disabled={isSubmitting}
            className="h-12 rounded-xl border-border/60 bg-background/80 px-4 text-sm shadow-sm transition focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Work email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={formState.email}
            onChange={handleChange}
            autoComplete="email"
            required
            disabled={isSubmitting}
            className="h-12 rounded-xl border-border/60 bg-background/80 px-4 text-sm shadow-sm transition focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium text-foreground">
          Company or project
        </Label>
        <Input
          id="company"
          name="company"
          placeholder="Agency name or project"
          value={formState.company}
          onChange={handleChange}
          autoComplete="organization"
          disabled={isSubmitting}
          className="h-12 rounded-xl border-border/60 bg-background/80 px-4 text-sm shadow-sm transition focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-foreground">
          How can we help?
        </Label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a bit about your billing workflow and what you're looking to improve."
          value={formState.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          rows={4}
          className="min-h-[120px] w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm transition focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-70"
        />
      </div>

      {feedback ? (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-emerald-200 bg-emerald-100/60 text-emerald-900'
              : 'border-red-200 bg-red-100/60 text-red-900'
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      {!isConfigured ? (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900"
        >
          Contact form configuration is pending. You can still reach us at{' '}
          <span className="font-medium">support@bilio.com</span>.
        </div>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !isConfigured}
        className="h-11 w-full rounded-xl bg-foreground text-background font-medium transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}

export default ContactForm

