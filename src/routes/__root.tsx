import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouteContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'sonner'

import appCss from '../styles.css?url'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthProvider } from '#/context/auth'
import ButtonTheme from '#/components/ui/ButtonTheme'
import { getThemeFn } from '#/utils/Theme-fn'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  beforeLoad: async () => ({ theme: await getThemeFn() }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const [queryclient] = useState(() => new QueryClient())
  const { theme } = useRouteContext({ from: '__root__' })

  return (
    <html lang="fr" data-theme={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryclient}>
          <Toaster />
          {children}
          <ButtonTheme />
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  )
}
