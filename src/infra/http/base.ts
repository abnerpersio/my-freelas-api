import { RequestValidator } from '~/infra/http/middlewares/validator';

export type HttpResponse<R = unknown> = {
  status: number;
  message?: string;
  data?: R;
};

export type Context = {
  user: {
    id: string;
  };
};

export interface UseCase<I = Record<string, unknown>, R = unknown> {
  execute(input: I, context?: Context): Promise<HttpResponse<R>>;

  validate?: RequestValidator;
}
