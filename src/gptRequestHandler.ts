import * as https from 'https'
import * as dotenv from 'dotenv'

dotenv.config({ path: 'C:\\Users\\Johniel\\utei\\.env' })

interface OpenAIChoice {
  message?: OpenAIMessage
  text?: string
}

interface OpenAIMessage {
  content?: string
  role?: string
}

interface OpenAIResponse {
  choices?: OpenAIChoice[]
}

export async function gptRequestHandler(
  prompt: string | undefined,
): Promise<string> {
  const requestPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.25,
    max_tokens: 2048,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }

  console.log('dotenv: ', process.env)
  const openAIApiKey = process.env.OPENAI_API_KEY
  console.log('API KEY: ', openAIApiKey)
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  const postData = JSON.stringify(requestPayload)

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  }

  return new Promise<string>((resolve, reject) => {
    const req = https.request(apiUrl, options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
        console.log('data response: ', data)
      })

      res.on('end', () => {
        try {
          const responseContent: OpenAIResponse = JSON.parse(data)
          if (responseContent.choices && responseContent.choices.length > 0) {
            const completion = responseContent.choices[0]
            if (completion.message && completion.message.content) {
              const generatedText = completion.message.content.trim()
              resolve(generatedText)
            } else {
              reject('No message content found in the response.')
            }
          } else {
            console.log(res)
            reject('No response content or choices found.')
          }
        } catch (error) {
          reject(`Error parsing JSON response: ${error}`)
        }
      })
    })
    console.log(req)

    req.on('error', (error) => {
      reject(`Request error: ${error}`)
    })

    req.write(postData)
    req.end()
  })
}
