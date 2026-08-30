import { redirect } from '@tanstack/react-router'
import { sequelize } from '../data/config'
import type { userType } from '../models/user-model'
import userService from '../services/user-service'
import bcrypt from 'bcrypt'
import { useAppSession } from '../utils/sessions'

type UserService = typeof userService
class UserController {
  constructor(private UserService: UserService) {}
  /**
   * Connectée l'utilisateur pour l'email et le mot de pass
   * @param {string} email - De l'utilisateur
   * @param {string} password - De l'utilisateur
   * @returns {promises<{success:boolean ,message:string, data:JSON}>} Les donnée de l'utlisateur en forma JSON
   */
  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new Error('DONNEE MANQUANT !')
    }
    const userCurrent = await this.UserService.signIn(email)
    if (!userCurrent) {
      throw new Error('EMAIL / MOT DE PASS INCORRECT')
    }

    const comparePass = await bcrypt.compare(password, userCurrent.password)
    if (!comparePass) {
      throw new Error('EMAIL / MOT DE PASS INCORRECT')
    }
    const sessions = await useAppSession()

    try {
      const { password: pass, ...rest } = userCurrent
      await sessions.update({
        userId: rest.id,
        email: rest.email,
      })

      throw redirect({ to: '/dashboard/{-$postId}' })
    } catch (error) {
      //console.log(error)
      throw error
    }
  }

  /**
   * Crée un utlisateur
   * @param {userType} data - Donnée pour crée un utlisateur
   * @returns {promises<{success:boolean ,message:string, data:JSON}>} Les donnée de l'utlisateur en forma JSON | ou une erreur
   */
  async signUp(data: userType) {
    const { firstName, email, password } = data
    if (!firstName || !email || !password) {
      throw new Error('TOUT LES CHAMPS SONT REQUIS')
    }
    try {
      const SALT = 10
      const hasPass = await bcrypt.hash(password, SALT)
      const user = await this.UserService.signUp({ ...data, password: hasPass })
      const { password: pass, ...rest } = user
      return { success: true, message: 'UTILISATEUR CREE', data: rest }
    } catch (error) {
      throw error
    }
  }

  async getUser() {
    const sessions = await useAppSession()

    // Vérifier si c'est une nouvelle session vide
    if (sessions.data.userId === undefined || sessions.data.userId === null) {
      await sessions.clear()
      return null
    }

    return await this.UserService.getUser(sessions.data.userId)
  }
}

export default new UserController(userService)
