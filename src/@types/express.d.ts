import { Request as ExpressRequest } from 'express';

type Context = {
  user: {
    id: string;
  };
};

declare module 'express' {
  interface Request extends ExpressRequest {
    context: Context;
  }
}
