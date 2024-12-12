import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerifyEmail = async (to: string, url: string) => {
  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Verify your email',
    text: `Click the link to verify your email: ${url}`,
  });
};

export const sendResetPasswordEmail = async (to: string, url: string) => {
  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Reset your password',
    text: `Click the link to reset your password: ${url}`,
  });
};
