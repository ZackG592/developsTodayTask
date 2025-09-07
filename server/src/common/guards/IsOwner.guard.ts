import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request;
    const name = request.cookies?.['name'];

    if (!name) {
      new UnauthorizedException(
        'No name, or you don`t have any access to this action',
      );
    }

    return true;
  }
}
