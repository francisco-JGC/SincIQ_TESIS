import type {
  IMessage,
  IProfile
} from '../interfaces/whatsapp/whatsapp.interface'
import {
  getInteractiveMessageButton,
  getMessageFromUser
} from './getMessageFromUser'

export interface IMessageHandler {
  text: (params: {
    messageObject: IMessage
    profileObject: IProfile
    clientExists?: boolean
    phone_number: string
  }) => void
  interactive: (params: {
    messageObject: IMessage
    profileObject: IProfile
  }) => void
}

export const ProcessMessages: IMessageHandler = {
  text: getMessageFromUser,
  interactive: getInteractiveMessageButton
}
