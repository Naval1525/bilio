import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthUser, LoginResponse } from '@/lib/api/auth'
import { login as apiLogin, registerUser as apiRegister } from '@/lib/api/auth'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
  hasHydrated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (input: {
    email: string
    password: string
    name: string
    workspace_name: string
  }) => Promise<void>
  logout: () => void
  setFromResponse: (resp: LoginResponse) => void
  clearError: () => void
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({ hasHydrated: state })
      },
      setFromResponse: (resp) =>
        set({
          user: resp.user,
          token: resp.token,
          isLoading: false,
          error: null,
        }),
      clearError: () => set({ error: null }),
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const resp = await apiLogin(email, password)
          set({
            user: resp.user,
            token: resp.token,
            isLoading: false,
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed'
          set({ error: message, isLoading: false })
          throw err
        }
      },
      register: async (input) => {
        set({ isLoading: true, error: null })
        try {
          const resp = await apiRegister(input)
          set({
            user: resp.user,
            token: resp.token,
            isLoading: false,
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Registration failed'
          set({ error: message, isLoading: false })
          throw err
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'bilio-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)


