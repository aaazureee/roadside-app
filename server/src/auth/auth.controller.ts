import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterInfoDto,
  RegisterResponeDto,
  LoginInfoDto,
  LoginResponseDto,
} from 'src/auth/auth.dto';
import { ISession } from './session.interface';
import { InvalidCredentialError, AccountBannedError } from './login.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerInfo: RegisterInfoDto,
    @Session() session: ISession,
  ): Promise<RegisterResponeDto> {
    const { userType, email, password } = registerInfo;

    const user = await this.authService.registerUser(userType, email, password);
    if (!user) {
      return {
        success: false,
        error: 'Email already existed.',
      };
    } else {
      const { email, role, id } = user;
      session.user = { email, userType: role, userId: id };

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
    let user;
    try {
      user = await this.authService.logIn(email, password);
    } catch (err) {
      if (err instanceof InvalidCredentialError) {
        return {
          success: false,
          error: 'Invalid credentials.',
        };
      } else if (err instanceof AccountBannedError) {
        return {
          success: false,
          error:
            'Your account has been suspended. Please contact an admin for more details.',
        };
      }
    }

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
    if (
      session.user &&
      (await this.authService.isUserValid(session.user.userId))
    ) {
      return {
        success: true,
        email: session.user.email,
        userType: session.user.userType,
      };
    } else if (
      session.user &&
      !(await this.authService.isUserValid(session.user.userId))
    ) {
      return {
        success: true,
        suspended: true,
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
