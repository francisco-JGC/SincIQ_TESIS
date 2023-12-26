import type { IInteractiveButton } from '../interfaces/whatsapp/interactiveButtons.interface'
import {
  handleBadRequestResponse,
  handleOkResponse
} from '../utils/handleHttpsResponse'
import { useFetch } from '../utils/useFetch'
const BASE_URL = `https://${process.env.WHATSAAP_HOST}${process.env.WHATSAAP_PATH}`

export const sendTextMessage = async ({
  textResponse,
  phone
}: {
  textResponse: string
  phone: string
}) => {
  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: phone,
    text: {
      body: textResponse
    },
    type: 'text'
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAAP_TOKEN}`
    },
    body: data
  }

  try {
    return handleOkResponse(await useFetch(BASE_URL, options))
  } catch (error) {
    return handleBadRequestResponse({}, error as Error)
  }
}

export const sendInteractiveButton = async ({
  textResponse,
  phone,
  buttons
}: {
  textResponse: string
  phone: string
  buttons: IInteractiveButton[]
}) => {
  if (buttons.length > 3) {
    return handleBadRequestResponse(
      {},
      new Error('You can only send up to 3 buttons')
    )
  }

  if (buttons.length < 1) {
    return handleBadRequestResponse(
      {},
      new Error('You must send at least 1 button')
    )
  }

  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'interactive',
    interactive: {
      type: 'button',
      text: textResponse,
      action: buttons
    }
  })

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAAP_TOKEN}`
    },
    body: data
  }

  try {
    return handleOkResponse(await useFetch(BASE_URL, options))
  } catch (error) {
    return handleBadRequestResponse({}, error as Error)
  }
}
