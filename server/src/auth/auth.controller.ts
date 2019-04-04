import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterInfoDto,
  RegisterResponeDto,
  LoginInfoDto,
  LoginResponseDto,
} from 'src/auth/auth.dto';
import { ISession } from './session.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerInfo: RegisterInfoDto,
  ): Promise<RegisterResponeDto> {
    const { userType, email, password } = registerInfo;

    const user = await this.authService.registerUser(userType, email, password);
    if (!user) {
      return {
        success: false,
        error: 'Email already existed.',
      };
    } else {
      return {
        success: true,
        email: user.email,
        userType: user.role,
      };
    }
  }

  @Post('login')
  async login(
    @Body() loginInfo: LoginInfoDto,
    @Session() session: ISession,
  ): Promise<LoginResponseDto> {
    const { email, password, rememberMe } = loginInfo;
    const user = await this.authService.logIn(email, password);
    if (!user) {
      return {
        success: false,
        error: 'Invalid credentials.',
      };
    } else {
      session.user = {
        userId: user.id,
        userType: user.role,
        email: user.email,
      };

      if (rememberMe) {
        session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000; //14 days
      }
      return { success: true, email: user.email, userType: user.role };
    }
  }

  @Get('login')
  async checkLogin(@Session() session: ISession) {
    if (session.user && this.authService.isUserValid(session.user.userId)) {
      return {
        success: true,
        email: session.user.email,
        userType: session.user.userType,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  @Get('logout')
  async logout(@Session() session: ISession) {
    return new Promise<void>((resolve, reject) => {
      session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
