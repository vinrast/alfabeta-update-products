import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
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
  USER: (process.env.MAILER_USER as string) || '',
  PASS: (process.env.MAILER_PASS as string) || '',
  CONTACT_US_EMAIL: (process.env.CONTACT_US_EMAIL as string) || '',
};

export class MailerInfraService implements IEmailService {
  private transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: MAILER_CONFIG.PASS,
    })
  );

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
      from: MAILER_CONFIG.CONTACT_US_EMAIL,
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
          console.log('EMAIL ENVIADO -->', new Date().toLocaleString());
        }
      }
    });
  }
}
