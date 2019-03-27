import { EntityRepository, EntityManager, AbstractRepository } from 'typeorm';
import { UserRole } from './interfaces';
import { LoginInfoDto } from '../auth/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

@EntityRepository()
export class UserRepository extends AbstractRepository<User> {
  // constructor(private manager: EntityManager) {}

  /**
   * Hash the password string and create a new user row
   * Returns null if user already exist, user if user created successfully
   * Can optionally pass an EntityManager to run as a part of a transaction
   */
  async registerUser(
    userType: UserRole,
    email: string,
    password: string,
    manager: EntityManager = this.manager,
  ): Promise<User | null> {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = manager.create(User, {
      role: userType,
      email,
      passwordHash,
    });

    const count = await manager.count(User, { email });
    if (count === 0) {
      const savedUser = await manager.save(user);
      return savedUser;
    } else {
      return null;
    }
  }

  /**
   * Returns user if login successful, otherwise return null
   * Can optionally pass an EntityManager to run as a part of a transaction
   */
  async logIn(
    email: string,
    password: string,
    manager: EntityManager = this.manager,
  ): Promise<User | null> {
    try {
      const user = await manager.findOneOrFail(User, { email });
      const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
      if (isPasswordMatch) {
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}
