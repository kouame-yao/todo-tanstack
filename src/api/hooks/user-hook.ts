import { useServerFn } from '@tanstack/react-start'
import {
  logoutFn,
  signInApi,
  signUpApi,
} from '../../../server/routes/user-route'
import { useMutation } from '@tanstack/react-query'
import type { userType } from '../../../server/models/user-model'

export const useSignUp = () => {
  const createUser = useServerFn(signUpApi)
  return useMutation({
    mutationFn: async (data: userType) => await createUser({ data }),
  })
}

export const useSignIn = () => {
  const connectUSer = useServerFn(signInApi)
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      await connectUSer({
        data: { email: data.email, password: data.password },
      }),
  })
}

export const useLogout = () => {
  const lougUser = useServerFn(logoutFn)
  return useMutation({
    mutationFn: async () => await lougUser(),
  })
}
