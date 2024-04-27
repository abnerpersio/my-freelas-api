import jwt from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { Env } from '~/infra/config/env';
import { ExpiredTokenError } from '~/infra/errors/expired-token';

const JWT_TOKEN_EXPIRATION = 60 * 60 * 24; // 1 day

type RefreshTokenResult<T = Record<string, unknown>> = {
  token: string;
  payload: T;
};

export class JWT {
  static sign<T = Record<string, unknown>>(payload: T): string {
    return jwt.sign(payload as object, Env.JWT_SECRET as string, {
      expiresIn: JWT_TOKEN_EXPIRATION,
    });
  }

  static verify<T = Record<string, unknown>>(token: string): T | null {
    try {
      return (jwt.verify(token, Env.JWT_SECRET as string) ?? null) as T | null;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError();
      }

      return null;
    }
  }

  static refresh<T = Record<string, unknown>>(token: string): RefreshTokenResult<T> | null {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if (!decoded) return null;

    const { iat, exp, ...payload } = decoded;
    return { token: this.sign(payload), payload: payload as T };
  }
}
