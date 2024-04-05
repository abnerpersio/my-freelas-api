import { HealthController } from '~/domain/health/controller';
import { Route } from '~/infra/http/router/base';

export const ROUTES: Route[] = [
  { path: ['/', '/health'], method: 'GET', useCase: HealthController.create() },
];
