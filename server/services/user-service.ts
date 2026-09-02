import { prisma } from '../../lib/prisma'
import { UserModel, type userType } from '../models/user-model'

class UserService {
  /**
   * Connectée l'utilisation
   * @param {string} email - Donnée pour connecter l'utilisateur
   * @returns Utilisateur par sont email
   */
  async signIn(email: string) {
    return await prisma.user.findFirst({ where: { email } })
  }
  /**
   * Crée l'utilisation
   * @param {string} data - Donnée pour crée l'utilisateur
   * @returns {Promse<userType>}
   */
  async signUp(data: userType) {
    return await prisma.user.create({
      data: data,
    })
  }

  /**
   * Récuperer l'utilisation par sont Id
   * @param {string} userId - Donnée pour connecter l'utilisateur
   * @returns {Promise<userType>}
   */
  async getUser(userId: string) {
    console.log('UTILISAER LA BASE DE DONNER')
    return await prisma.user.findFirst({ where: { id: userId } })
  }
}
//UserModel.sync({ force: true })
export default new UserService()
