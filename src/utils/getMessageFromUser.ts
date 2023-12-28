import type {
  // IInteractive,
  IMessage,
  IProfile
} from '../interfaces/whatsapp/whatsapp.interface'
import { generateMessageFromGPT } from '../services/openai.service'
import { sendTextMessage } from '../services/whatsapp.service'

export const getMessageFromUser = async ({
  messageObject,
  profileObject,
  clientExists,
  phone_number
}: {
  messageObject: IMessage
  profileObject: IProfile
  clientExists?: boolean
  phone_number: string
}) => {
  let text = ''

  const { name } = profileObject

  text = messageObject.text.body

  console.log({ clientExists }, { phone_number }, { text })

  const generated = await generateMessageFromGPT({
    thread: text,
    prompt: {
      client_name: name,
      products: [
        { name: 'iPhone 13 Pro Max', price: 1099 },
        { name: 'Samsung Galaxy S21 Ultra', price: 1199 },
        { name: 'Google Pixel 6 Pro', price: 899 },
        { name: 'OnePlus 9 Pro', price: 969 }
      ],
      business_name: 'Tech Store',
      business_address: '123 Main St, New York, NY 10030',
      location: 'New York'
    }
  })

  console.log({ generated })

  if (generated) {
    await sendTextMessage({
      textResponse: generated.content,
      phone: phone_number
    })
  }
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
