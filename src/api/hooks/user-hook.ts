import { useServerFn } from '@tanstack/react-start'
import {
  logoutFn,
  signInApi,
  signUpApi,
} from '../../../server/routes/user-route'
import { useMutation } from '@tanstack/react-query'
import type { userType } from '../../../server/models/user-model'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
// HOOK POUR CREER UN COMPTE UTLISATEUR
export const useSignUp = () => {
  const createUser = useServerFn(signUpApi)
  return useMutation({
    mutationFn: async (data: userType) => await createUser({ data }),
  })
}
// HOOK POUR CONNECTER UN UTILISATEUR
export const useSignIn = () => {
  const connectUSer = useServerFn(signInApi)
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) =>
      await connectUSer({
        data: { email: data.email, password: data.password },
      }),
    onSuccess: () => {
      toast.message('VOUS ETES CONNECTEZ')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useLogout = () => {
  const lougUser = useServerFn(logoutFn)
  return useMutation({
    mutationFn: async () => await lougUser(),
    onSuccess: () => {
      toast.success('VOUS ESTE DECONNECTER')
    },
    onError(error) {
      toast.error(error.message)
    },
  })
}
