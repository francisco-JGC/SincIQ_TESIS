import { User } from '../entities/user/user.entity'
import { AppDataSource } from '../config/database.config'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { Request } from 'express'

export const registerUser = async (req: Request) => {
  const user = req.body as User

  if (!user.username || !user.email) {
    return handleBadRequestResponse(
      {},
      new Error('Todos los campos son requeridos')
    )
  }

  try {
    const userExist = await AppDataSource.getRepository(User).findOne({
      where: { provider_id: user.provider_id, provider: user.provider }
    })

    if (userExist) {
      return handleBadRequestResponse(
        {},
        new Error('El usuario ya esta registrado')
      )
    }

    const newUser = await AppDataSource.getRepository(User).save(user)
    return handleOkResponse(newUser)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
