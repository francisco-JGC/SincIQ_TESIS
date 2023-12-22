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
