import { Injectable } from '@nestjs/common';
import { Callout } from '../entity/callout.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CalloutService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createCalloutRequest(userId: string): Promise<Callout> {}
}
