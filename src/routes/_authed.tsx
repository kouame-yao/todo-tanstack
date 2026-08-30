import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { getUserCurrent } from '../../server/routes/user-route'

import { useLogout } from '#/api/hooks/user-hook'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location, context }) => {
    const user = await getUserCurrent()
    if (!user.id) {
      throw redirect({
        to: '/',
        search: { redirect: location.href },
      })
    }

    return { user }
  },
  component: Authed,
})

function Authed() {
  const { mutate } = useLogout()
  const { user } = useRouteContext({ from: '/_authed' })

  return (
    <div>
      <div className="m-4">
        <button onClick={() => mutate()} className="btn btn-error">
          Deconnexion
        </button>
        <div className="mt-2">
          <h1>UTILISATEUR</h1>
          <p>FirstName: {user.firstName} </p>
          <p>Email: {user.email} </p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
