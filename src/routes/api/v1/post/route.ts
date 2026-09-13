import { createFileRoute } from '@tanstack/react-router'
import { prisma } from '../../../../../lib/prisma'
import type { postType } from '../../../../../server/models/post-model'

import { refreshTokenFn } from '../../../../../server/lib/refreshToken'
import postController from '../../../../../server/controllers/post-controller'
import { createCsrfMiddleware } from '@tanstack/react-start'

export const Route = createFileRoute('/api/v1/post')({
  server: {
    middleware: [createCsrfMiddleware(), refreshTokenFn],
    handlers: {
      POST: async ({ request, context }) => {
        return await postController.create(request, context.userId)
      },
      GET: async ({ context }) => {
        return await postController.getAllPost(context.userId)
      },
    },
  },
})
