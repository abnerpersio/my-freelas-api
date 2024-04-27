import express, { Application, json } from 'express';
import { Env } from '~/infra/config/env';
import { CorsMiddleware } from '~/infra/http/middlewares/cors';
import { HttpRouter } from '~/infra/http/router';
import { logger } from '~/infra/config/logger';

export class Server {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  build() {
    this.app.use(json());
    this.app.use(CorsMiddleware.create().adapt);
    new HttpRouter(this.app).setup();
    return this;
  }

  run() {
    this.app.listen(Env.PORT, () => logger.info(`Server is running on port ${Env.PORT}`));
  }
}
