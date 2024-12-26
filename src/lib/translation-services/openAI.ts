import { TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const excludedLocalesArray = options.excludedLocales?.split(',') || []

  const targetLocale = options.toLocale
  const prompt = !excludedLocalesArray.includes(targetLocale)
    ? `Translate the following from the locale '${options.fromLocale}' to the locale '${targetLocale}': ${string}`
    : ''

  let text = ''

  if (prompt) {
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
