import { Injectable } from '@nestjs/common';
import { Callout } from '../entity/callout.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Point } from 'geojson';
import { Vehicle } from 'src/user/entity/vehicle.entity';
import { Professional } from 'src/user/entity/professional.entity';

@Injectable()
export class CalloutService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createCalloutRequest(options: {
    customerId: string;
    location: Point;
    address: string;
    vehicleId: number;
    description?: string;
  }): Promise<Callout> {
    const { customerId, location, address, vehicleId, description } = options;
    this.entityManager.transaction(async entityManager => {
      const callout = entityManager.create(Callout, {
        customerId,
        location,
        address,
        description,
        vehicleId,
      });

      const inRangeProfessionals = await entityManager
        .createQueryBuilder()
        .from(Professional, 'professional');
    });

    //TODO call distance and populate CalloutMatching
  }
}
