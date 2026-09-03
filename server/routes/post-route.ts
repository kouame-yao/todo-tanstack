import { createServerFn } from '@tanstack/react-start'
import type { postType } from '../models/post-model'
import postController from '../controllers/post-controller'
import {
  authentificationMiddleware,
  authorizationRole,
} from '../middlewares/auth'

/**
 * Function server pour crée un post
 * @param {postType} data - Donnée pour crée un post
 * @returns {Promise<postType>} Le post crée en forma JSON
 */
export const AddPostHanler = createServerFn({ method: 'POST' })
  .validator((data: postType) => data)
  .middleware([authentificationMiddleware])
  .handler(async ({ data, context }) => {
    const post = await postController.create({
      ...data,
      userId: context.userId,
    })
    return post
  })

/**
 * Function server recupérée un post par sont identifiant
 * @param {string} postId - Identifiant pour recupée le post
 * @returns {Promise<postType>} Le post trouver ou null si il existe pas
 */
export const GetPostHandler = createServerFn({ method: 'GET' })
  .validator((postId: string) => postId)
  .middleware([authentificationMiddleware])
  .handler(async ({ data }) => {
    const post = await postController.getByone(data)
    return post
  })

/**
 * Function server recupérée la list des posts
 * @returns {Promise<postType>} Le post trouver ou null si il existe pas
 */
export const GetPostAllHandler = createServerFn({ method: 'GET' })
  .middleware([authentificationMiddleware])
  .handler(async ({ context }) => {
    const post = await postController.getAllPost(context.userId)
    return post
  })
/**
 * Function server modifiée un post par sont identifiant
 * @param {Partial<postType>} data - Donnée pour modifiée le post
 * @returns {Promise<postType>} Donnée modifiée
 */
export const UpdatePostHandler = createServerFn({ method: 'POST' })
  .validator((data: { post: Partial<postType>; postId: string }) => data)
  .middleware([authentificationMiddleware])
  .handler(async ({ data }) => {
    await postController.updatePost(data.post, data.postId)
    return data.post
  })

/**
 * Function server pour supprée le posts
 * @param {string} - Identifiant pour supprimée le post
 * @returns {Promise<{message:string}>} Le post message de validite ou null si il existe pas
 */
export const DeletePostHandler = createServerFn({ method: 'POST' })
  .validator((postId: string) => postId)
  .middleware([authentificationMiddleware, authorizationRole])
  .handler(async ({ data }) => {
    await postController.deletePost(data)
    return {
      message: 'POST ' + data + ' SUPPRIMER AVEC SUCCES',
    }
  })
