import { EntityRepository, EntityManager, AbstractRepository } from 'typeorm';
import { UserRole } from '../user-role.interface';
import { LoginInfoDto } from '../../auth/auth.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Customer } from '../entity/customer.entity';
import { Professional } from '../entity/professional.entity';

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
    const count = await manager.count(User, { email });
    if (count !== 0) {
      return null; //user already exist
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = manager.create(User, {
      role: userType,
      email,
      passwordHash,
    });

    const savedUser = await manager.save(user);

    // let info: Customer | Professional = null;
    // switch (userType) {
    //   case UserRole.CUSTOMER:
    //     info = manager.create(Customer, {});
    //     break;
    //   case UserRole.PROFESSIONAL:
    //     info = manager.create(Professional, {});
    //     break;
    // }

    // if (info) {
    //   info.user = user;
    //   await manager.save(info);
    // }

    return savedUser;
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

  async findUserById(userId: string): Promise<User> {
    const users = await this.manager.findByIds(User, [userId]);
    if (users.length === 0) {
      return null;
    } else {
      return users[0];
    }
  }
}
