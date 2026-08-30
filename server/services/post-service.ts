import { prisma } from '../../lib/prisma'
import type { postType } from '../models/post-model'

/**
 *  @description CREATION D'UNE CLASS POUR REGROUPER LES FUNCTIONS DE GESTIONS DU MODEL POST
 * @function create @param
 */

class PostService {
  /**
   * Crée un nouveau post
   * @param data donnée du post à enregister
   * @returns le post crée en base de donnée
   */
  async create(data: postType) {
    //await PostModel.sync()
    return await prisma.post.create({ data: data })
  }
  /**
   * Récupere la liste des posts
   * @returns La liste des posts convertire en JSON
   */
  async getAllPost(userId: string | undefined) {
    const posts = await prisma.post.findMany({ where: { userId } })
    return posts
  }

  /**
   * Récupere grâce à sont identifiant
   * @param postId Identifiant du post
   * @returns Un post par sont Identifiant ou null si il existe pas
   */
  async getByOne({ postId, userId }: { postId: string; userId: string }) {
    if (!userId) {
      throw new Error('VEILLEZ VOUS RECONNECTEZ')
    }
    return await prisma.post.findFirst({ where: { id: postId, userId } })
  }
  /**
   * Modifiée le post
   * @param postId Identifiant pour modifier le post
   * @param data donnée pour modifier le post
   */
  async updatePost(postId: string, data: Partial<postType>) {
    return await prisma.post.update({ where: { id: postId }, data: data })
  }
  /**
   * Supprimée le post
   * @param postId Identifiant pour supprimer le post
   */
  async deletePost(postId: string) {
    return await prisma.post.delete({ where: { id: postId } })
  }
}
//renitialiseModel()
//await PostModel.sync({ force: true })
export default new PostService()
