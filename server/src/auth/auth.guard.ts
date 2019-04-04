import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ISession } from './session.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
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
    const hasRole = () => roles.includes(user.userType);
    return user && user.userType && hasRole();
  }
}
