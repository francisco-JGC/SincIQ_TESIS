import type {
  IMessage,
  IProfile
} from '../../interfaces/whatsapp/whatsapp.interface'
import {
  getInteractiveMessageButton,
  getMessageFromUser
} from '../getMessageFromUser'

import { IMessageImage } from '../../interfaces/whatsapp/textImage.interface'

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
  image: (params: {
    messageObject: IMessageImage
    profileObject: IProfile
    phone_number: string
    clientExists?: boolean
  }) => void
}

export const ProcessMessages: IMessageHandler = {
  text: getMessageFromUser,
  interactive: getInteractiveMessageButton,
  image: () => {
    console.log('image')
  }
}
