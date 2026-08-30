import { useLocation, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, type ChangeEvent } from 'react'
import type { userType } from '../../../server/models/user-model'
import { useSignIn } from '#/api/hooks/user-hook'
import Loading from '../ui/Loading'
import Alerte from '../ui/Alerte'

export default function SignIn({
  setToggle,
}: {
  setToggle: (val: boolean) => void
}) {
  const { mutate, data, error, isPending, isSuccess, reset } = useSignIn()

  const local = useLocation()
  const navigate = useNavigate()
  const handleToggle = () => {
    const hrefCurrent = local.pathname.includes('/')
    if (hrefCurrent) {
      navigate({ to: '/', search: { signUp: '?' } })
      setToggle(true)
    }
    return
  }

  const handleConnect = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const value: { email: string; password: string } = {
      email: formData.get('email')!.toString(),
      password: formData.get('password')!.toString(),
    }

    mutate(value, {
      onSuccess: () => {
        form.reset()
      },
    })
  }, [])

  return (
    <form onSubmit={handleConnect}>
      {error && <Alerte message={error.message} />}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Connexion</legend>

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          className="input"
          placeholder="Password"
        />

        <button type="submit" className="btn btn-neutral mt-4">
          {isPending ? <Loading /> : ' Connecter'}
        </button>
        <button
          onClick={handleToggle}
          type="button"
          className="[&:hover]:underline cursor-pointer"
        >
          Crée un compte
        </button>
      </fieldset>
    </form>
  )
}
