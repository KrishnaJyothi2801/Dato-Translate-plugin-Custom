import { TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const targetLocale = ['en-EU', 'en-uk', 'APAC'].includes(options.toLocale)
    ? 'en-GB'
    : options.toLocale

  const prompt =
    targetLocale !== 'en-GB'
      ? `Translate the following from the locale '${options.fromLocale}' to the locale '${targetLocale}': ${string}`
      : ''

  let text = ''

  if (targetLocale !== 'en-GB') {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + options.apiKey,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: options.openAIOptions.model,
        temperature: options.openAIOptions.temperature,
        max_tokens: options.openAIOptions.maxTokens,
        top_p: options.openAIOptions.topP,
      }),
    }

    const request = await fetch(
      'https://api.openai.com/v1/chat/completions',
      requestOptions,
    )

    if (request.status !== 200) {
      throw new Error(`OpenAI returned status ${request.status}`)
    }

    const response = await request.json()
    text = response.choices[0].message.content as string
  }
  return text.trim()
}
