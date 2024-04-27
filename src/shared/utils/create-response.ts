import { HttpResponse } from '~/infra/http/base';

export class CreateResponse {
  static ok(payload?: unknown): HttpResponse {
    const field = typeof payload === 'string' ? 'message' : 'data';
    return { status: 200, [field]: payload };
  }

  static created(data?: unknown): HttpResponse {
    return { status: 201, data };
  }

  static noContent(): HttpResponse {
    return { status: 204 };
  }

  static badRequest(message?: string) {
    return { status: 400, message };
  }

  static notFound(message?: string): HttpResponse {
    return { status: 404, message: message || 'Not found' };
  }

  static forbidden(): HttpResponse {
    return { status: 403 };
  }

  static unauthorized(message?: string): HttpResponse {
    return { status: 401, message };
  }

  static conflict(message?: string): HttpResponse {
    return { status: 409, message };
  }

  static unprocessableEntity(data?: string | Record<string, string>): HttpResponse {
    return { status: 422, data };
  }
}
