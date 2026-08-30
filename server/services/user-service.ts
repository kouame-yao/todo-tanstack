import { UserModel, type userType } from '../models/user-model'

class UserService {
  /**
   * Connectée l'utilisation
   * @param {string} email - Donnée pour connecter l'utilisateur
   * @returns Utilisateur par sont email
   */
  async signIn(email: string) {
    return UserModel.findOne({ where: { email } })
  }
  /**
   * Crée l'utilisation
   * @param {string} data - Donnée pour crée l'utilisateur
   * @returns {Promse<userType>}
   */
  async signUp(data: userType) {
    return await UserModel.create(data)
  }

  /**
   * Récuperer l'utilisation par sont Id
   * @param {string} userId - Donnée pour connecter l'utilisateur
   * @returns {Promise<userType>}
   */
  async getUser(userId: string) {
    return await UserModel.findOne({ where: { id: userId } })
  }
}
//UserModel.sync({ force: true })
export default new UserService()
