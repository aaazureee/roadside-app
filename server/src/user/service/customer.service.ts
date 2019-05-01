import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { DtoCustomerDetails } from '../dto/customer-details.dto';
import { Customer } from '../entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async setCustomerDetails(
    userId: string,
    details: DtoCustomerDetails,
  ): Promise<Customer | null> {
    return await this.customerRepository.setCustomerDetails(userId, details); // return null if fail
  }

  async getCustomerById(userId: string): Promise<Customer | null> {
    const customers = await this.customerRepository.findByIds([userId]);
    if (customers.length !== 1) {
      return null;
    } else {
      return customers[0];
    }
  }
}
