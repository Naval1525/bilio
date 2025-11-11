

import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  // Compute isAuthenticated from token existence
  const isAuthenticated = useAuthStore((s) => !!s.token)
  const isLoading = useAuthStore((s) => s.isLoading)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const error = useAuthStore((s) => s.error)
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const logout = useAuthStore((s) => s.logout)
  const clearError = useAuthStore((s) => s.clearError)
  const setHasHydrated = useAuthStore((s) => s.setHasHydrated)

  // Ensure hydration state is set on mount
  useEffect(() => {
    if (!hasHydrated) {
      setHasHydrated(true)
    }
  }, [hasHydrated, setHasHydrated])

  return {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || !hasHydrated,
    error,
    login,
    register,
    logout,
    clearError,
  }
}


