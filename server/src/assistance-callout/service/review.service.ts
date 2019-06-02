import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Callout } from '../entity/callout.entity';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getAllReviewsOf(professionalId: string): Promise<Review[]> {
    const callouts = await this.entityManager.find(Callout, {
      where: {
        acceptedProfessionalId: professionalId,
      },
      relations: ['customer'],
    });

    return callouts.map(callout => ({
      fullName: callout.customer.fullName,
      rating: callout.review.rating,
      comment: callout.review.comment,
    }));
  }

  //   async getAvgRatingOf(professionalId: string): Promise<{count: number, average: number}> {
  //     const [callouts, count] = await this.entityManager.findAndCount(Callout, {
  //         where: {
  //           acceptedProfessionalId: professionalId,
  //         },
  //         select: ['review'],
  //       });

  //     const result = {
  //         count: 0,
  //         average: 0
  //     }
  //   }
}
