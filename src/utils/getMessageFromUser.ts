import { getCatalogues } from '../controllers/catalogue.controller'
import { getConversationWithSystem } from '../controllers/conversation.controller'
import { getProducts } from '../controllers/products.controller'
import { Conversation } from '../entities/conversation/conversation.entity'
import { IMessageImage } from '../interfaces/whatsapp/textImage.interface'
import type {
  // IInteractive,
  IMessage,
  IProfile
} from '../interfaces/whatsapp/whatsapp.interface'
import { generateMessageFromGPT } from '../services/openai.service'
import { sendTextMessage } from '../services/whatsapp.service'

export const getMessageFromUser = async ({
  profileObject,
  phone_number
}: {
  messageObject: IMessage
  profileObject: IProfile
  clientExists?: boolean
  phone_number: string
}) => {
  const conversationRes = await getConversationWithSystem(phone_number)
  const conversation = conversationRes.data as Conversation

  const catalogue = await getCatalogues()
  const products = await getProducts()

  const generated = await generateMessageFromGPT({
    thread: conversation.messages,
    prompt: {
      client_name: profileObject.name,
      products: (products.data as Array<{ name: any; price: any }>)?.map(
        (product: { name: any; price: any }) => ({
          name: product.name,
          price: product.price
        })
      ),
      business_name: (catalogue.data as any[])[0]?.name,
      business_address: (catalogue.data as any[])[0]?.address,
      location: (catalogue.data as any[])[0]?.location
    }
  })

  if (generated) {
    await sendTextMessage({
      textResponse: generated.content,
      phone: phone_number
    })
  }
}

export const getInteractiveMessageButton = ({
  messageObject
  // profileObject
}: {
  messageObject: IMessage
  profileObject: IProfile
}) => {
  const { interactive } = messageObject
  // const { name } = profileObject
  // let text = ''

  if (interactive.type === 'button_reply') {
    // text = interactive.button_reply.title
  }
}

export const getImageMessage = async ({
  phone_number
}: {
  messageObject: IMessageImage
  profileObject: IProfile
  phone_number: string
  clientExists?: boolean
}) => {
  const conversationRes = await getConversationWithSystem(phone_number)
  const conversation = conversationRes.data as Conversation

  console.log('Conversation', conversation)
}
