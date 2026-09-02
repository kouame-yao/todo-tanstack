import { createServerFn } from '@tanstack/react-start'
import type { userType } from '../models/user-model'
import userController from '../controllers/user-controller'
import { useAppSession } from '../utils/sessions'
import { redirect } from '@tanstack/react-router'
import { authentificationMiddleware } from '../middlewares/auth'
//import { redis } from '../lib/radis'

export const signUpApi = createServerFn({ method: 'POST' })
  .validator((data: userType) => data)
  .handler(async ({ data }) => {
    return await userController.signUp(data)
  })

export const signInApi = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    return await userController.signIn(data.email, data.password)
  })

export const getUserCurrent = createServerFn({ method: 'GET' })
  .middleware([authentificationMiddleware])
  .handler(async ({ context }) => {
    return await userController.getUser({
      userId: context.userId,
      idSessions: context.sessionsId,
    })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  //await redis.del(session.id as string)
  await session.clear()
  throw redirect({ to: '/' })
})
