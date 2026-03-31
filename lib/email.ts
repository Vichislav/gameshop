import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(to: string, code: string) {
  await transporter.sendMail({
    from: `"Ваш Сайт" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Код подтверждения',
    text: `Ваш код: ${code}`,
    html: `<p>Ваш код: <strong>${code}</strong></p>`,
  })
}

/** Почта разработчика для формы обратной связи (можно переопределить в CONTACT_DEVELOPER_EMAIL). */
const DEVELOPER_INBOX =
  process.env.CONTACT_DEVELOPER_EMAIL ?? 's1ava8968@gmail.com'

export async function sendDeveloperContactEmail(messageBody: string) {
  await transporter.sendMail({
    from: `"JS study — сайт" <${process.env.SMTP_USER}>`,
    to: DEVELOPER_INBOX,
    subject: 'Сообщение с сайта JS study',
    text: messageBody,
  })
}
