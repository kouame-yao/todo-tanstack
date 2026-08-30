// contexts/auth.tsx
import React, { createContext, useContext } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { getUserCurrent } from '../../server/routes/user-route'
import { useQuery } from '@tanstack/react-query'
import type { userType } from '../../server/models/user-model'

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
  const userCurrent = useServerFn(getUserCurrent)
  const {
    data: user,
    isPending,
    refetch,
  } = useQuery({
    queryFn: async () => await userCurrent(),
    queryKey: ['User', 'list'],
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
