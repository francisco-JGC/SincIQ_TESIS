import type { IMessage, IProfile } from '../interfaces/whatsapp.interface'
import {
  getInteractiveMessageButton,
  getMessageFromUser
} from './getMessageFromUser'

export interface IMessageHandler {
  text: (params: { messageObject: IMessage; profileObject: IProfile }) => void
  interactive: (params: {
    messageObject: IMessage
    profileObject: IProfile
  }) => void
}

export const typeMessages: IMessageHandler = {
  text: getMessageFromUser,
  interactive: getInteractiveMessageButton
}
