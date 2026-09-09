// Brevo transactional email, via its REST API. Payload's own account mail is
// sent through the matching adapter in payload.config.ts.

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!process.env.BREVO_API_KEY) {
    console.warn('[email] BREVO_API_KEY not set — skipping email send:', subject)
    return
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: process.env.EMAIL_FROM || 'no-reply@magariyetu.co.ke', name: 'Magariyetu' },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Brevo email failed (${res.status}): ${body}`)
  }
}
