import { createMiddleware } from '@tanstack/react-start'

// Simple in-memory rate limiting (use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export const rateLimitLogin = (ip: string): boolean => {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts || now > attempts.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + 2 * 60 * 1000 }) // 15 min
    return true
  }

  if (attempts.count >= 5) {
    return false // Too many attempts
  }

  attempts.count++
  return true
}

export const rateLimiteMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const ip =
      request.headers.get('cf-connecting-ip') ??
      request.headers.get('x-forwarded-for')?.split(',')[0] ??
      '127.0.0.1' // ← ce sera la valeur en local
    if (!rateLimitLogin(ip)) {
      throw new Error('Veillez resseillez plus tard')
    }
    return next()
  },
)
