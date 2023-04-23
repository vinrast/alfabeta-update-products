import { InvalidParamError, MissingParamError } from '../errors';
import { ErrorHandler } from './ErrorHandler';

export class BadRequestErrorHandler extends ErrorHandler {
  constructor(message: string, type: EnumBadRequestType) {
    super(400, message);
    switch (type) {
      case EnumBadRequestType.Missing:
        this.error = new MissingParamError(message);
        break;
      case EnumBadRequestType.Invalid:
        this.error = new InvalidParamError(message);
        break;
      default:
        this.error = new Error(message);
    }
  }
}

export enum EnumBadRequestType {
  Missing = 'missing',
  Invalid = 'invalid',
}
