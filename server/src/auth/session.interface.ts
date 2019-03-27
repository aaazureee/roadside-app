import { UserRole } from 'src/user/interfaces';

export class ISession {
  user: { userType: UserRole; userId: string } | null;
}
