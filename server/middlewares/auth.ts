import { createMiddleware } from '@tanstack/react-start'
import { useAppSession } from '../utils/sessions'
import { redirect } from '@tanstack/react-router'

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

  return next({
    context: {
      userId: sessions.data.userId,
      email: sessions.data.userId,
      sessionsId: sessions.id,
    },
  })
})
