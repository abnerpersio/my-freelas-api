import { HealthController } from '~/domain/health/controller';
import { CreateUserController } from '~/domain/user/create-user/controller';
import { LoginController } from '~/domain/user/login/controller';
import { MeController } from '~/domain/user/me/controller';
import { RefreshTokenController } from '~/domain/user/refresh-token/controller';
import { Route } from '~/infra/http/router/base';

export const ROUTES: Route[] = [
  { path: ['/', '/health'], method: 'GET', useCase: HealthController.create() },
  { path: '/login', method: 'POST', useCase: LoginController.create() },
  {
    path: '/users',
    method: 'POST',
    useCase: CreateUserController.create(),
    middlewares: ['auth'],
  },
  {
    path: '/me',
    method: 'GET',
    useCase: MeController.create(),
    middlewares: ['auth'],
  },
  {
    path: '/refresh-token',
    method: 'POST',
    useCase: RefreshTokenController.create(),
  },
];
