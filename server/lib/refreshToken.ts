import { createMiddleware } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'
import jwt from 'jsonwebtoken'
import { generateToken } from '../utils/generateToken'
export const refreshTokenFn = createMiddleware({ type: 'request' }).server(
  ({ next }) => {
    const cookiesRefresh = getCookie('refresh') as string
    if (!cookiesRefresh) {
      throw redirect({ to: '/' })
    }
    let decodeJWT = {} as {
      userId: string
      email: string
      role: 'USER' | 'ADMIN'
    }
    try {
      decodeJWT = jwt.decode(cookiesRefresh) as {
        userId: string
        email: string
        role: 'USER' | 'ADMIN'
      }
    } catch (error) {
      throw error
    }

    const { userId, email, role, ...rest } = decodeJWT
    const context = { userId, email, role }
    return next({ context })
  },
)

export const accesTokenFn = createMiddleware({ type: 'function' })
  .validator((data: any) => data)
  .server(({ next, data }) => {
    const { accesToken } = generateToken(data)
    return next({
      context: {
        Bearer: accesToken,
      },
    })
  })
