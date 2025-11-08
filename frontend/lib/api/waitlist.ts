const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if (!BACKEND_URL) {
  console.warn(
    'NEXT_PUBLIC_BACKEND_URL is not set. Waitlist API calls will fail until this environment variable is configured.'
  )
}

export type WaitlistJoinResponse = {
  email: string
  message: string
}

export async function joinWaitlist(email: string): Promise<WaitlistJoinResponse> {
  if (!BACKEND_URL) {
    throw new Error('Backend URL is not configured')
  }

  const response = await fetch(`${BACKEND_URL}/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || 'Failed to join the waitlist')
  }

  return response.json() as Promise<WaitlistJoinResponse>
}

