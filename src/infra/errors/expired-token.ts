export class ExpiredTokenError extends Error {
  constructor() {
    super('Token expired');
  }
}
