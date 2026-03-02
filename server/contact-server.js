import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'
import http from 'node:http'

dotenv.config()

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true)

const port = Number(process.env.CONTACT_SERVER_PORT || 8787)
const maxMessageLength = Number(process.env.CONTACT_MAX_MESSAGE_LENGTH || 4000)
const rateLimitWindowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000)
const rateLimitMaxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5)

const allowedOrigins = (process.env.CONTACT_ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const recipients = (process.env.CONTACT_RECEIVER || process.env.SMTP_USER || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

const fallbackReceiver = (
  process.env.CONTACT_FALLBACK_EMAIL || process.env.CONTACT_RECEIVER || process.env.SMTP_USER || 'akmdaniel2@gmail.com'
).trim()
const hasFormSubmitFallback = Boolean(fallbackReceiver)

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

const hasSmtpConfig = Boolean(smtpHost && smtpUser && smtpPass)

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null

if (transporter) {
  transporter
    .verify()
    .then(() => {
      console.log('[contact] SMTP connection is ready.')
    })
    .catch((error) => {
      console.error('[contact] SMTP verification failed:', error.message)
    })
} else {
  console.warn('[contact] SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.')
}

const requestsByIp = new Map()

const normalizeInput = (value) => (typeof value === 'string' ? value.trim() : '')

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getDeliveryMode = () => {
  if (transporter && recipients.length > 0) return 'smtp'
  if (hasFormSubmitFallback) return 'formsubmit-fallback'
  return 'unconfigured'
}

const sendViaFormSubmit = async ({ name, email, message }) => {
  if (!hasFormSubmitFallback) {
    throw new Error('Fallback email receiver is not configured.')
  }

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(fallbackReceiver)}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio contact from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  if (!response.ok) {
    throw new Error(`FormSubmit request failed with status ${response.status}`)
  }
}

const isRateLimited = (ip) => {
  const now = Date.now()
  const previous = requestsByIp.get(ip) || []
  const recent = previous.filter((timestamp) => now - timestamp < rateLimitWindowMs)

  if (recent.length >= rateLimitMaxRequests) {
    requestsByIp.set(ip, recent)
    return true
  }

  recent.push(now)
  requestsByIp.set(ip, recent)
  return false
}

setInterval(() => {
  const now = Date.now()
  for (const [ip, timestamps] of requestsByIp.entries()) {
    const recent = timestamps.filter((timestamp) => now - timestamp < rateLimitWindowMs)
    if (recent.length === 0) {
      requestsByIp.delete(ip)
    } else {
      requestsByIp.set(ip, recent)
    }
  }
}, rateLimitWindowMs).unref()

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin is not allowed by CORS'))
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)

app.use(express.json({ limit: '32kb' }))

app.get('/api/contact/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    smtpConfigured: hasSmtpConfig,
    recipientsConfigured: recipients.length > 0,
    fallbackConfigured: hasFormSubmitFallback,
    deliveryMode: getDeliveryMode(),
  })
})

app.post('/api/contact', async (req, res) => {
  const ip = req.ip || 'unknown'

  if (isRateLimited(ip)) {
    res.status(429).json({
      ok: false,
      message: 'Too many requests. Please wait a few minutes and try again.',
    })
    return
  }

  const name = normalizeInput(req.body?.name)
  const email = normalizeInput(req.body?.email).toLowerCase()
  const message = normalizeInput(req.body?.message)
  const website = normalizeInput(req.body?.website)

  if (website.length > 0) {
    // Honeypot for bots: pretend success.
    res.status(200).json({ ok: true, message: 'Message sent successfully.' })
    return
  }

  if (!name || name.length < 2 || name.length > 80) {
    res.status(400).json({ ok: false, message: 'Please enter a valid name.' })
    return
  }

  if (!isValidEmail(email) || email.length > 120) {
    res.status(400).json({ ok: false, message: 'Please enter a valid email address.' })
    return
  }

  if (!message || message.length < 10 || message.length > maxMessageLength) {
    res.status(400).json({
      ok: false,
      message: `Message must be between 10 and ${maxMessageLength} characters.`,
    })
    return
  }

  const submittedAt = new Date().toISOString()
  const escapedName = escapeHtml(name)
  const escapedEmail = escapeHtml(email)
  const escapedMessage = escapeHtml(message).replaceAll('\n', '<br/>')

  const fromName = normalizeInput(process.env.CONTACT_FROM_NAME || 'Portfolio Contact')
  const fromAddress = normalizeInput(process.env.CONTACT_FROM_ADDRESS || smtpUser)
  const fromHeader = fromAddress ? `"${fromName.replaceAll('"', "'")}" <${fromAddress}>` : undefined

  try {
    if (transporter && recipients.length > 0) {
      await transporter.sendMail({
        from: fromHeader,
        to: recipients.join(', '),
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Submitted: ${submittedAt}`,
          '',
          'Message:',
          message,
        ].join('\n'),
        html: `
          <h2>New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> ${escapedEmail}</p>
          <p><strong>Submitted:</strong> ${submittedAt}</p>
          <p><strong>Message:</strong></p>
          <p>${escapedMessage}</p>
        `,
      })
      res.status(200).json({ ok: true, message: 'Message sent successfully. I will reply soon.' })
      return
    }

    if (hasFormSubmitFallback) {
      await sendViaFormSubmit({ name, email, message })
      res.status(200).json({ ok: true, message: 'Message sent successfully. I will reply soon.' })
      return
    }

    res.status(503).json({
      ok: false,
      message: 'Email service is not configured yet. Please try again later.',
    })
  } catch (error) {
    console.error('[contact] Failed to send email:', error)

    if (hasFormSubmitFallback) {
      try {
        await sendViaFormSubmit({ name, email, message })
        res.status(200).json({ ok: true, message: 'Message sent successfully. I will reply soon.' })
        return
      } catch (fallbackError) {
        console.error('[contact] Fallback email send failed:', fallbackError)
      }
    }

    res.status(500).json({ ok: false, message: 'Failed to send message. Please try again.' })
  }
})

const httpServer = http.createServer(app)

httpServer.listen(port, () => {
  console.log(`[contact] Server running on http://localhost:${port}`)
})

httpServer.on('error', (error) => {
  console.error('[contact] Server error:', error)
  process.exit(1)
})

const shutdown = () => {
  httpServer.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
