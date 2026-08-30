import { createServerFn } from '@tanstack/react-start'
import type { postType } from '../models/post-model'
import postController from '../controllers/post-controller'

/**
 * Function server pour crée un post
 * @param {postType} data - Donnée pour crée un post
 * @returns {Promise<postType>} Le post crée en forma JSON
 */
export const AddPostHanler = createServerFn({ method: 'POST' })
  .validator((data: postType) => data)
  .handler(async ({ data }) => {
    const post = await postController.create(data)
    return post.toJSON()
  })

/**
 * Function server recupérée un post par sont identifiant
 * @param {string} postId - Identifiant pour recupée le post
 * @returns {Promise<postType>} Le post trouver ou null si il existe pas
 */
export const GetPostHandler = createServerFn({ method: 'GET' })
  .validator((postId: string) => postId)
  .handler(async ({ data }) => {
    const post = await postController.getByone(data)
    return post.toJSON()
  })

/**
 * Function server recupérée la list des posts
 * @returns {Promise<postType>} Le post trouver ou null si il existe pas
 */
export const GetPostAllHandler = createServerFn({ method: 'GET' }).handler(
  async () => {
    const post = await postController.getAllPost()
    return post
  },
)
/**
 * Function server modifiée un post par sont identifiant
 * @param {Partial<postType>} data - Donnée pour modifiée le post
 * @returns {Promise<postType>} Donnée modifiée
 */
export const UpdatePostHandler = createServerFn({ method: 'POST' })
  .validator((data: { post: Partial<postType>; postId: string }) => data)
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
  .handler(async ({ data }) => {
    await postController.deletePost(data)
    return {
      message: 'POST ' + data + ' SUPPRIMER AVEC SUCCES',
    }
  })
