import { Client } from '../entities/client/clients.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { AppDataSource } from '../config/database.config'

export const createClient = async (username: string, phone_number: string) => {
  const clientExists = await getClientByPhoneNumber(phone_number)

  if (clientExists.success) {
    return handleBadRequestResponse({}, new Error('Client already exists'))
  }

  try {
    const client = new Client()
    client.username = username
    client.phone_number = phone_number

    const newClient = await AppDataSource.getRepository(Client).save(client)

    return handleOkResponse(newClient)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getClientByPhoneNumber = async (phone_number: string) => {
  try {
    const client = await AppDataSource.getRepository(Client).findOne({
      where: { phone_number }
    })

    if (!client) {
      throw new Error('Client not found')
    }

    return handleOkResponse(client)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
