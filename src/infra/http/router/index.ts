import { Application, RequestHandler } from 'express';
import { ExpressAdapter } from '~/infra/http/adapter';
import { ROUTES } from '~/infra/http/router/routes';
import { BaseMiddleware, DefaultMiddlewares } from '../middlewares/base';
import { AuthMiddleware } from '../middlewares/auth';

type ExpressHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

const DEFAULT_MIDDLEWARES = {
  auth: AuthMiddleware.create(),
};

export class HttpRouter {
  constructor(private readonly server: Application) {}

  setup() {
    for (const route of ROUTES) {
      const method = route.method.toLowerCase() as ExpressHttpMethod;
      if (!this.server[method]) return;
      const handlers = [
        ...this.getMiddlewares(route.middlewares || []),
        new ExpressAdapter(route.useCase).adapt,
      ];
      this.server[method](route.path, handlers as unknown as RequestHandler[]);
    }
  }

  private getMiddlewares(middlewares: (BaseMiddleware | DefaultMiddlewares)[]) {
    return middlewares.map((middleware) => {
      if (typeof middleware === 'string') {
        return DEFAULT_MIDDLEWARES[middleware].adapt;
      }

      return middleware.adapt;
    });
  }
}
