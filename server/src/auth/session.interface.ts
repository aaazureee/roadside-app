import { UserRole } from 'src/user/user-role.interface';
import { Express } from 'express';
export interface ISession extends Express.Session {
  user: { userType: UserRole; userId: string; email: string } | null;
}
