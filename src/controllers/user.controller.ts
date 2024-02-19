import { hash } from 'bcrypt'
import { User } from '../entities/user/user.entity'
import { AppDataSource } from '../config/database.config'
import { handleBadRequestResponse } from '../utils/handleHttpsResponse'

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const userExists = await AppDataSource.getRepository(User).findOne({
      where: { email }
    })

    if (userExists) {
      return handleBadRequestResponse({}, new Error('User already exists'))
    }

    const user = new User()
    user.username = username
    user.email = email
    user.password = await hash(password, 10)
    user.provider = 'local'

    const newUser = await AppDataSource.getRepository(User).save(user)

    return {
      id: newUser.id,
      username: newUser.username
    }
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { email }
    })

    return user
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
