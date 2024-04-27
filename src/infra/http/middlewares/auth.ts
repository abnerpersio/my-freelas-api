import { Request } from 'express';
import { prisma } from '~/infra/config/database';
import { PostgresUserRepository } from '~/infra/database/repositories/postgres/user';
import { UserRepository } from '~/infra/database/repositories/user';
import { ExpiredTokenError } from '~/infra/errors/expired-token';
import { BaseMiddleware } from '~/infra/http/middlewares/base';
import { CreateResponse } from '~/shared/utils/create-response';
import { JWT } from '~/shared/utils/jwt';

type UserPayload = {
  id: string;
};

export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly respository: UserRepository) {
    super();
  }

  static create() {
    const repo = new PostgresUserRepository(prisma);
    return new AuthMiddleware(repo);
  }

  protected async execute(req: Request) {
    const authorization = req.headers.authorization;
    const [_, token] = authorization?.split('Bearer ') || [];

    if (!token) {
      return CreateResponse.unauthorized('Invalid token');
    }

    try {
      const user = JWT.verify<UserPayload>(token);
      if (!user?.id) return CreateResponse.unauthorized('Invalid token');

      const hasUser = await this.respository.findById(user.id);
      if (!hasUser) return CreateResponse.unauthorized('Invalid token');

      (req as any).context = { user: { id: hasUser.id } };
      return true;
    } catch (error) {
      if (error instanceof ExpiredTokenError) {
        const refresh = JWT.refresh(token);

        console.log('original', token, 'refreshed', refresh);

        return CreateResponse.unauthorized('Token expired');
      }

      return CreateResponse.unauthorized('Invalid token');
    }
  }
}
