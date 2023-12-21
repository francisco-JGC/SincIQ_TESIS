import fs from 'fs'
import type { Request, Response } from 'express'
import type { IWhatsappReply } from '../interfaces/whatsapp.interface'

const myConsole = new console.Console(fs.createWriteStream('./logs.txt'))

export const verifyToken = (req: Request, res: Response) => {
  console.log('verifyToken', req.query)
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
    const { body }: { body: IWhatsappReply } = req
    const { entry } = body
    const { changes } = entry[0]
    const { value } = changes[0]
    const { messages } = value
    const messageObject = messages[0]

    console.log({ messageObject })
    myConsole.log(messageObject)

    res.send('EVENT_RECEIVED')
  } catch (error) {
    myConsole.log(error)
    res.send('EVENT_RECEIVED')
  }
}

export const showLog = (_req: Request, res: Response) => {
  const file = fs.readFileSync('./logs.txt', 'utf8')
  res.status(200).json(file)
}
