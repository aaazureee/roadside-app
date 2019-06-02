import { Injectable } from '@nestjs/common';
import { Callout } from '../entity/callout.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Not, IsNull } from 'typeorm';
import { Point } from 'geojson';
import { Vehicle } from 'src/user/entity/vehicle.entity';
import { Professional } from 'src/user/entity/professional.entity';
import { CalloutMatching } from '../entity/callout-matching.entity';
import { DtoCalloutInfo } from '../dto/callout-info.dto';
import { DtoAcceptedProfessional } from '../dto/accepted-professional.dto';
import { CalloutState } from '../callout-state.enum';
import { TransactionService } from './transaction.service';

@Injectable()
export class CalloutService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly transactionService: TransactionService,
  ) {}

  async createCalloutRequest(options: {
    customerId: string;
    location: Point;
    address: string;
    vehicleId: number;
    description?: string;
  }): Promise<Callout> {
    const { customerId, location, address, vehicleId, description } = options;

    const [_, count] = await this.entityManager.findAndCount(Callout, {
      where: {
        isCompleted: false,
        customerId: customerId,
      },
    });

    //if cust have active callout then refuse
    if (count > 0) {
      throw Error('Already have an active callout');
    }

    return await this.entityManager.transaction(async entityManager => {
      const callout = entityManager.create(Callout, {
        customerId,
        location,
        address,
        description,
        vehicleId,
      });

      const persistedCallout = await entityManager.save(callout);
      const inRangeProfessionalIds = await entityManager
        .createQueryBuilder(Professional, 'professional')
        .select('professional.userId')
        .where(
          'ST_Distance(ST_GeomFromGeoJson( :calloutPoint ), professional.location) <= professional.workingRange',
        )
        .setParameters({
          calloutPoint: JSON.stringify(persistedCallout.location),
        })
        .getMany();

      //create matches
      const calloutMatches = inRangeProfessionalIds.map(prof => {
        return entityManager.create(CalloutMatching, {
          calloutId: persistedCallout.id,
          professionalId: prof.userId,
        });
      });

      await entityManager.save(calloutMatches);

      return persistedCallout;
    });

    //TODO call distance and populate CalloutMatching
  }

  async getCalloutsInRange(professionalId: string): Promise<DtoCalloutInfo[]> {
    const calloutMatches = await this.entityManager.find(CalloutMatching, {
      where: [
        {
          professionalId,
          accepted: true,
        },
        {
          professionalId,
          accepted: null,
        },
      ],
      relations: ['callout', 'callout.customer', 'callout.vehicle'],
    });

    const calloutInfos: DtoCalloutInfo[] = calloutMatches
      .filter(match => {
        return match.callout.acceptedProfessionalId == null;
      })
      .map(match => {
        const callout = match.callout;
        return {
          id: callout.id,
          customerName: callout.customer.fullName,
          customerId: callout.customerId,
          customerPhone: callout.customer.phone,
          vehicle: callout.vehicle,
          description: callout.description,
          location: callout.location,
          address: callout.address,
          plan: callout.customer.plan,
          price: match.proposedPrice,
        };
      });

    return calloutInfos;
  }

  async acceptCallout(
    professionalId: string,
    calloutId: string,
    proposedPrice: number,
  ) {
    await this.entityManager.update(
      CalloutMatching,
      { calloutId: calloutId, professionalId },
      { accepted: true, proposedPrice: proposedPrice },
    );
  }

  async declineCallout(professionalId: string, calloutId: string) {
    await this.entityManager.update(
      CalloutMatching,
      { calloutId, professionalId },
      { accepted: false },
    );
  }

  //for customer
  async getAcceptedProfessionals(
    calloutId: string,
  ): Promise<DtoAcceptedProfessional[]> {
    // const acceptedMatches = await this.entityManager.find(CalloutMatching, {
    //   where: {
    //     calloutId: calloutId,
    //     accepted: true,
    //   },
    //   relations: ['professional'],
    // });

    const accepted = await this.entityManager
      .createQueryBuilder(CalloutMatching, 'calloutMatching')
      .leftJoinAndSelect(
        'calloutMatching.professional',
        'professional',
        'professional.busy = :isBusy',
        { isBusy: false },
      )
      .where('calloutMatching.calloutId = :calloutId', { calloutId })
      .andWhere('calloutMatching.accepted = :isAccepted', { isAccepted: true })
      .getMany();

    const results: DtoAcceptedProfessional[] = accepted.map(match => {
      const prof = match.professional;
      return {
        professionalId: prof.userId,
        price: match.proposedPrice,
        phone: prof.phone,
        fullName: prof.fullName,
        address: prof.address,
        location: prof.location,
      };
    });

    return results;
  }

  async customerChooseProfessional(
    calloutId: string,
    professionalId: string,
  ): Promise<boolean> {
    try {
      const now = new Date();

      await this.entityManager.transaction(async entityManager => {
        const match = await entityManager.findOneOrFail(
          CalloutMatching,
          {
            calloutId,
            professionalId,
          },
          {
            relations: ['professional', 'callout'],
          },
        );

        if (match.professional.busy) {
          throw Error('Professional is busy');
        }

        match.professional.busy = true;
        await entityManager.save(match.professional);

        await entityManager.update(
          Callout,
          { id: calloutId },
          {
            acceptedProfessionalId: professionalId,
            price: match.proposedPrice,
            completedDate: now,
          },
        );
        await entityManager.update(
          CalloutMatching,
          { calloutId, professionalId: Not(professionalId) },
          { accepted: false },
        );

        //createTransaction
        const callout = match.callout;
        await this.transactionService.createServicePayment(
          callout.customerId,
          professionalId,
          callout.id,
          match.proposedPrice,
        );
      });
    } catch (err) {
      return false;
    }

    return true;
  }

  // async professionalGetPendingCallouts(
  //   professionalId: string,
  // ): Promise<DtoCalloutInfo[]> {
  //   const callouts = await this.entityManager.find(Callout, {
  //     acceptedProfessionalId: professionalId,
  //   });

  //   const calloutInfos: DtoCalloutInfo[] = callouts.map(callout => {
  //     return {
  //       id: callout.id,
  //       customerName: callout.customer.fullName,
  //       customerId: callout.customerId,
  //       vehicle: callout.vehicle,
  //       description: callout.description,
  //       location: callout.location,
  //       address: callout.address,
  //     };
  //   });

  //   return calloutInfos;
  // }

  async completeCallout(
    calloutId: string,
    rating: number = 0,
    comment: string = null,
  ) {
    const callout = await this.entityManager.findOneOrFail(Callout, {
      where: {
        id: calloutId,
        isCompleted: false,
      },
      relations: ['acceptedProfessional'],
    });

    callout.isCompleted = true;

    const prof = callout.acceptedProfessional;
    prof.busy = false;

    callout.review.rating = rating;
    callout.review.comment = comment;

    //delete related callout matching
    const deleteResult = this.entityManager.delete(CalloutMatching, {
      calloutId: callout.id,
    });

    const saveResult = this.entityManager.save([callout, prof]);

    await Promise.all([deleteResult, saveResult]);
  }

  async professionalGetInProgressCallout(professionalId: string) {
    const [result, count] = await this.entityManager.findAndCount(Callout, {
      where: {
        acceptedProfessionalId: professionalId,
        isCompleted: false,
      },
      relations: ['customer', 'vehicle'],
    });

    if (count == 0) {
      return null;
    } else {
      return result[0];
    }
  }

  // async customerGetIncompleteCallouts(customerId: string) {
  //   return await this.entityManager.find(Callout, {
  //     customerId,
  //     isCompleted: false,
  //   });
  // }

  async customerGetCurrentActiveCallout(customerId: string) {
    const [result, count] = await this.entityManager
      .createQueryBuilder(Callout, 'callout')
      .leftJoinAndSelect('callout.vehicle', 'vehicle')
      .where(
        'callout.customerId = :customerId AND callout.isCompleted = false',
        {
          customerId,
        },
      )
      .getManyAndCount();

    if (count === 0) {
      return null;
    } else {
      return result[0];
    }
  }

  async customerGetChosenProfessional(
    calloutId: string,
  ): Promise<DtoAcceptedProfessional> {
    const callout = await this.entityManager.findOneOrFail(Callout, {
      where: {
        id: calloutId,
        isCompleted: false,
        acceptedProfessionalId: Not(IsNull()),
      },
      relations: ['acceptedProfessional'],
    });

    const prof = callout.acceptedProfessional;

    const match = await this.entityManager.findOneOrFail(CalloutMatching, {
      where: {
        calloutId: calloutId,
        professionalId: prof.userId,
      },
    });

    return {
      professionalId: prof.userId,
      address: prof.address,
      fullName: prof.fullName,
      location: prof.location,
      phone: prof.phone,
      price: match.proposedPrice,
    };
  }
}
