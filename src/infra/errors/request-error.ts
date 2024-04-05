export class RequestError extends Error {
  statusCode: number;

  constructor(statusCode?: number, message?: string) {
    super(message || 'Internal Error');
    this.statusCode = statusCode || 500;
  }
}
