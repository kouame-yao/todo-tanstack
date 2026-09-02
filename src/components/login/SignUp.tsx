import { useLocation, useNavigate } from '@tanstack/react-router'
import type { ChangeEvent } from 'react'
import type { userType } from '../../../server/models/user-model'
import { useSignUp } from '#/api/hooks/user-hook'
import Alerte from '../ui/Alerte'
import Loading from '../ui/Loading'

export default function SignUp({
  setToggle,
}: {
  setToggle: (val: boolean) => void
}) {
  const { mutate, isPending, isError, error, data } = useSignUp()
  const local = useLocation()
  const navigate = useNavigate()
  const handleToggle = () => {
    const hrefCurrent = local.pathname.includes('/')
    if (hrefCurrent) {
      navigate({ to: '/', search: { signIn: '?' } })
      setToggle?.(false)
    }
    return
  }

  const handleCreate = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const value: userType = {
      firstName: formData.get('firstName')!.toString(),
      email: formData.get('email')!.toString(),
      password: formData.get('password')!.toString(),
    }
    mutate(value, {
      onSuccess: () => form?.reset(),
    })
  }
  return (
    <form onSubmit={handleCreate}>
      {isError && <Alerte message={error.message} />}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Inscription</legend>

        <label className="label">FirstName</label>
        <input
          name="firstName"
          type="text"
          className="input"
          placeholder="FistName"
        />

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
          {isPending ? <Loading size="sm" /> : "S'inscrit"}
        </button>
        <button
          onClick={handleToggle}
          type="button"
          className="[&:hover]:underline cursor-pointer"
        >
          Se connecter
        </button>
      </fieldset>
    </form>
  )
}
