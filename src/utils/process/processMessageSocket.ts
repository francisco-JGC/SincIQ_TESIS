import EventEmitter from 'events'
import type { IMessageImage } from '../../interfaces/whatsapp/textImage.interface'

const eventEmitter = new EventEmitter()

interface IBodyMessage {
  client: any
  message: string
  from: string
  type_message: string
  message_by: string
  conversations: any
  created_at: string
  messageObject: any
}

export interface ISocketMessageHandler {
  text: (params: IBodyMessage) => void
  image: (params: IBodyMessage) => void
}

export const ProcessMessageSocket: ISocketMessageHandler = {
  text: (params) => {
    delete params.messageObject

    handleEmmiterMessage(params)
  },
  image: (params) => {
    const { messageObject } = params as { messageObject: IMessageImage }

    const data = {
      ...params,
      message: messageObject.image.caption,
      image: messageObject.image
    }

    delete data.messageObject

    console.log({ data })

    handleEmmiterMessage(data)
  }
}

const handleEmmiterMessage = (params: any) =>
  eventEmitter.emit('received-message', params)

export { eventEmitter }
