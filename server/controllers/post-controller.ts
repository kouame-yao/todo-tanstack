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
  async create(req: Request, userId: string) {
    // const session = await useAppSession()
    // const userId = session.data.userId as string
    const data = (await req.json()) as postType
    if (!data.title || !data.content || !userId) {
      throw new Error('Donnée attendu')
    }
    try {
      await this.PostService.create({
        title: data.title,
        content: data.content,
        userId,
      })
      return new Response(
        JSON.stringify({ message: `POSTE AJOUTER AVEC SUCCES`, data }),
        {
          status: 200,
        },
      )
    } catch (error) {
      console.error(error)
      return new Response('ERREUR SERVER ' + error, { status: 500 })
    }
  }
  /**
   * Récupération des posts
   * @returns La list des posts
   */
  async getAllPost(userId: string) {
    try {
      const post = await this.PostService.getAllPost(userId)
      return new Response(JSON.stringify(post), {
        status: 200,
      })
    } catch (error) {
      console.log(error)
      return new Response('ERREUR SERVER ' + error, { status: 500 })
    }
  }
  /**
   * Récuperation d'un poste par son Identifiant
   * @param postId Identifiant pour recupéer un post
   * @returns Le post ou null si il existe pas
   */
  async getByone(postId: string, userId: string) {
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
      return new Response(JSON.stringify(post), {
        status: 200,
      })
    } catch (error) {
      console.log(error)
      return new Response('ERREUR SERVER ' + error, { status: 500 })
    }
  }
  /**
   * Modifiée le post grâce a son identifiant
   * @param data Donnée attendu pour modifiée le post
   * @param postId Identifiant pour modifiée un post
   */
  async updatePost(req: Request, postId: string, userId: string) {
    const data = (await req.json()) as Partial<postType>
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
      await this.PostService.updatePost(id, data)
      return new Response(
        JSON.stringify({ message: 'POSTE MODIFIER AVEC SUCCES' }),
        {
          status: 200,
        },
      )
    } catch (error) {
      console.log(error)
      return new Response('ERREUR SERVER ' + error, { status: 500 })
    }
  }
  /**
   * Supprimer le post grâce à son identifiant
   * @param postId Identifiant pour supprimée le post
   */
  async deletePost(postId: string, userId: string) {
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

      await this.PostService.deletePost(id)
      return new Response(
        JSON.stringify({ message: 'POST SUPPRIMER AVEC SUCCES' }),
        {
          status: 200,
        },
      )
    } catch (error) {
      console.log(error)
      return new Response('ERREUR SERVER ' + error, { status: 500 })
    }
  }
}

//await PostModel.sync({ force: true })
export default new PostController(postService)
