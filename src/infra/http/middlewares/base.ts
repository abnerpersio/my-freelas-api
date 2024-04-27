import { NextFunction, Request, Response } from 'express';
import { logger } from '~/infra/config/logger';
import { RequestError } from '~/infra/errors/request-error';
import { HttpResponse } from '~/infra/http/base';

export type MiddlewareResponse<R = unknown> = HttpResponse<R> | true;

export type DefaultMiddlewares = 'auth';

export abstract class BaseMiddleware {
  protected abstract execute(
    req: Request,
    res: Response,
  ): Promise<MiddlewareResponse> | MiddlewareResponse;

  adapt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.execute(req, res);

      if (typeof response === 'boolean' && response === true) {
        next();
        return;
      }

      const { status, data, message } = response as HttpResponse;

      if (message || data) {
        res.status(status).json({ message, data });
        return;
      }

      res.sendStatus(status);
    } catch (error: any) {
      logger.info(
        {
          path: req.path,
          method: req.method,
          error: error.message || '',
        },
        'Error at middleware',
      );

      if (error instanceof RequestError) {
        res.status(error.statusCode).json({ message: error.message || 'Internal Error' });
        return;
      }

      res.status(500).json({ message: 'Internal Error' });
    }
  };
}
