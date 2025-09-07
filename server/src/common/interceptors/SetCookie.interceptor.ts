import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SetCookie } from '../generics/setCookie.generic';
import { Response } from 'express';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse() as Response;

    return next.handle().pipe(
      map((data: SetCookie<any>) => {
        response.cookie(data.cookieName, data.data, {
          secure: false,
          httpOnly: true,
          // sameSite: 'none',
          maxAge: 14 * 24 * 60 * 60,
        });

        const dataToReturn = data.data;
        if (data?.redirect) {
          return response.redirect(data.redirect);
        }
        return dataToReturn;
      }),
    );
  }
}
