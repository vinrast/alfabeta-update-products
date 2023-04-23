import { SoapService } from '../soap-service';

export const soapServiceFactory = (): SoapService => {
  return new SoapService();
};
