import { Request, Response } from 'express';
import { logger } from '~/infra/config/logger';
import { RequestError } from '~/infra/errors/request-error';
import { Context, UseCase } from '~/infra/http/base';

export class ExpressAdapter {
  constructor(private readonly useCase: UseCase) {}

  adapt = async (req: Request, res: Response) => {
    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
    const context = ((req as any).context || {}) as Context;

    try {
      const { status, message, data } = await this.useCase.execute(input, context);
      const success = status >= 200 && status < 300;

      if (message || data) {
        res.status(status).json({ success, message, data });
        return;
      }

      res.sendStatus(status);
    } catch (error: any) {
      logger.info(
        {
          path: req.path,
          method: req.method,
          input,
          error: error.message || '',
        },
        'Error at request',
      );

      if (error instanceof RequestError) {
        res.status(error.statusCode).json({
          message: error.message || 'Internal Error',
        });
        return;
      }

      res.status(500).json({ message: 'Internal Error' });
    }
  };
}
