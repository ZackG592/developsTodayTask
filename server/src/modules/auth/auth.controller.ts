import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetCookieInterceptor } from 'src/common/interceptors/SetCookie.interceptor';
import { SetCookie } from 'src/common/generics/setCookie.generic';
import COOKIES from 'src/common/constants/COOKIES';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(SetCookieInterceptor)
  @Post('/sign-in/:name')
  async signIn(
    @Param('name') name: string,
  ): Promise<SetCookie<string> | Error> {
    const user = await this.authService.signIn(name);
    if (!user) {
      return new NotFoundException('No such user');
    }
    return { data: name, cookieName: COOKIES.username };
  }

  @UseInterceptors(SetCookieInterceptor)
  @Post('/sign-up/:name')
  async signUp(
    @Param('name') name: string,
  ): Promise<SetCookie<string> | Error> {
    const user = await this.authService.signUp(name);
    if (!user) {
      return new BadRequestException('Be sure you have entered valid data');
    }
    return { data: user.name, cookieName: COOKIES.username };
  }
}
