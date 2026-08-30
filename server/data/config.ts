import { Sequelize } from 'sequelize'
import pg from 'pg'

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
})
// try {
//   await sequelize.authenticate()
//   console.log('Connection has been established successfully.')
// } catch (error) {
//   console.error('Unable to connect to the database:', error)
// }
