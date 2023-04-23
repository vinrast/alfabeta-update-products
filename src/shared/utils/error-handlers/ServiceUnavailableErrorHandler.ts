import { ErrorHandler } from './ErrorHandler';

export class ServiceUnavailableErrorHandler extends ErrorHandler {
  constructor(message: string) {
    super(503, message);
    this.error = new Error(
      `connection with alfabeta service error: ${message}`
    );
  }
}
