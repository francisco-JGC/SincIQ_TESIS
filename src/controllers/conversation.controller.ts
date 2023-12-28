import { Conversation } from '../entities/conversation/conversation.entity'
import { Client } from '../entities/client/clients.entity'
import { AppDataSource } from '../config/database.config'
import { Message } from '../entities/message/message.entity'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { getClientByPhoneNumber } from './clients.cotroller'

export const setMessagesToConversation = async (
  conversation: Conversation,
  messages: Message[]
) => {
  try {
    conversation.messages = messages

    const updatedConversation =
      await AppDataSource.getRepository(Conversation).save(conversation)

    return handleOkResponse(updatedConversation)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const createConversationWithSystem = async (client: Client) => {
  try {
    const conversation = new Conversation()
    conversation.client = client
    conversation.system = 'system'

    const newConversation =
      await AppDataSource.getRepository(Conversation).save(conversation)

    return handleOkResponse(newConversation)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}

export const getConversationWithSystem = async (phone_number: string) => {
  try {
    const conversation = await AppDataSource.getRepository(
      Conversation
    ).findOne({
      where: { system: 'system', client: { phone_number } },
      relations: ['messages']
    })

    if (!conversation) {
      const dataClient = await getClientByPhoneNumber(phone_number)
      return handleOkResponse(
        await createConversationWithSystem(dataClient.data as Client)
      )
    }

    return handleOkResponse(conversation)
  } catch (error: any) {
    return handleBadRequestResponse({}, error.message)
  }
}
