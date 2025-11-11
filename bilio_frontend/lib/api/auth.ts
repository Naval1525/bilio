const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if (!BACKEND_URL) {
  console.warn(
    'NEXT_PUBLIC_BACKEND_URL is not set. Auth API calls will fail until this environment variable is configured.'
  )
}

export type AuthUser = {
  id: string
  email: string
  name: string
  workspace_name?: string
  created_at?: string
  updated_at?: string
}

export type LoginResponse = {
  user: AuthUser
  token: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  if (!BACKEND_URL) {
    throw new Error('Backend URL is not configured')
  }
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || 'Failed to login')
  }
  return response.json() as Promise<LoginResponse>
}

export async function registerUser(input: {
  email: string
  password: string
  name: string
  workspace_name: string
}): Promise<LoginResponse> {
  if (!BACKEND_URL) {
    throw new Error('Backend URL is not configured')
  }
  const response = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || 'Failed to register')
  }
  return response.json() as Promise<LoginResponse>
}


