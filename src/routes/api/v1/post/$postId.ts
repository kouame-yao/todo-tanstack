import { createFileRoute } from '@tanstack/react-router'
import { refreshTokenFn } from '../../../../../server/lib/refreshToken'
import postController from '../../../../../server/controllers/post-controller'
import { createCsrfMiddleware } from '@tanstack/react-start'

export const Route = createFileRoute('/api/v1/post/$postId')({
  server: {
    middleware: [createCsrfMiddleware(), refreshTokenFn],
    handlers: {
      GET: async ({ context, params }) => {
        return await postController.getByone(params.postId, context.userId)
      },
      PUT: async ({ request, context, params }) => {
        return await postController.updatePost(
          request,
          params.postId,
          context.userId,
        )
      },
      DELETE: async ({ context, params }) => {
        return await postController.deletePost(params.postId, context.userId)
      },
    },
  },
})
