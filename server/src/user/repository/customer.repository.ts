import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { DtoCustomerDetails } from '../dto/customer-details.dto';
import { User } from '../entity/user.entity';
import { Logger } from '@nestjs/common';
import { UserRole } from '../user-role.interface';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async setCustomerDetails(
    userId: string,
    details: DtoCustomerDetails,
  ): Promise<Customer> {
    try {
      const user = await this.manager.findOneOrFail(User, userId);
      if (user.role !== UserRole.CUSTOMER) {
        throw new Error('User is not a customer');
      }
      let cust = await this.manager.preload(Customer, {
        userId,
        ...details,
      });

      if (!cust) {
        cust = await this.manager.create(Customer, {
          userId,
          ...details,
        });
      }
      return await this.manager.save(cust);
    } catch (err) {
      Logger.error(err, err.stack, 'CustomerRepository');
      return null;
    }
  }
}
