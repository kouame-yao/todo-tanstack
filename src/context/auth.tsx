// contexts/auth.tsx
import React, { createContext, useContext, useEffect } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getUserCurrent } from '../../server/routes/user-route'
import { useQuery } from '@tanstack/react-query'
import type { roleType, userType } from '../../server/models/user-model'
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
  role: roleType
}

type AuthContextType = {
  user: Partial<User> | undefined
  isLoading: boolean
  refetch: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userCurrent = useServerFn(getUserCurrent)
  const {
    data: user,
    isPending,
    refetch,
  } = useQuery({
    queryFn: async () => await userCurrent(),
    queryKey: ['User', 'list'],
    refetchOnWindowFocus: false,
  })

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
