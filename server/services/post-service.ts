import { sequelize } from '../data/config'
import { renitialiseModel } from '../data/reset-models'
import { PostModel, type postType } from '../models/post-model'
import { Await, redirect } from '@tanstack/react-router'

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
    return PostModel.create(data)
  }
  /**
   * Récupere la liste des posts
   * @returns La liste des posts convertire en JSON
   */
  async getAllPost(userId: string | undefined) {
    const posts = await PostModel.findAll({ where: { userId } })
    return posts.map((post) => post.toJSON())
  }

  /**
   * Récupere grâce à sont identifiant
   * @param postId Identifiant du post
   * @returns Un post par sont Identifiant ou null si il existe pas
   */
  async getByOne({
    postId,
    userId,
  }: {
    postId: string
    userId: string | undefined
  }) {
    if (!userId) {
      throw new Error('VEILLEZ VOUS RECONNECTEZ')
    }
    return PostModel.findOne({ where: { id: postId, userId } })
  }
  /**
   * Modifiée le post
   * @param postId Identifiant pour modifier le post
   * @param data donnée pour modifier le post
   */
  async updatePost(postId: string, data: Partial<postType>) {
    return PostModel.update(data, { where: { id: postId } })
  }
  /**
   * Supprimée le post
   * @param postId Identifiant pour supprimer le post
   */
  async deletePost(postId: string) {
    return PostModel.destroy({ where: { id: postId } })
  }
}
//renitialiseModel()
//await PostModel.sync({ force: true })
export default new PostService()
