import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import COOKIES from '../constants/COOKIES';

@Injectable()
export class IsAuthenticated implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.[COOKIES.username];

    if (!token) {
      return false;
    }

    req.user = { name: token };

    return true;
  }
}
