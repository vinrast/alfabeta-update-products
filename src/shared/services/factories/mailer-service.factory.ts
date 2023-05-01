import { MailerInfraService } from '../infrastructure/mailer/mailer.service';

export const mailerServiceFactory = () => {
  return new MailerInfraService();
};
