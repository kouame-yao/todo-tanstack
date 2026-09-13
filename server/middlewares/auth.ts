import { createMiddleware } from '@tanstack/react-start'
import userService from '../services/user-service'
import type { userType } from '../models/user-model'
import { refreshTokenFn } from '../lib/refreshToken'

export const authentificationMiddleware = createMiddleware({
  type: 'function',
})
  .middleware([refreshTokenFn])
  .server(async ({ next, context }) => {
    const user = (await userService.getUser(context.userId)) as userType
    return next({
      context: {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
    })
  })
export const roles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

type Role = (typeof roles)[keyof typeof roles]

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy = {
    [roles.USER]: 0,
    [roles.ADMIN]: 1,
  }

  return hierarchy[userRole] >= hierarchy[requiredRole]
}
export const authorizationRole = createMiddleware({ type: 'function' })
  .middleware([authentificationMiddleware])
  .server(async ({ next, context }) => {
    if (!hasPermission(context.role, 'ADMIN')) {
      throw new Error('VOUS ETES PAS AUTHORISEZ A EFFECTUEZ CETTE ACTION')
    }
    return next()
  })
