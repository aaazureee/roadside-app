import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repository/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, CustomerRepository])],
  exports: [TypeOrmModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class UserModule {}
