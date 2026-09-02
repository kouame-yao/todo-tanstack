// contexts/auth.tsx
import React, { createContext, useContext, useEffect } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getUserCurrent } from '../../server/routes/user-route'
import { useQuery } from '@tanstack/react-query'
import type { userType } from '../../server/models/user-model'
import Loading from '#/components/ui/Loading'
import {
  reactUse,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import SignIn from '#/components/login/SignIn'

type User = {
  id?: string
  firstName: string
  email: string
}

type AuthContextType = {
  user: User | undefined
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const router = useRouter()
  const userCurrent = useServerFn(getUserCurrent)
  const {
    data: user,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryFn: async () => await userCurrent(),
    queryKey: ['User', 'list'],
    refetchOnWindowFocus: false,
  })

  const isAuthenticated = !!(user && user.id)
  useEffect(() => {
    if (isPending) return
    if (!isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [navigate, isAuthenticated, isPending, user])

  if (isPending) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading size="lg" />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isLoading: isPending, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
