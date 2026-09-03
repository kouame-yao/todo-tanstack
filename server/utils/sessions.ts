import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  userId?: string
  email?: string
  role?: 'ADMIN' | 'USER'
}

export function useAppSession() {
  return useSession<SessionData>({
    // Session configuration

    name: 'app-session',
    password: process.env.SESSION_SECRET!, // At least 32 characters
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      httpOnly: true, // XSS protection
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
  })
}
