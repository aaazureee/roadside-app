import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './service/customer.service';
import { CustomerController } from './controller/customer.controller';
import { CustomerRepository } from './repository/customer.repository';
import { ProfessionalRepository } from './repository/professional.repository';
import { ProfessionalController } from './controller/professional.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CustomerRepository,
      ProfessionalRepository,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [CustomerService],
  controllers: [CustomerController, ProfessionalController],
})
export class UserModule {}
