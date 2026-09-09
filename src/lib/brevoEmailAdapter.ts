import type { EmailAdapter, SendEmailOptions } from 'payload'

type BrevoAdapterArgs = {
  apiKey: string
  defaultFromAddress: string
  defaultFromName: string
}

function addressList(value: SendEmailOptions['to']) {
  const values = Array.isArray(value) ? value : [value]
  return values.flatMap((entry) => {
    if (!entry) return []
    if (typeof entry === 'string') return [{ email: entry }]
    if (typeof entry === 'object' && 'address' in entry && entry.address) {
      return [{ email: entry.address, ...(entry.name ? { name: entry.name } : {}) }]
    }
    return []
  })
}

/**
 * Small Payload adapter for Brevo's transactional-email API. Keeping this in
 * the app avoids another mail transport dependency and lets Payload's native
 * verification and password-reset messages use the same sender as app mail.
 */
export const brevoAdapter = (args: BrevoAdapterArgs): EmailAdapter<{ messageId: string }> => ({
  defaultFromAddress: args.defaultFromAddress,
  defaultFromName: args.defaultFromName,
  name: 'brevo',
  sendEmail: async (message) => {
    if (!args.apiKey) throw new Error('BREVO_API_KEY is not configured')

    const to = addressList(message.to)
    if (!to.length) throw new Error('Brevo email requires at least one recipient')

    const from = typeof message.from === 'object' && message.from && 'address' in message.from
      ? { email: message.from.address, name: message.from.name || args.defaultFromName }
      : { email: typeof message.from === 'string' ? message.from : args.defaultFromAddress, name: args.defaultFromName }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': args.apiKey },
      body: JSON.stringify({
        sender: from,
        to,
        subject: message.subject || '',
        htmlContent: typeof message.html === 'string' ? message.html : undefined,
        textContent: typeof message.text === 'string' ? message.text : undefined,
      }),
    })

    if (!response.ok) {
      throw new Error(`Brevo email failed (${response.status}): ${await response.text()}`)
    }

    const result = await response.json() as { messageId?: string }
    return { messageId: result.messageId || '' }
  },
})
