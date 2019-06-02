import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserRole } from '../user-role.interface';

@Injectable()
export class AdminService {
  constructor(private readonly userRepo: UserRepository) {}

  async getAllCustomers() {
    return await this.userRepo.find({
      where: {
        role: UserRole.CUSTOMER,
      },
      relations: ['customerInfo'],
    });
  }

  async getAllProfessionals() {
    return await this.userRepo.find({
      where: { role: UserRole.PROFESSIONAL },
      relations: ['professionalInfo'],
    });
  }

  async banUser(userId: string): Promise<boolean> {
    const user = await this.userRepo.findUserById(userId);
    if (!user || user.banned == true) {
      return false;
    }

    user.banned = true;
    await this.userRepo.save(user);
    return true;
  }

  async unbanUser(userId: string): Promise<boolean> {
    const user = await this.userRepo.findUserById(userId);
    if (!user || user.banned == false) {
      return false;
    }

    user.banned = false;
    await this.userRepo.save(user);
    return true;
  }
}
