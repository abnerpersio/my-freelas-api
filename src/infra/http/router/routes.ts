import { HealthController } from '~/domain/health/controller';
import { CreateProjectController } from '~/domain/project/create/controller';
import { ListProjectController } from '~/domain/project/list/controller';
import { CreateTimesheetController } from '~/domain/timesheet/create/controller';
import { ListTimesheetController } from '~/domain/timesheet/list/controller';
import { CreateTransactionController } from '~/domain/transaction/create/controller';
import { ListTransactionController } from '~/domain/transaction/list/controller';
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
  {
    path: '/projects',
    method: 'POST',
    useCase: CreateProjectController.create(),
  },
  {
    path: '/projects',
    method: 'GET',
    useCase: ListProjectController.create(),
  },
  {
    path: '/transactions',
    method: 'POST',
    useCase: CreateTransactionController.create(),
  },
  {
    path: '/transactions',
    method: 'GET',
    useCase: ListTransactionController.create(),
  },
  {
    path: '/timesheets',
    method: 'POST',
    useCase: CreateTimesheetController.create(),
  },
  {
    path: '/timesheets',
    method: 'GET',
    useCase: ListTimesheetController.create(),
  },
];
