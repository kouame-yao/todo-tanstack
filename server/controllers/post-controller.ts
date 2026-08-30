import { sequelize } from '../data/config'
import { PostModel, type postType } from '../models/post-model'
import postService from '../services/post-service'
import { useAppSession } from '../utils/sessions'
import { redirect } from '@tanstack/react-router'

type PostService = typeof postService

class PostController {
  /**
   * @param PostService
   */
  constructor(private PostService: PostService) {}

  /**
   * Crée un post
   * @param data donnée attendu pour crée le post
   * @returns Le post crée ou une erreur de type Error
   */
  async create(data: postType) {
    const session = await useAppSession()
    const userId = session.data.userId as string
    if (!userId) {
      throw new Error('VEILLEZ VOUS RECONNECTEZ')
    }
    const { title, content } = data
    if (!title || !content) {
      throw new Error('Donnée attendu')
    }
    try {
      const post = await this.PostService.create({
        title,
        content,
        userId,
      })
      return post
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  /**
   * Récupération des posts
   * @returns La list des posts
   */
  async getAllPost() {
    const session = await useAppSession()
    const userId = session.data.userId
    if (!userId) {
      throw new Error('VEILLEZ VOUS CONNECTEZ')
    }
    try {
      const post = await this.PostService.getAllPost(userId)
      return post
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  /**
   * Récuperation d'un poste par son Identifiant
   * @param postId Identifiant pour recupéer un post
   * @returns Le post ou null si il existe pas
   */
  async getByone(postId: string) {
    const session = await useAppSession()
    const userId = session.data.userId as string
    try {
      if (!postId) {
        throw new Error('Id manquant')
      }

      const post = await this.PostService.getByOne({ postId, userId })
      if (!post) {
        throw new Error('AUCUN POST TROUVER', {
          cause: 'POST DEJA SUPPRIMER OU ERREUR DU SERVER',
        })
      }
      return post
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  /**
   * Modifiée le post grâce a son identifiant
   * @param data Donnée attendu pour modifiée le post
   * @param postId Identifiant pour modifiée un post
   */
  async updatePost(data: Partial<postType>, postId: string) {
    const session = await useAppSession()
    const userId = session.data.userId as string
    try {
      if (!postId) {
        throw new Error('Id manquant')
      }
      const Existed = await this.PostService.getByOne({ postId, userId })
      if (!Existed) {
        throw new Error('AUCUN POST TROUVER', {
          cause: 'POST DEJA SUPPRIMER OU ERREUR DU SERVER',
        })
      }
      const id = Existed?.id as string
      const post = await this.PostService.updatePost(id, data)
      return post
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  /**
   * Supprimer le post grâce à son identifiant
   * @param postId Identifiant pour supprimée le post
   */
  async deletePost(postId: string) {
    const session = await useAppSession()
    const userId = session.data.userId ?? ''

    try {
      if (!postId) {
        throw new Error('Id manquant')
      }
      const Existed = await this.PostService.getByOne({ postId, userId })

      if (!Existed) {
        throw new Error('AUCUN POST TROUVER', {
          cause: 'POST DEJA SUPPRIMER OU ERREUR DU SERVER',
        })
      }
      const id = Existed?.id as string

      const post = await this.PostService.deletePost(id)
      return post
    } catch (error) {
      console.log(error)
      const Errors = error as Error
      if (Errors.message === 'VEILLEZ VOUS RECONNECTEZ ') {
        throw redirect({ to: '/' })
      }
      throw error instanceof Error
    }
  }
}

//await PostModel.sync({ force: true })
export default new PostController(postService)
