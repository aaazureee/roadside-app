import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Customer } from './user/customer.entity';

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testRelationId() {
    const res = await this.manager.find(Customer, {
      userId: 'b0f7ef90-af1b-43f1-8a09-c5828338fca0',
    });
    return res;
  }
}
