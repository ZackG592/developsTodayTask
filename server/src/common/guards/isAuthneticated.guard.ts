import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAuthenticated implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.['name'];
    console.log(token);
    if (!token) {
      return false;
    }

    req.user = { name: token };

    return true;
  }
}
