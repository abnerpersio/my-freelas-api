import { Request, Response } from 'express';
import { BaseMiddleware, MiddlewareResponse } from '~/infra/http/middlewares/base';
import { CreateResponse } from '~/shared/utils/create-response';

export class CorsMiddleware extends BaseMiddleware {
  static create() {
    return new CorsMiddleware();
  }

  protected async execute(req: Request, res: Response): Promise<MiddlewareResponse> {
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('access-control-allow-methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('access-control-allow-headers', 'Authorization,Content-Type');
    res.setHeader('access-control-max-age', 24 * 60 * 60);

    if (req.method === 'CORS') {
      return CreateResponse.ok();
    }

    return true;
  }
}
