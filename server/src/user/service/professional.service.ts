import { Injectable } from '@nestjs/common';
import { ProfessionalRepository } from '../repository/professional.repository';
import { DtoProfessionalDetails } from '../dto/profession-details.dto';
import { Professional } from '../entity/professional.entity';

@Injectable()
export class ProfessionalService {
  constructor(private readonly professionalRepo: ProfessionalRepository) {}

  async setProfessionalDetails(
    userId: string,
    details: DtoProfessionalDetails,
  ): Promise<Professional> {
    return await this.professionalRepo.setProfesisonalDetails(userId, details);
  }

  async getProfessionalById(userId: string): Promise<Professional> {
    const result = await this.professionalRepo.findByIds([userId], {
      relations: ['user'],
    });

    if (result.length !== 1) {
      return null;
    } else {
      return result[0];
    }
  }
}
