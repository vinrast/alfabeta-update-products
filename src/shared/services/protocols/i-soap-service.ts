export type ClientSoapParams = {
  url: string;
  userId: number;
  password: string;
};

export interface ISoapService {
  createClient(params: ClientSoapParams): Promise<void>;
  getDataInBase64(xml: string): Promise<string>;
}
