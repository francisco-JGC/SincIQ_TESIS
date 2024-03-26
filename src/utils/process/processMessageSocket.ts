import EventEmitter from 'events'

const eventEmitter = new EventEmitter()

export interface IBodySocketMessage {
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
  text: (params: IBodySocketMessage) => void
  default: (params: IBodySocketMessage) => void
}

export const ProcessMessageSocket: ISocketMessageHandler = {
  text: (params) => {
    delete params.messageObject

    handleEmmiterMessage(params)
  },
  default: (params) => {
    const data = {
      ...params,
      message:
        'El usuario envió un archivo, pero no son soportadas en el sistema 😣'
    }

    delete data.messageObject

    handleEmmiterMessage(data)
  }
}

const handleEmmiterMessage = (params: any) =>
  eventEmitter.emit('received-message', params)

export { eventEmitter }
