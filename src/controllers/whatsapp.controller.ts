/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs'
import type { Request, Response } from 'express'
import { ProcessMessages } from '../utils/processMessages'
import type { IMessageHandler } from '../utils/processMessages'

import { sendTextMessage } from '../services/whatsapp.service'

const myConsole = new console.Console(fs.createWriteStream('./logs.txt'))

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
export const receivedMessage = (req: Request, res: Response) => {
  try {
    const { messages, contacts } = req.body.entry[0].changes[0].value
    const profileObject = contacts[0].profile

    const messageObject = messages[0]
    const { type } = messageObject

    ProcessMessages[type as keyof IMessageHandler]({
      messageObject,
      profileObject
    })

    res.send('EVENT_RECEIVED')
  } catch (error) {
    myConsole.log(error)
    res.send('EVENT_RECEIVED')
  }
}

export const sendText = async (req: Request, res: Response) => {
  const { phone, message } = req.body
  const response = await sendTextMessage({ textResponse: message, phone })

  res.json(response)
}
