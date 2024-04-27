import { Request, Response } from 'express';
import { BaseMiddleware, MiddlewareResponse } from '~/infra/http/middlewares/base';
import { Context } from '../base';
import { CreateResponse } from '~/shared/utils/create-response';

type ValidatorResult = boolean | string | Record<string, string>;

export type RequestValidator = (
  input: Record<string, unknown>,
  context?: Context,
) => ValidatorResult | Promise<ValidatorResult>;

export class ValidatorMiddleware extends BaseMiddleware {
  constructor(private readonly validator?: RequestValidator) {
    super();
  }

  static create(validator?: RequestValidator) {
    return new ValidatorMiddleware(validator);
  }

  protected async execute(req: Request, res: Response): Promise<MiddlewareResponse> {
    if (!this.validator) return true;

    const input = { ...(req.body || {}), ...(req.query || {}), ...(req.params || {}) };
    const context = ((req as any).context || {}) as Context;

    const result = await this.validator(input, context);
    if (result === true) return true;

    if (result === false) {
      return CreateResponse.unprocessableEntity('Invalid input');
    }

    return CreateResponse.unprocessableEntity(result);
  }
}
