import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { User } from '../entities/user/user.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { Request, Response } from 'express'
import { AppDataSource } from '../config/database.config'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as Pick<User, 'email' | 'password'>

  try {
    if (!email || !password) {
      return res.json(
        handleBadRequestResponse(res, new Error('Invalid email or password'))
      )
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email }
    })

    if (!user) {
      return res.json(
        handleBadRequestResponse(res, new Error('User not found'))
      )
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return res.json(
        handleBadRequestResponse(res, new Error('Invalid email or password'))
      )
    }

    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d'
    })

    return res.json(
      handleOkResponse({
        token,
        user: {
          id: user.id,
          name: user.username,
          imageURL: user.imageURL
        }
      })
    )
  } catch (error: any) {
    return res.json(handleBadRequestResponse({}, error.message))
  }
}
