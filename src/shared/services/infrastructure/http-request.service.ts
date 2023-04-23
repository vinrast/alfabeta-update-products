import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface IHttpRequest {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly headers: { [key: string]: string };
  get<T>(url: string): Promise<HttpResponse<T>>;
}

interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  request?: any;
}

export class HttpRequestService implements IHttpRequest {
  private axiosInstance: AxiosInstance;

  readonly baseUrl: string;
  readonly timeout: number;
  readonly headers: { [key: string]: string };

  constructor({
    baseUrl,
    timeout = 1000,
    headers = { 'Content-Type': 'application/json' },
  }: {
    baseUrl: string;
    timeout?: number;
    headers?: { [key: string]: string };
  }) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.headers = headers;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      headers: headers,
    });
  }

  async get<T>(url: string) {
    return await this.axiosInstance.get<T>(url);
  }
}
