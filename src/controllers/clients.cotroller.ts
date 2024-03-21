import { Client } from '../entities/client/clients.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { AppDataSource } from '../config/database.config'
import { Message } from '../entities/message/message.entity'
import { Conversation } from '../entities/conversation/conversation.entity'

export const createClient = async (username: string, phone_number: string) => {
  const clientExists = (await getClientByPhoneNumber(phone_number)) as any

  if (clientExists.success) {
    return handleBadRequestResponse(
      {
        id: clientExists?.data?.id?.toString() || '',
        username: clientExists?.data?.username,
        phone_number: clientExists?.data?.phone_number,
        bot_status: clientExists?.data?.bot_status
      },
      new Error('Client already exists')
    )
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

export const getClients = async () => {
  try {
    const clients = await AppDataSource.getRepository(Client).find({
      relations: ['conversations', 'conversations.messages']
    })

    if (!clients) {
      return handleBadRequestResponse({}, new Error('Clients not found'))
    }

    const clientsWithLastMessage = clients.map((client) => {
      return {
        ...client,
        lastMessage: client.conversations.map((conversation) => {
          const lastMessage = conversation.messages.reduce((prev, current) =>
            prev.id > current.id ? prev : current
          )

          return {
            ...lastMessage,
            conversation_id: conversation.id
          }
        })
      }
    })

    return handleOkResponse(clientsWithLastMessage)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const changeBotStatus = async (
  client_id: number,
  bot_status: boolean
) => {
  try {
    const client = await AppDataSource.getRepository(Client).findOne({
      where: { id: client_id }
    })

    if (!client) {
      return handleBadRequestResponse({}, new Error('El cliente no existe'))
    }

    client.bot_status = bot_status

    const updatedClient = await AppDataSource.getRepository(Client).save(client)

    return handleOkResponse(updatedClient)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export async function clearConversationsFromClient(client_id: number) {
  try {
    const client = await AppDataSource.getRepository(Client).findOne({
      where: { id: client_id },
      relations: ['conversations', 'conversations.messages']
    })

    if (!client) {
      return handleBadRequestResponse({}, new Error('Client not found'))
    }

    await AppDataSource.transaction(async (manager) => {
      await manager
        .getRepository(Message)
        .remove(
          client.conversations.flatMap((conversation) => conversation.messages)
        )

      await manager.getRepository(Conversation).remove(client.conversations)
    })

    return handleOkResponse({})
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
