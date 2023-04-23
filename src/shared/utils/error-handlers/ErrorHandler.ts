import { Response } from 'express';

export abstract class ErrorHandler extends Error {
  protected error: Error;
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  public messageToClient(res: Response): Response {
    return res.status(this.statusCode).json({ error: this.error.message });
  }

  public showOnConsole() {
    return this.error;
  }
}
