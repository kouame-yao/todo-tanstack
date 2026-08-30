import { sequelize } from './config'

export async function renitialiseModel() {
  await sequelize.sync({ force: false })
  // Code here
}
