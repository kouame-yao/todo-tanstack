import { DataTypes, type ModelDefined } from 'sequelize'
import { sequelize } from '../data/config'

// type du post
export type postType = {
  id?: string
  userId?: string | undefined
  title: string
  content: string
}

// Objet d'initialisation du model post dans la base de donnée
export const PostModel: ModelDefined<
  postType,
  Partial<postType>
> = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
