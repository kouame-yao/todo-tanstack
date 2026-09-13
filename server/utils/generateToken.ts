const TOKEN_ACCES_KEY = 'ksjfdjfkdjfkfjkdjfkdj'
const TOKEN_REFRESH_KEY = 'jkjdkjkfjdfkjdkfjdfkj'
import jwt from 'jsonwebtoken'
export const generateToken = (data: any) => {
  if (!data) {
    throw new Error('Data undefined token')
  }
  const accesToken = jwt.sign(data, TOKEN_ACCES_KEY, {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign(data, TOKEN_REFRESH_KEY, {
    expiresIn: '1h',
  })

  return { accesToken, refreshToken }
}
