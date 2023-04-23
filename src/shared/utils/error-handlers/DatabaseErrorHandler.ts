import { ServerError } from '../errors';
import { ErrorHandler } from './ErrorHandler';

export class DatabaseErrorHandler extends ErrorHandler {
  constructor(message: string) {
    super(500, message);
    this.error = new ServerError();
  }
}
