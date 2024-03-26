import type { Request, Response } from 'express'
import { ProcessMessages } from '../utils/process/processMessages'
import type { IMessageHandler } from '../utils/process/processMessages'
import type { ISocketMessageHandler } from '../utils/process/processMessageSocket'
import { sendTextMessage } from '../services/whatsapp.service'
import { createClient } from './clients.cotroller'
import { createMessage } from './message.controller'
import {
  createConversationWithSystem,
  getConversationWithSystem
} from './conversation.controller'
import { Conversation } from '../entities/conversation/conversation.entity'
import { ProcessMessageSocket } from '../utils/process/processMessageSocket'

export const verifyToken = (req: Request, res: Response) => {
  try {
    const token = process.env.ACCESS_TOKEN_SECRET
    const queryToken = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (queryToken && queryToken === token) {
      res.status(200).send(challenge)
    } else {
      res.status(403).send('Invalid token')
    }
  } catch (error) {
    res.status(500).send('Error')
  }
}
export const receivedMessage = async (req: Request, res: Response) => {
  try {
    const { messages, contacts } = req.body.entry[0].changes[0].value
    const profileObject = contacts[0].profile

    const messageObject = messages[0]
    const { type } = messageObject

    const client = await createClient(profileObject.name, messageObject.from)

    const conversation = await getConversationWithSystem(messageObject.from)

    console.log({ conversation })

    const createdMessage = await createMessage(
      messageObject?.text?.body ?? '',
      messageObject.from,
      type,
      messageObject,
      'system'
    )

    console.log({ createdMessage })

    if (!conversation.success) {
      await createConversationWithSystem(client.data as any)
    }

    ProcessMessageSocket[type as keyof ISocketMessageHandler]({
      client: client?.data,
      message: messageObject?.text?.body,
      from: messages[0].from,
      type_message: type,
      message_by: 'client',
      conversations: conversation?.data as Conversation,
      created_at:
        (createdMessage.data as { created_at?: string })?.created_at ?? '',
      messageObject
    })

    if (!(client.data as { bot_status?: boolean })?.bot_status) {
      res.send('EVENT_RECEIVED')
      return
    }

    ProcessMessages[type as keyof IMessageHandler]({
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      messageObject: messageObject as any,
      profileObject,
      phone_number: messages[0].from,
      clientExists: client.success
    })

    res.send('EVENT_RECEIVED')
  } catch (error) {
    console.log(error)
    res.send('EVENT_RECEIVED')
  }
}

export const sendText = async (req: Request, res: Response) => {
  const { phone, message, type } = req.body
  const response = await sendTextMessage({ textResponse: message, phone, type })

  res.json(response)
}
