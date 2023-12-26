import OpenAI from 'openai'
const openai = new OpenAI()

export const generateMessageFromGPT = async (thread: string) => {
  console.log({ thread })

  try {
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Who won the world series in 2020?' },
        {
          role: 'assistant',
          content: 'The Los Angeles Dodgers won the World Series in 2020.'
        },
        { role: 'user', content: 'Where was it played?' }
      ]
    })

    console.log({ gptResponse })

    return gptResponse.choices[0]
  } catch (error: any) {
    console.log(error.message)
  }

  return null
}
