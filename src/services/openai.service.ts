// import OpenAI from 'openai'
import { sellerPrompt } from '../prompt/seller.prompt'
import type { ISellerPrompt } from '../prompt/seller.prompt'

// const openai = new OpenAI()

export const generateMessageFromGPT = async ({
  thread,
  prompt
}: {
  thread: any
  prompt: ISellerPrompt
}) => {
  console.log({ thread }, { prompt })

  try {
    const gptResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: sellerPrompt(prompt)
            },
            {
              role: 'user',
              content: thread
            }
          ]
        })
      }
    )

    const { choices } = await gptResponse.json()

    console.log({ choices })

    return choices[0].message
  } catch (error: any) {
    console.log(error.message)
  }

  return null
}
