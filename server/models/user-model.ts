import { DataTypes, type ModelDefined } from 'sequelize'
import { sequelize } from '../data/config'

// type du post
export type roleType = 'ADMIN' | 'USER'
export type userType = {
  id?: string
  firstName: string
  role: roleType
  email: string
  password: string
}

// Objet d'initialisation du model post dans la base de donnée
export const UserModel: ModelDefined<
  userType,
  Partial<userType>
> = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
