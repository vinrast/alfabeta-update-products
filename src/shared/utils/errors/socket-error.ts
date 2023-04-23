export class SocketError extends Error {
  constructor(message: string) {
    super(`Error on socket tcp: ${message}`);
    this.name = 'SocketError';
  }
}
