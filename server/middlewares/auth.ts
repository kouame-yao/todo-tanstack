import { createMiddleware } from '@tanstack/react-start'
import { useAppSession } from '../utils/sessions'
import { redirect } from '@tanstack/react-router'
import userService from '../services/user-service'
import type { userType } from '../models/user-model'

export const authentificationMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  const sessions = await useAppSession()
  if (
    sessions.data.userId === undefined ||
    sessions.data.userId === null ||
    !sessions.id
  ) {
    await sessions.clear()
    throw redirect({ to: '/' })
  }
  const user = (await userService.getUser(sessions.data.userId)) as userType
  return next({
    context: {
      userId: sessions.data.userId,
      email: sessions.data.userId,
      sessionsId: sessions.id,
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
