import { createServerFn } from '@tanstack/react-start'
import type { userType } from '../models/user-model'
import userController from '../controllers/user-controller'
import { useAppSession } from '../utils/sessions'
import { redirect } from '@tanstack/react-router'

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

export const getUserCurrent = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await userController.getUser()
    return {
      id: user?.toJSON().id,
      firstName: user?.toJSON().firstName,
      email: user?.toJSON().email,
    } as { id?: string; firstName: string; email: string }
  },
)

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})
