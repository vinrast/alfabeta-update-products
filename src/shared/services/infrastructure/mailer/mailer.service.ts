import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

export interface IEmailService {
  sendEmail({
    destinyEmail,
    subject,
    html,
    attachments,
  }: {
    destinyEmail: string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
  }): void;
}

const MAILER_CONFIG = {
  USER: (process.env.MAILER_USER as string) || 'develop@atmansystems.com',
  PASS: (process.env.MAILER_PASS as string) || 'lcfjvloaznzqkrdz',
};

export class MailerInfraService implements IEmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAILER_CONFIG.USER,
      pass: MAILER_CONFIG.PASS,
    },
  });

  sendEmail({
    destinyEmail,
    subject,
    html,
    attachments,
  }: {
    destinyEmail: string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
  }) {
    const mailOptions = {
      from: MAILER_CONFIG.USER,
      to: destinyEmail,
      subject: subject,
      html: html,
      attachments,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        if (process.env.NODE_ENV != 'test') console.log(error);
      } else {
        if (process.env.NODE_ENV != 'test') {
          console.log('Email sent: ' + info.response);
        }
      }
    });
  }
}
