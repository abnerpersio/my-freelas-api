import { BaseMiddleware, DefaultMiddlewares } from '~/infra/http/middlewares/base';
import { UseCase } from '~/infra/http/base';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Route = {
  path: string | string[];
  method: HttpMethod;
  useCase: UseCase;
  middlewares?: (BaseMiddleware | DefaultMiddlewares)[];
};
