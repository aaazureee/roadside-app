import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserRole } from 'src/user/user-role.interface';
import { LoginInfoDto } from 'src/auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(
    userType: UserRole,
    email: string,
    password: string,
  ): Promise<User | null> {
    return this.userRepository.registerUser(userType, email, password);
  }

  async logIn(email: string, password: string): Promise<User | null> {
    return this.userRepository.logIn(email, password);
  }

  async isUserValid(userId: string): Promise<boolean> {
    const user = await this.userRepository.findUserById(userId);
    return (!!user && !user.banned) as boolean;
  }
}
