import { logger } from '~/infra/config/logger';
import { prisma } from '~/infra/config/database';

prisma
  .$connect()
  .then(() => logger.info('[Database] Connected successfully'))
  .catch((error) => logger.error(`[Database] Connection error: ${error}`));
