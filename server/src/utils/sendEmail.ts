import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;

  const mailOptions = {
    from: `"Facio Dental Super Speciality Centre" <${SMTP_USER || 'no-reply@faciodental.com'}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  if (!SMTP_USER || !SMTP_PASS) {
    console.log('--- Email simulated (SMTP credentials missing) ---');
    console.log(mailOptions);
    console.log('--------------------------------------------------');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
