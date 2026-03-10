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
