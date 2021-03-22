import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';
dotenv.config();

export const mailConfig: MailerOptions ={
  transport: {
    host: process.env.MAILDEV_HOST,
    port: Number(process.env.MAILDEV_PORT),
    secure: false,
    tls: { ciphers: 'SSLv3', }, 
    auth: {
      user: process.env.MAILDEV_USER,
      pass: process.env.MAILDEV_PASS,
    },
  },
  defaults: {
    from: `"No Reply" <${process.env.MAILDEV_USER}>`,
  },
  preview: true,
  template: {
    dir: 'dist/mail/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}