import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterInfoDto,
  RegisterResponeDto,
  LoginInfoDto,
  LoginResponseDto,
} from 'src/auth/auth.dto';

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
        userId: user.id,
      };
    }
  }

  @Post('login')
  async login(
    @Body() loginInfo: LoginInfoDto,
    @Session() session,
  ): Promise<LoginResponseDto> {
    const { email, password } = loginInfo;
    const user = await this.authService.logIn(email, password);
    if (!user) {
      return {
        success: false,
        error: 'Invalid credentials.',
      };
    } else {
      session.user = { userId: user.id, userType: user.role };
      return { success: true, userId: user.id };
    }
  }
}
