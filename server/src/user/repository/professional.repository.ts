import { EntityRepository, Repository } from 'typeorm';
import { Professional } from '../entity/professional.entity';
import { DtoProfessionalDetails } from '../dto/profession-details.dto';
import { Logger } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRole } from '../user-role.interface';

@EntityRepository()
export class ProfessionalRepository extends Repository<Professional> {
  async setProfesisonalDetails(
    userId: string,
    details: DtoProfessionalDetails,
  ): Promise<Professional> {
    try {
      const user = await this.manager.findOneOrFail(User, userId);
      if (user.role !== UserRole.PROFESSIONAL) {
        throw new Error('User is not a professional');
      }

      let prof = await this.manager.preload(Professional, {
        userId,
        ...details,
      });

      if (!prof) {
        prof = await this.manager.create(Professional, {
          userId,
          ...details,
        });
      }

      return await this.manager.save(prof);
    } catch (err) {
      Logger.error(err, err.stack, 'CustomerRepository');
      return null;
    }
  }
}
