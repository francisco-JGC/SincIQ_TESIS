import type { Request, Response } from 'express'
import { ProcessMessages } from '../utils/processMessages'
import type { IMessageHandler } from '../utils/processMessages'
import { sendTextMessage } from '../services/whatsapp.service'
import { createClient } from './clients.cotroller'
import { createMessage } from './message.controller'
import {
  createConversationWithSystem,
  getConversationWithSystem
} from './conversation.controller'
import EventEmitter from 'events'
const eventEmitter = new EventEmitter()

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

    const client = await createClient(profileObject.name, messages[0].from)

    const conversation = await getConversationWithSystem(messages[0].from)

    await createMessage(messageObject.text.body, messages[0].from, 'system')

    if (!conversation.success) {
      await createConversationWithSystem(client.data as any)
    }

    // emitir evento para o socket
    eventEmitter.emit('received-message', {
      client: client?.data,
      message: messageObject.text.body,
      from: messages[0].from,
      type_message: type,
      message_by: 'client'
    })

    // res.send('EVENT_RECEIVED')
    // return

    if (!(client.data as { bot_status?: boolean })?.bot_status) {
      res.send('EVENT_RECEIVED')
      return
    }

    ProcessMessages[type as keyof IMessageHandler]({
      messageObject,
      profileObject,
      phone_number: messages[0].from,
      clientExists: client.success
    })

    res.send('EVENT_RECEIVED')
  } catch (error) {
    res.send('EVENT_RECEIVED')
  }
}

export const sendText = async (req: Request, res: Response) => {
  const { phone, message } = req.body
  const response = await sendTextMessage({ textResponse: message, phone })

  res.json(response)
}

export { eventEmitter }
