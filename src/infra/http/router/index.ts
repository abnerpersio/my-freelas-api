import { Application } from 'express';
import { ExpressAdapter } from '~/infra/http/adapter';
import { ROUTES } from '~/infra/http/router/routes';

type ExpressHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export class HttpRouter {
  constructor(private readonly server: Application) {}

  setup() {
    for (const route of ROUTES) {
      const method = route.method.toLowerCase() as ExpressHttpMethod;
      if (!this.server[method]) return;
      const handlers = [
        ...(route.middlewares || []).map((middleware) => middleware.adapt),
        new ExpressAdapter(route.useCase).adapt,
      ];
      this.server[method](route.path, handlers);
    }
  }
}
