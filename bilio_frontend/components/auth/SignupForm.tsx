"use client"

import { useState } from 'react'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'

const signupSchema = z.object({
  name: z.string().min(2),
  workspace_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { register, isLoading } = useAuth()
  const [form, setForm] = useState({
    name: '',
    workspace_name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = signupSchema.safeParse(form)
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof typeof form, string>> = {}
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as keyof typeof form] = i.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    try {
      await register(form)
      toast.success('Account created')
      const callback = searchParams.get('callback')
      router.push(callback || '/Dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          aria-invalid={!!errors.name}
        />
        {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="workspace_name">Workspace</Label>
        <Input
          id="workspace_name"
          value={form.workspace_name}
          onChange={(e) => setForm((f) => ({ ...f, workspace_name: e.target.value }))}
          aria-invalid={!!errors.workspace_name}
        />
        {errors.workspace_name ? (
          <p className="text-xs text-destructive">{errors.workspace_name}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          aria-invalid={!!errors.email}
        />
        {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          aria-invalid={!!errors.password}
        />
        {errors.password ? <p className="text-xs text-destructive">{errors.password}</p> : null}
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  )
}


