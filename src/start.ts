import {
  createStart,
  createMiddleware,
  createCsrfMiddleware,
} from '@tanstack/react-start'
import {
  getResponseHeaders,
  setResponseHeaders,
} from '@tanstack/react-start/server'

// 1. CSRF pour les Server Functions (correct, gardez-le)
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

// 2. Middleware pour les headers de sécurité (avec le workaround)
const securityHeadersMiddleware = createMiddleware().server(({ next }) => {
  // ⚠️ Workaround : récupérer d'abord les headers existants
  const headers = getResponseHeaders()

  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()')

  setResponseHeaders(headers)

  return next()
})

// 3. Les deux dans le tableau requestMiddleware
export const startInstance = createStart(() => ({
  requestMiddleware: [
    csrfMiddleware, // Protège les Server Functions
    securityHeadersMiddleware, // Ajoute les headers (avec workaround)
  ],
}))
