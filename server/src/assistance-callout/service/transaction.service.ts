import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PlanType, getPlanPrice } from 'src/user/interface/plan.enum';
import { Transaction, TransactionType } from '../entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async createSubscription(
    customerId: string,
    plan: PlanType,
  ): Promise<Transaction> {
    const sub = this.entityManager.create(Transaction, {
      amount: getPlanPrice(plan),
      customerId,
      type: TransactionType.SUBSCRIPTION,
      dateCreated: new Date(),
    });

    return await this.entityManager.save(sub);
  }

  async createServicePayment(
    customerId: string,
    professionalId: string,
    calloutId: string,
    amount: number,
  ) {
    const payment = this.entityManager.create(Transaction, {
      amount,
      customerId,
      professionalId,
      type: TransactionType.SERVICE_PAYMENT,
      dateCreated: new Date(),
      calloutId,
    });

    return await this.entityManager.save(payment);
  }

  async getTransactionsByCustomer(customerId: string): Promise<Transaction[]> {
    const result = await this.entityManager.find(Transaction, {
      where: {
        customerId,
      },
    });

    return result;
  }

  async getTransactionsByProfessional(
    professionalId: string,
  ): Promise<Transaction[]> {
    const result = await this.entityManager.find(Transaction, {
      where: {
        professionalId,
      },
    });

    return result;
  }
}
