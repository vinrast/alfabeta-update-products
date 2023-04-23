import * as soap from 'soap';
import { ClientSoapParams, ISoapService } from './protocols';
import { throwConnectionError } from '../utils/helpers/throw-helpers';

export class SoapService implements ISoapService {
  private soapClient: any;
  private url: string;
  private userId: number; // 7881
  private password: string; // fermin

  constructor() {}

  public async createClient(params: ClientSoapParams) {
    this.url = params.url;
    this.userId = params.userId;
    this.password = params.password;
    this.soapClient = await soap.createClientAsync(this.url);
  }

  public async getDataInBase64(xml: string) {
    try {
      const result = await this.soapClient.actualizarAsync({
        id: this.userId,
        clave: this.password,
        xml,
      });

      return result[0].return;
    } catch (error) {
      throwConnectionError(error);
    }
  }
}
