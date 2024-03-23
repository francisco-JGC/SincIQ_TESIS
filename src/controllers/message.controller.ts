import { Message } from '../entities/message/message.entity'
import { Conversation } from '../entities/conversation/conversation.entity'
import { AppDataSource } from '../config/database.config'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { getConversationWithSystem } from './conversation.controller'
import {
  getClientByPhoneNumber,
  setSeenConversationByIdClient
} from './clients.cotroller'
import { Client } from '../entities/client/clients.entity'

export const createMessage = async (
  message: string,
  phone_number: string,
  receiver: string
) => {
  try {
    const dataClient = await getClientByPhoneNumber(phone_number)

    if (!dataClient.success) {
      return handleBadRequestResponse({}, new Error('Client not found'))
    }

    const client = dataClient.data as Client

    const conversation = await getConversationWithSystem(client.phone_number)

    const messageObject = new Message()
    messageObject.content = message

    if (receiver === 'system') {
      messageObject.sender = client.phone_number
      messageObject.receiver = 'system'
    } else {
      messageObject.sender = 'system'
      messageObject.receiver = client.phone_number
    }

    messageObject.conversation = conversation.data as Conversation

    const newMessage = await AppDataSource.transaction(async (manager) => {
      const newMessage = await manager.save(messageObject)
      await setSeenConversationByIdClient(client.id, false)

      return newMessage
    })

    return handleOkResponse(newMessage)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
