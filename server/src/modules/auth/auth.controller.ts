import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetCookieInterceptor } from 'src/common/interceptors/SetCookie.interceptor';
import { SetCookie } from 'src/common/generics/setCookie.generic';

interface bruh {
  name: string;
}

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(SetCookieInterceptor)
  @Post('/sign-in/:name')
  async signIn(
    @Param('name') name: string,
  ): Promise<SetCookie<{ name: string | undefined }>> {
    const user = await this.authService.signIn(name);
    console.log('here', user);
    return { data: { name: user?.name }, cookieName: 'name' };
  }

  @UseInterceptors(SetCookieInterceptor)
  @Post('/sign-up/:name')
  async signUp(
    @Param('name') name: string,
  ): Promise<SetCookie<{ name: string | undefined }>> {
    const user = await this.authService.signUp(name);
    console.log('here', user);
    return { data: { name: user?.name }, cookieName: 'name' };
  }
}
