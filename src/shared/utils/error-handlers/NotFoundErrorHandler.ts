import { NotFoundError } from '../errors';
import { ErrorHandler } from './ErrorHandler';

export class NotFoundErrorHandler extends ErrorHandler {
  constructor(message: string) {
    super(404, message);
    this.error = new NotFoundError(message);
  }
}
