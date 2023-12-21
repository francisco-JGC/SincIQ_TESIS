import type {
  IInteractive,
  IMessage,
  IProfile
} from '../interfaces/whatsapp.interface'

export const getMessageFromUser = ({
  messageObject,
  profileObject
}: {
  messageObject: IMessage
  profileObject: IProfile
}) => {
  let text = ''

  const { type } = messageObject
  const { name } = profileObject

  if (type === 'text') {
    text = messageObject.text.body
  } else if (type === 'interactive') {
    const interactiveObject: IInteractive = messageObject.interactive
    const titleMap: Record<string, string> = {
      button_reply: interactiveObject.button_reply.title,
      list_reply: interactiveObject.list_reply.title,
      default: 'No text'
    }

    text = titleMap[interactiveObject.type] || titleMap.default
  }

  console.log(`Message from ${name}: ${text}`)
}

export const getInteractiveMessageButton = ({
  messageObject,
  profileObject
}: {
  messageObject: IMessage
  profileObject: IProfile
}) => {
  const { interactive } = messageObject
  const { name } = profileObject
  let text = ''

  if (interactive.type === 'button_reply') {
    text = interactive.button_reply.title
  }

  console.log(`Message from ${name}: ${text}`)
}
