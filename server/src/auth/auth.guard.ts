import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ISession } from './session.interface';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Get handler if placed before route otherwise get controller class
     */
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler() || context.getClass(),
    );
    Logger.log(`Hitting RoleGuard, roles: ${roles}`);
    if (!roles) {
      return true;
    }
    const session: ISession = context.switchToHttp().getRequest().session;
    const user = session.user;
    if (!user) {
      return false;
    }
    const hasRole = () => roles.includes(user.userType);
    const userValid = await this.authService.isUserValid(user.userId);
    return user.userType && userValid && hasRole();
  }
}
