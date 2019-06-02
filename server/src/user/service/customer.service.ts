import { Injectable, Logger } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { DtoCustomerDetails } from '../dto/customer-details.dto';
import { Customer } from '../entity/customer.entity';
import { DtoCreditCard } from '../dto/credit-card.dto';
import { DtoVehicle } from '../dto/vehicle.dto';
import { PlanType, isPlanType } from '../interface/plan.enum';
import { TransactionService } from 'src/assistance-callout/service/transaction.service';
@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly transactionService: TransactionService,
  ) {}

  async setCustomerDetails(
    userId: string,
    details: DtoCustomerDetails,
  ): Promise<Customer | null> {
    return await this.customerRepository.setCustomerDetails(userId, details); // return null if fail
  }

  async getCustomerById(userId: string) {
    const customer = await this.customerRepository.findOneOrFail(userId, {
      relations: ['vehicles', 'user'],
    });

    const { user, ...rest } = customer;
    const { email, id, role } = user;
    const result = { ...rest, email, userId: id, userType: role };
    return result;
  }

  async setCreditCard(userId: string, card: DtoCreditCard): Promise<Customer> {
    return await this.customerRepository.setCreditCard(userId, card);
  }

  async addVehicles(userId: string, vehicles: DtoVehicle[]): Promise<Customer> {
    return await this.customerRepository.addVehicles(userId, vehicles);
  }

  async changePlan(userId: string, newPlan: PlanType): Promise<PlanType> {
    try {
      if (!isPlanType(newPlan)) {
        return null;
      }
      await this.customerRepository.update(userId, { plan: newPlan });
      await this.transactionService.createSubscription(userId, newPlan);
      return newPlan;
    } catch (err) {
      Logger.error(err.message, err.stack, 'Change sub plan');
      return null;
    }
  }
}
