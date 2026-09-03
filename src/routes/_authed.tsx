import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'
import { getUserCurrent } from '../../server/routes/user-route'

import { useLogout, useUpdateRole } from '#/api/hooks/user-hook'
import { AuthProvider, useAuth } from '#/context/auth'
import { Suspense } from 'react'
import Loading from '#/components/ui/Loading'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getUserCurrent()
    if (user?.id === undefined) {
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
  const { user, refetch, isLoading } = useAuth()
  const { mutate: updateRole } = useUpdateRole()
  return (
    <div className="m-4">
      <button
        onClick={() => mutate()}
        className="btn btn-error text-error-content "
      >
        Deconnexion
      </button>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-2">
          <h1>UTILISATEUR</h1>
          <p>FirstName: {user?.firstName} </p>
          <p>Email: {user?.email} </p>
          <p>
            Role:{' '}
            <button
              onClick={() =>
                updateRole(user?.role === 'USER' ? 'ADMIN' : 'USER', {
                  onSuccess: () => refetch(),
                })
              }
              className="btn btn-neutral"
            >
              {user?.role}
            </button>{' '}
          </p>
        </div>
      )}
      <Outlet />
    </div>
  )
}
